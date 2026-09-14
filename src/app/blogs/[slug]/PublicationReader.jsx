"use client";

import { useEffect, useRef, useState } from "react";

export default function PublicationReader({
    title,
    readTime,
}) {
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [fontSize, setFontSize] = useState(17);
    const [footerVisible, setFooterVisible] = useState(false);
    const [position, setPosition] = useState("center");

    const sentencesRef = useRef([]);
    const currentSentenceRef = useRef(-1);
    const utteranceRef = useRef(null);
    const sentenceIndexRef = useRef(0);

    /*
     * Reading progress
     */
    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            document.documentElement.style.setProperty(
                "--reading-progress",
                `${progress}%`
            );
        };

        window.addEventListener("scroll", updateProgress, {
            passive: true,
        });

        updateProgress();

        return () => {
            window.removeEventListener("scroll", updateProgress);
        };
    }, []);

    /*
     * Font size
     */
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--publication-font-size",
            `${fontSize}px`
        );
    }, [fontSize]);

    /*
     * Hide reader when footer enters viewport
     */
    useEffect(() => {
        const footer = document.querySelector("footer");

        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            {
                threshold: 0,
            }
        );

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    /*
     * Cleanup speech synthesis
     */
    useEffect(() => {
        return () => {
            window.speechSynthesis?.cancel();
        };
    }, []);

    /*
     * Split article into sentence-level spans
     */
    useEffect(() => {
        const article = document.querySelector(
            ".publication-content"
        );

        if (!article) return;

        const elements = article.querySelectorAll(
            "p, li, blockquote, h2, h3, h4"
        );

        const sentences = [];

        elements.forEach((element) => {
            const text = element.textContent?.trim();

            if (!text) return;

            const parts = text.match(
                /[^.!?]+[.!?]+|[^.!?]+$/g
            );

            if (!parts) return;

            element.innerHTML = "";

            parts.forEach((sentence) => {
                const span = document.createElement("span");

                span.className = "publication-sentence";
                span.textContent = sentence;

                element.appendChild(span);

                sentences.push(span);
            });
        });

        sentencesRef.current = sentences;

        return () => {
            /*
             * Don't leave manipulated DOM behind.
             * React will recreate it when necessary.
             */
        };
    }, []);

    /*
     * Highlight a sentence
     */
    const highlightSentence = (index) => {
        const sentences = sentencesRef.current;

        sentences.forEach((sentence, i) => {
            sentence.classList.toggle(
                "publication-sentence-active",
                i === index
            );
        });

        const activeSentence = sentences[index];

        if (activeSentence) {
            activeSentence.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }

        currentSentenceRef.current = index;
    };

    /*
     * Clear highlighting
     */
    const clearHighlight = () => {
        sentencesRef.current.forEach((sentence) => {
            sentence.classList.remove(
                "publication-sentence-active"
            );
        });

        currentSentenceRef.current = -1;
    };

    /*
     * Read current sentence and continue
     */
    const speakNextSentence = () => {
        const sentences = sentencesRef.current;

        if (
            sentenceIndexRef.current >= sentences.length
        ) {
            setIsReading(false);
            setIsPaused(false);
            clearHighlight();
            return;
        }

        const index = sentenceIndexRef.current;

        const sentence = sentences[index];

        if (!sentence) {
            sentenceIndexRef.current += 1;
            speakNextSentence();
            return;
        }

        const text = sentence.textContent?.trim();

        if (!text) {
            sentenceIndexRef.current += 1;
            speakNextSentence();
            return;
        }

        highlightSentence(index);

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.rate = 0.9;
        utterance.pitch = 1;

        utteranceRef.current = utterance;

        utterance.onstart = () => {
            setIsReading(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            sentenceIndexRef.current += 1;

            if (sentenceIndexRef.current < sentences.length) {
                speakNextSentence();
            } else {
                setIsReading(false);
                setIsPaused(false);
                clearHighlight();
            }
        };

        utterance.onerror = () => {
            setIsReading(false);
            setIsPaused(false);
            clearHighlight();
        };

        window.speechSynthesis.speak(utterance);
    };

    /*
     * Start
     */
    const startReading = () => {
        if (!("speechSynthesis" in window)) {
            alert(
                "Read Aloud is not supported in this browser."
            );
            return;
        }

        window.speechSynthesis.cancel();

        sentenceIndexRef.current = 0;

        clearHighlight();

        speakNextSentence();
    };

    /*
     * Pause
     */
    const pauseReading = () => {
        window.speechSynthesis?.pause();

        setIsPaused(true);
    };

    /*
     * Resume
     */
    const resumeReading = () => {
        window.speechSynthesis?.resume();

        setIsPaused(false);
    };

    /*
     * Stop
     */
    const stopReading = () => {
        window.speechSynthesis?.cancel();

        sentenceIndexRef.current = 0;

        setIsReading(false);
        setIsPaused(false);

        clearHighlight();
    };

    /*
     * Font controls
     */
    const increaseFont = () => {
        setFontSize((size) =>
            Math.min(size + 1, 22)
        );
    };

    const decreaseFont = () => {
        setFontSize((size) =>
            Math.max(size - 1, 15)
        );
    };

    return (
        <>
            <div
                className="reading-progress"
                aria-hidden="true"
            />

            <section
                className={`reading-tools reading-tools-${position} ${footerVisible
                        ? "reading-tools-footer-visible"
                        : ""
                    }`}
                aria-label="Reading controls"
            >
                <div className="reading-tools-inner">

                    <div className="reading-tools-info">


                        <div>
                            <span className="reading-tools-label">
                                READ THIS PUBLICATION
                            </span>

                            <span className="reading-tools-time">
                                {readTime}
                            </span>
                        </div>
                    </div>

                    <div className="reading-tools-actions">

                        {!isReading && (
                            <button
                                type="button"
                                onClick={startReading}
                                className="reading-tool-button primary"
                            >
                                <span>▶</span>
                                <span>READ ALOUD</span>
                            </button>
                        )}

                        {isReading && !isPaused && (
                            <button
                                type="button"
                                onClick={pauseReading}
                                className="reading-tool-button primary"
                            >
                                <span>Ⅱ</span>
                                <span>PAUSE</span>
                            </button>
                        )}

                        {isReading && isPaused && (
                            <button
                                type="button"
                                onClick={resumeReading}
                                className="reading-tool-button primary"
                            >
                                <span>▶</span>
                                <span>RESUME</span>
                            </button>
                        )}

                        {isReading && (
                            <button
                                type="button"
                                onClick={stopReading}
                                className="reading-tool-button"
                            >
                                <span>■</span>
                                <span>STOP</span>
                            </button>
                        )}

                        <span className="reading-divider" />

                        <button
                            type="button"
                            onClick={decreaseFont}
                            className="font-button"
                            aria-label="Decrease text size"
                        >
                            A−
                        </button>

                        <button
                            type="button"
                            onClick={increaseFont}
                            className="font-button"
                            aria-label="Increase text size"
                        >
                            A+
                        </button>

                        <span className="reading-divider" />

                        <div className="reading-position">
                            <button
                                type="button"
                                className={`position-button ${position === "left"
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() => setPosition("left")}
                                aria-label="Move reader to bottom left"
                            >
                                ↙
                            </button>

                            <button
                                type="button"
                                className={`position-button ${position === "center"
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setPosition("center")
                                }
                                aria-label="Move reader to bottom center"
                            >
                                ↓
                            </button>

                            <button
                                type="button"
                                className={`position-button ${position === "right"
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() => setPosition("right")}
                                aria-label="Move reader to bottom right"
                            >
                                ↘
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}