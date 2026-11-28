"use client";

import { useEffect, useRef, useState } from "react";

// Extracts clean human-readable text for SpeechSynthesis without KaTeX MathML duplicates
function getCleanSpeechText(rootEl) {
    const clone = rootEl.cloneNode(true);
    clone
        .querySelectorAll(".katex-mathml, annotation")
        .forEach((el) => el.remove());
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
}

// Wraps sentences in .publication-sentence spans WITHOUT destroying KaTeX, links, bold, or italic HTML
function wrapSentencesPreservingHtml(blockEl) {
    const createdSpans = [];
    const walker = document.createTreeWalker(
        blockEl,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.nodeValue || !node.nodeValue.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (
                    node.parentElement?.closest(
                        ".katex, .katex-mathml, code, pre, .publication-sentence"
                    )
                ) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            },
        }
    );

    const textNodes = [];
    let current;
    while ((current = walker.nextNode())) {
        textNodes.push(current);
    }

    textNodes.forEach((textNode) => {
        const raw = textNode.nodeValue;
        const parts = raw.match(/[^.!?]+[.!?]+\s*|[^.!?]+$/g);
        if (!parts || parts.length === 0) return;

        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
            const span = document.createElement("span");
            span.className = "publication-sentence";
            span.textContent = part;
            frag.appendChild(span);
            if (part.trim()) {
                createdSpans.push(span);
            }
        });

        textNode.parentNode?.replaceChild(frag, textNode);
    });

    return createdSpans;
}

export default function PublicationReader({ title, readTime }) {
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
                document.documentElement.scrollHeight - window.innerHeight;
            const progress =
                documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

            document.documentElement.style.setProperty(
                "--reading-progress",
                `${progress}%`
            );
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
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
            { threshold: 0 }
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
     * Wrap sentence segments without mutating KaTeX, links, or formatting tags
     */
    useEffect(() => {
        const article = document.querySelector(".publication-content");
        if (!article) return;

        const elements = article.querySelectorAll(
            "p, li, blockquote, h2, h3, h4"
        );

        const sentences = [];
        elements.forEach((element) => {
            const wrapped = wrapSentencesPreservingHtml(element);
            sentences.push(...wrapped);
        });

        sentencesRef.current = sentences;
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
            sentence.classList.remove("publication-sentence-active");
        });
        currentSentenceRef.current = -1;
    };

    /*
     * Read current sentence and continue
     */
    const speakNextSentence = () => {
        const sentences = sentencesRef.current;

        if (sentenceIndexRef.current >= sentences.length) {
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

        const text = getCleanSpeechText(sentence);
        if (!text) {
            sentenceIndexRef.current += 1;
            speakNextSentence();
            return;
        }

        highlightSentence(index);

        const utterance = new SpeechSynthesisUtterance(text);
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

    const startReading = () => {
        if (!("speechSynthesis" in window)) {
            alert("Read Aloud is not supported in this browser.");
            return;
        }

        window.speechSynthesis.cancel();
        sentenceIndexRef.current = 0;
        clearHighlight();
        speakNextSentence();
    };

    const pauseReading = () => {
        window.speechSynthesis?.pause();
        setIsPaused(true);
    };

    const resumeReading = () => {
        window.speechSynthesis?.resume();
        setIsPaused(false);
    };

    const stopReading = () => {
        window.speechSynthesis?.cancel();
        sentenceIndexRef.current = 0;
        setIsReading(false);
        setIsPaused(false);
        clearHighlight();
    };

    const increaseFont = () => {
        setFontSize((size) => Math.min(size + 1, 22));
    };

    const decreaseFont = () => {
        setFontSize((size) => Math.max(size - 1, 15));
    };

    return (
        <>
            <div className="reading-progress" aria-hidden="true" />


        </>
    );
}
