import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

// --- Minimal Global Styles & Custom Animations ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

    :root {
      --bg-base: #020202;
      --text-main: #ffffff;
      --text-muted: #888888;
      --accent-orange: #ff5e00;
      --accent-amber: #ffaa00;
      --accent-blue: #0044ff;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    }

    .font-display {
      font-family: 'Outfit', sans-serif;
    }

    ::-webkit-scrollbar {
      width: 8px;
      background: var(--bg-base);
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }

    /* Fluid Typography Scaling */
    .text-huge {
      font-size: clamp(4rem, 12vw, 12rem);
      line-height: 0.85;
      letter-spacing: -0.04em;
    }

    /* Blob Animations */
    @keyframes blobFloat1 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      33% { transform: translate(5%, -5%) scale(1.05) rotate(5deg); }
      66% { transform: translate(-2%, 5%) scale(0.95) rotate(-5deg); }
    }
    
    @keyframes blobFloat2 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      33% { transform: translate(-5%, 8%) scale(1.1) rotate(-3deg); }
      66% { transform: translate(4%, -4%) scale(0.9) rotate(3deg); }
    }

    .animate-blob-1 { animation: blobFloat1 18s ease-in-out infinite; }
    .animate-blob-2 { animation: blobFloat2 22s ease-in-out infinite; }
    .animate-blob-3 { animation: blobFloat1 25s ease-in-out infinite reverse; }

    /* Glassmorphism utilities */
    .glass-panel {
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .glass-pill {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Scroll Reveal Transition */
    .reveal {
      opacity: 0;
      transform: translateY(40px) scale(0.98);
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `}</style>
);

// --- Custom Hooks ---

// Tracks mouse position for subtle parallax motion control
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize between -1 and 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
};

// Intersection Observer for scroll animations
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${isVisible ? 'active' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- Components ---

// Fluid, glowing background blobs with parallax
const BackgroundCanvas = () => {
    const { x, y } = useMousePosition();

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Top Left / Center Orange Blob */}
            <div
                className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full animate-blob-1 opacity-70 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(255, 94, 0, 0.4), rgba(255, 170, 0, 0.1), transparent 60%)',
                    filter: 'blur(80px)',
                    transform: `translate(${x * 30}px, ${y * 30}px)`
                }}
            />

            {/* Center Right Dark Blue/Purple Blob */}
            <div
                className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-blob-2 opacity-60 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 60% 50%, rgba(0, 68, 255, 0.3), rgba(100, 0, 255, 0.1), transparent 60%)',
                    filter: 'blur(90px)',
                    transform: `translate(${x * -40}px, ${y * -40}px)`
                }}
            />

            {/* Bottom Center Amber Blob */}
            <div
                className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[50vw] rounded-full animate-blob-3 opacity-50 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 120, 0, 0.3), rgba(255, 50, 0, 0.1), transparent 65%)',
                    filter: 'blur(100px)',
                    transform: `translate(${x * 20}px, ${y * -20}px)`
                }}
            />
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-center pointer-events-none">
            <div className="w-full max-w-7xl flex justify-between items-center pointer-events-auto">

                {/* Logo */}
                <div className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                        <div className="bg-white rounded-tl-sm"></div>
                        <div className="bg-white/50 rounded-tr-sm"></div>
                        <div className="bg-white/50 rounded-bl-sm"></div>
                        <div className="bg-[#ff5e00] rounded-br-sm"></div>
                    </div>
                    neuaurelius
                </div>

                {/* Desktop Nav Pills */}
                <nav className="hidden md:flex items-center gap-2 glass-pill px-2 py-1.5 rounded-full">
                    {['index', 'manifesto', 'trajectories', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all capitalize"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="#contact" className="hidden md:flex items-center px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform">
                    Connect
                </a>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-8 gap-6 pointer-events-auto md:hidden">
                    {['index', 'manifesto', 'trajectories', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-display text-white/80 hover:text-white capitalize"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

const Hero = () => {
    return (
        <section id="index" className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10 z-10">
            <div className="w-full max-w-[1600px] px-4 md:px-8 relative h-[80vh] flex flex-col justify-center">

                {/* Floating Stat 1 */}
                <RevealOnScroll delay={400} className="absolute top-[10%] right-[15%] md:right-[20%] text-right hidden md:block">
                    <div className="text-3xl md:text-5xl font-display font-light text-white">+2023</div>
                    <div className="text-xs text-white/40 tracking-widest uppercase mt-1">Est. Operations</div>
                </RevealOnScroll>

                {/* Main Staggered Typography matching reference */}
                <div className="relative w-full h-full flex flex-col justify-center font-display font-medium text-white pointer-events-none">

                    <RevealOnScroll delay={100} className="w-full flex justify-start">
                        <h1 className="text-huge tracking-tighter mix-blend-overlay text-white/90">
                            architecting
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200} className="w-full flex justify-end md:justify-center -mt-4 md:-mt-12 relative z-10">
                        <h1 className="text-huge tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            embodied
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300} className="w-full flex justify-start md:justify-end md:pr-[10%] -mt-4 md:-mt-12">
                        <h1 className="text-huge tracking-tighter text-white/80">
                            reality
                        </h1>
                    </RevealOnScroll>

                </div>

                {/* Floating Context Text */}
                <RevealOnScroll delay={500} className="absolute left-[5%] md:left-[10%] top-[40%] max-w-[280px]">
                    <p className="text-sm text-white/60 leading-relaxed font-light">
                        We are building the physical and cognitive infrastructure for production-ready robots that can work in real environments.
                    </p>
                </RevealOnScroll>

                {/* Floating Stat 2 */}
                <RevealOnScroll delay={600} className="absolute bottom-[10%] right-[5%] md:right-[15%] text-right">
                    <div className="text-2xl md:text-4xl font-display font-light text-white">+ASI</div>
                    <div className="text-xs text-white/40 tracking-widest uppercase mt-1">Cognitive Scaling</div>
                </RevealOnScroll>

            </div>
        </section>
    );
};

const ToggleSection = () => {
    return (
        <div className="w-full flex justify-center py-10 relative z-10">
            <RevealOnScroll>
                <div className="glass-pill p-1.5 flex items-center rounded-full">
                    <div className="px-6 py-2.5 bg-white text-black text-xs md:text-sm font-bold rounded-full cursor-pointer">
                        Hardware Form
                    </div>
                    <div className="px-6 py-2.5 text-white/60 text-xs md:text-sm font-medium rounded-full cursor-pointer hover:text-white transition-colors">
                        Cognitive Logic
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};

const Manifesto = () => {
    return (
        <section id="manifesto" className="relative w-full py-24 md:py-40 z-10 flex justify-center">
            <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24 relative">

                {/* Left visually empty to let background blobs shine, acting as the 'Orb' area */}
                <div className="w-full md:w-1/2 relative min-h-[300px] flex items-center justify-center">
                    {/* Inner distinct glowing orb for this section */}
                    <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full mix-blend-screen animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, rgba(255, 170, 0, 0.4) 0%, rgba(255, 94, 0, 0.1) 50%, transparent 70%)',
                            filter: 'blur(40px)'
                        }}
                    />
                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 relative z-10">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-8 leading-tight tracking-tight">
                            Intelligence requires a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffaa00] to-[#ff5e00]">physical form.</span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={150}>
                        <p className="text-white/70 leading-relaxed text-lg mb-6 font-light">
                            By moving beyond software abstractions, we design robots that can handle real-world work with dependable perception, control, and mechanical precision.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <p className="text-white/70 leading-relaxed text-lg font-light">
                            Software alone is insufficient. At Neuaurelius, we approach intelligence as a robotics manufacturing challenge, building complete systems for physical deployment.
                        </p>
                    </RevealOnScroll>
                </div>

            </div>
        </section>
    );
};

const Trajectories = () => {
    const features = [
        {
            title: "Long-Endurance Operation",
            desc: "We solve the power and uptime problem so robots can work through long shifts in factories, warehouses, and field environments.",
            layout: "left"
        },
        {
            title: "Reliable Physical Precision",
            desc: "We build robots that place, pick, assemble, and manipulate with repeatable accuracy in the messy real world.",
            layout: "right"
        },
        {
            title: "Safe Autonomy",
            desc: "We solve perception, control, and decision-making so each robot can operate safely around people, equipment, and changing conditions.",
            layout: "bottom"
        }
    ];

    return (
        <section id="trajectories" className="relative w-full py-24 z-10 flex flex-col items-center">
            <RevealOnScroll>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-16 text-center">
                    Problems We Solve
                </h3>
            </RevealOnScroll>

            <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">

                {/* Top Left Card */}
                <RevealOnScroll delay={100} className="md:col-span-1 h-full">
                    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-end group hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5e00] rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />
                        <h4 className="text-xl font-display font-medium text-white mb-4 relative z-10">{features[0].title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed font-light relative z-10">{features[0].desc}</p>
                    </div>
                </RevealOnScroll>

                {/* Center Graphic Area (Orb) */}
                <RevealOnScroll delay={200} className="md:col-span-1 h-[250px] md:h-auto flex items-center justify-center relative">
                    <div className="w-full h-full glass-panel rounded-3xl flex items-center justify-center overflow-hidden">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full mix-blend-screen"
                            style={{
                                background: 'radial-gradient(circle, rgba(0, 68, 255, 0.8), rgba(0, 0, 0, 0) 70%)',
                                boxShadow: 'inset 0 0 50px rgba(255,255,255,0.2)',
                                animation: 'blobFloat1 10s ease-in-out infinite'
                            }}
                        />
                        <div className="absolute text-center z-10 pointer-events-none">
                            <p className="text-white/80 font-display font-medium text-sm tracking-widest uppercase">System Core</p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Top Right Card */}
                <RevealOnScroll delay={300} className="md:col-span-1 h-full">
                    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-end group hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0044ff] rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />
                        <h4 className="text-xl font-display font-medium text-white mb-4 relative z-10">{features[1].title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed font-light relative z-10">{features[1].desc}</p>
                    </div>
                </RevealOnScroll>

                {/* Bottom Wide Card */}
                <RevealOnScroll delay={400} className="md:col-span-3">
                    <div className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end group hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e00]/0 via-[#ff5e00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="max-w-xl relative z-10">
                            <h4 className="text-2xl font-display font-medium text-white mb-4">{features[2].title}</h4>
                            <p className="text-base text-white/60 leading-relaxed font-light">{features[2].desc}</p>
                        </div>
                        <div className="mt-8 md:mt-0 relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white transition-all">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer id="contact" className="relative w-full pt-32 pb-10 z-10 border-t border-white/5 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">

                    <RevealOnScroll>
                        <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight mb-6">
                            Ready to <br />architect reality?
                        </h2>
                        <a href="mailto:post@neuaurelius.com" className="inline-flex items-center gap-4 text-xl md:text-2xl text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-2">
                            post@neuaurelius.com
                            <ArrowUpRight size={24} />
                        </a>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200} className="flex flex-col gap-8 md:text-right">
                        <div>
                            <p className="text-white font-display font-medium mb-1 text-lg">Location</p>
                            <p className="text-white/50 font-light">Jaipur, Rajasthan<br />India</p>
                        </div>
                        <div>
                            <p className="text-white font-display font-medium mb-1 text-lg">Inquiries</p>
                            <p className="text-white/50 font-light">Robotics Manufacturing<br />Engineering Partnerships</p>
                        </div>
                    </RevealOnScroll>

                </div>

                <RevealOnScroll delay={300} className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/40 tracking-widest uppercase">
                    <p>© 2024 Neuaurelius. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </RevealOnScroll>
            </div>
        </footer>
    );
};

// --- Main App Container ---
const DesignTwo = () => {
    return (
        <>
            <GlobalStyles />
            <BackgroundCanvas />

            <main className="relative w-full selection:bg-[#ff5e00] selection:text-white">
                <Navbar />
                <Hero />
                <ToggleSection />
                <Manifesto />
                <Trajectories />
                <Footer />
            </main>
        </>
    );
};

export default DesignTwo;