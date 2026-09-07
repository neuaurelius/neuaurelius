"use client";

import DotGrid from "@/components/DotGrid";
import "./Hero.css";

const lines = [
    "GENERALIZED",
    "EMBODIED",
    "INTELLIGENCE",
];

function AnimatedWord({
    text,
    className = "",
}) {
    return (
        <div className={`hero-word ${className}`}>
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    className="hero-char"
                    style={{
                        "--char-index": index,
                        "--char-total": text.length,
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

export default function Hero() {
    return (
        <section className="hero">



            <div className="hero-ripple">
                <DotGrid
                    dotSize={4}
                    gap={32}
                    baseColor="#e7e5e5"
                    activeColor="#000000"
                    proximity={230}
                    speedTrigger={340}
                    shockRadius={450}
                    shockStrength={5}
                    maxSpeed={9000}
                    resistance={1650}
                    returnDuration={0.9}
                />
            </div>




            <div className="hero-content">

                <div className="hero-typography">

                    <AnimatedWord
                        text="GENERALIZED"
                        className="hero-line-one"
                    />

                    <AnimatedWord
                        text="EMBODIED"
                        className="hero-line-two"
                    />

                    <AnimatedWord
                        text="INTELLIGENCE"
                        className="hero-line-three"
                    />

                </div>

            </div>





        </section>
    );
}