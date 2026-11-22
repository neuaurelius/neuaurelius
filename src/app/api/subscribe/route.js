import { NextResponse } from "next/server";

async function verifyProofOfWork(captchaToken) {
    if (
        !captchaToken ||
        typeof captchaToken.challenge !== "string" ||
        typeof captchaToken.nonce !== "number"
    ) {
        return false;
    }

    const parts = captchaToken.challenge.split("_");
    const timestamp = Number(parts[1]);
    if (!timestamp || Math.abs(Date.now() - timestamp) > 5 * 60 * 1000) {
        return false;
    }

    const msgBuffer = new TextEncoder().encode(
        `${captchaToken.challenge}:${captchaToken.nonce}`
    );
    const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", msgBuffer);
    const expectedHash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return expectedHash.startsWith("000");
}

export async function POST(request) {
    try {
        const body = await request.json();

        const email = body?.email?.trim().toLowerCase();
        const website = body?.website; // Honeypot field

        // Silently reject bots
        if (website) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Validate email
        if (!email) {
            return NextResponse.json(
                { success: false, message: "Please enter your email address." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // 1. Verify Proof-of-Work token
        const powValid = await verifyProofOfWork(body?.captchaToken);
        if (!powValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Security verification failed. Please try again.",
                },
                { status: 403 }
            );
        }

        // 2. Verify Cloudflare Turnstile token (when secret key is configured)
        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        const turnstileToken = body?.turnstileToken;

        if (turnstileSecret) {
            if (!turnstileToken) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Security check is still verifying. Please try again.",
                    },
                    { status: 400 }
                );
            }

            const forwardedFor = request.headers.get("x-forwarded-for");
            const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "";

            const verifyParams = new URLSearchParams({
                secret: turnstileSecret,
                response: turnstileToken,
            });
            if (clientIp) {
                verifyParams.set("remoteip", clientIp);
            }

            const cfResponse = await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: verifyParams,
                }
            );

            const cfData = await cfResponse.json();
            if (!cfData.success) {
                console.error("Turnstile verify failed:", cfData);
                return NextResponse.json(
                    {
                        success: false,
                        message: "Bot verification failed. Please refresh and try again.",
                    },
                    { status: 403 }
                );
            }
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID);

        if (!apiKey || !listId) {
            console.error("Missing env vars:", {
                hasBrevoKey: Boolean(apiKey),
                hasBrevoListId: Boolean(listId),
            });
            return NextResponse.json(
                {
                    success: false,
                    message: "Newsletter service is not configured (missing Brevo env vars).",
                },
                { status: 500 }
            );
        }

        // 3. Check if the contact already exists in Brevo
        const checkResponse = await fetch(
            `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "api-key": apiKey,
                },
            }
        );

        if (checkResponse.ok) {
            const existingContact = await checkResponse.json();
            if (
                existingContact.listIds?.includes(listId) &&
                !existingContact.emailBlacklisted
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        alreadySubscribed: true,
                        message: "This email is already subscribed to our newsletter.",
                    },
                    { status: 409 }
                );
            }
        }

        // 4. Add or update the contact in your list
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                email,
                listIds: [listId],
                emailBlacklisted: false,
                updateEnabled: true,
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Brevo API error:", data);
            return NextResponse.json(
                {
                    success: false,
                    message: data?.message || "Unable to subscribe right now.",
                },
                { status: response.status }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "You're subscribed.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}
