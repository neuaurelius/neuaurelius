"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

let scriptPromise = null;

function loadTurnstileScript() {
    if (typeof window === "undefined") return Promise.resolve();
    if (window.turnstile) return Promise.resolve();
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise((resolve) => {
        const existing = document.querySelector(
            'script[src*="challenges.cloudflare.com/turnstile"]'
        );
        if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true });
            return;
        }

        const script = document.createElement("script");
        script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
    });

    return scriptPromise;
}

const InvisibleTurnstile = forwardRef(function InvisibleTurnstile(
    { onToken, action = "submit" },
    ref
) {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);
    const tokenRef = useRef("");
    const waitersRef = useRef([]);

    useImperativeHandle(ref, () => ({
        getToken: () => tokenRef.current,
        waitForToken: (timeoutMs = 5000) => {
            if (tokenRef.current) return Promise.resolve(tokenRef.current);

            if (window.turnstile && widgetIdRef.current !== null) {
                try {
                    window.turnstile.execute(widgetIdRef.current);
                } catch {
                    // Already executing
                }
            }

            return new Promise((resolve) => {
                const timer = setTimeout(() => {
                    resolve(tokenRef.current || "");
                }, timeoutMs);

                waitersRef.current.push((token) => {
                    clearTimeout(timer);
                    resolve(token);
                });
            });
        },
        reset: () => {
            tokenRef.current = "";
            if (window.turnstile && widgetIdRef.current !== null) {
                window.turnstile.reset(widgetIdRef.current);
            }
        },
    }));

    useEffect(() => {
        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        if (!siteKey || !containerRef.current) return;

        let cancelled = false;

        loadTurnstileScript().then(() => {
            if (cancelled || !containerRef.current || !window.turnstile) return;

            widgetIdRef.current = window.turnstile.render(
                containerRef.current,
                {
                    sitekey: siteKey,
                    action,
                    size: "invisible",
                    execution: "render",
                    appearance: "interaction-only",
                    callback: (token) => {
                        tokenRef.current = token;
                        onToken?.(token);
                        while (waitersRef.current.length > 0) {
                            const resolveWaiter = waitersRef.current.shift();
                            resolveWaiter(token);
                        }
                    },
                    "expired-callback": () => {
                        tokenRef.current = "";
                        onToken?.("");
                        if (widgetIdRef.current !== null) {
                            window.turnstile.reset(widgetIdRef.current);
                        }
                    },
                    "error-callback": () => {
                        tokenRef.current = "";
                        onToken?.("");
                        while (waitersRef.current.length > 0) {
                            const resolveWaiter = waitersRef.current.shift();
                            resolveWaiter("");
                        }
                    },
                }
            );
        });

        return () => {
            cancelled = true;
            if (window.turnstile && widgetIdRef.current !== null) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [action, onToken]);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                width: "1px",
                height: "1px",
                opacity: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        />
    );
});

export default InvisibleTurnstile;
