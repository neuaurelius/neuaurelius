import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

const GlobalStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

    :root {
      --bg: #040404;
      --surface: #0a0a0a;
      --surface2: #121212;
      --text: #ffffff;
      --text2: #c8c8c8;
      --muted: #777777;
      --border: rgba(255,255,255,0.15);
      --accent: #ff6aaa;
      --accent2: #f40069;
      --font: 'Gilmer', 'Inter', sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }

    [data-theme="light"] {
      --bg: #f5f5f3;
      --surface: #ebebeb;
      --surface2: #e0e0de;
      --text: #111111;
      --text2: #444444;
      --muted: #666666;
      --border: rgba(0,0,0,0.15);
 --accent: #f40069;
      --accent2: #ff6aaa;
    }

    @font-face { font-family:'Gilmer'; src:url('/fonts/Gilmer Light.otf') format('opentype'); font-weight:300; }
    @font-face { font-family:'Gilmer'; src:url('/fonts/Gilmer Regular.otf') format('opentype'); font-weight:400; }
    @font-face { font-family:'Gilmer'; src:url('/fonts/Gilmer Medium.otf') format('opentype'); font-weight:500; }
    @font-face { font-family:'Gilmer'; src:url('/fonts/Gilmer Bold.otf') format('opentype'); font-weight:600; }
    @font-face { font-family:'Gilmer'; src:url('/fonts/Gilmer Heavy.otf') format('opentype'); font-weight:800; }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 4px; background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: #333; }

    .loader-svg path {
      stroke-dasharray: 12000;
      stroke-dashoffset: 12000;
      animation: drawLogo 2.2s cubic-bezier(0.16,1,0.3,1) forwards;
      fill: transparent;
      stroke: currentColor;
      stroke-width: 20px;
    }
    @keyframes drawLogo {
      0% { stroke-dashoffset: 12000; fill: transparent; }
      60% { stroke-dashoffset: 0; fill: transparent; }
      100% { stroke-dashoffset: 0; fill: currentColor; }
    }
    
    .reveal {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .accent-num {
      color: var(--accent);
      font-family: var(--mono);
      letter-spacing: -0.05em;
    }

    .sharp-button {
      background: var(--accent);
      color: #000;
      border: 1px solid var(--accent);
      padding: 14px 32px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      font-family: var(--mono);
      transition: all 0.2s;
      border-radius: 2px;
    }
    .sharp-button:hover {
      background: transparent;
      color: var(--accent);
    }

    .sharp-button-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      padding: 14px 32px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      font-family: var(--mono);
      transition: all 0.2s;
      border-radius: 2px;
    }
    .sharp-button-outline:hover {
      border-color: var(--text);
    }

    /* Responsive Grid Classes */
    .responsive-grid-2 {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 80px;
      align-items: start;
    }
    .responsive-grid-half {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }
    .responsive-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .responsive-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 48px;
    }
    .responsive-grid-contact {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 80px;
      align-items: start;
    }

    @media (max-width: 960px) {
      .responsive-grid-2,
      .responsive-grid-half,
      .responsive-grid-contact {
        grid-template-columns: 1fr;
        gap: 48px;
      }
      .responsive-grid-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      .responsive-grid-3 {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    @media (max-width: 600px) {
      .responsive-grid-4 {
        grid-template-columns: 1fr;
      }
      .responsive-grid-2,
      .responsive-grid-half,
      .responsive-grid-contact {
        gap: 32px;
      }
    }
  `}} />
);

const NeuaureliusSymbolLogo = ({ className, width = "100%", height = "100%" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 3600 2700" version="1.1" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
        <path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z" />
    </svg>
);

const NeuaureliusTextLogo = ({ className, width = "100%", height = "100%", style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 375 75" preserveAspectRatio="xMidYMid meet" className={className} style={style}>
        <g fill="currentColor" fillOpacity="1" fillRule="nonzero">
            <path d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " />
            <path d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 Z M 50.476562 43.789062 " />
            <path d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " />
            <path d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " />
            <path d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " />
            <path d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " />
            <path d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " />
            <path d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " />
            <path fillRule="evenodd" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " />
            <path d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " />
            <path d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 Z M 357.707031 67.59375 " />
        </g>
    </svg>
);

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

const Reveal = ({ children, delay = 0, style = {} }) => {
    const ref = useReveal();
    return (
        <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
            {children}
        </div>
    );
};

const Preloader = ({ done }) => (
    <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.8s cubic-bezier(0.76,0,0.24,1)',
        transform: done ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: done ? 'none' : 'auto'
    }}>
        <div style={{ width: 64, height: 48, color: 'var(--text)' }}>
            <NeuaureliusSymbolLogo className="loader-svg" />
        </div>
    </div>
);

const Nav = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobile, setMobile] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            setHidden(y > lastY.current && y > 80);
            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const go = (id) => {
        setMobile(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const links = [
        { id: 'opportunity', label: 'Opportunity' },
        { id: 'research', label: 'Research' },
        { id: 'sectors', label: 'Sectors' },
        { id: 'market', label: 'Market' },
        { id: 'investors', label: 'Investors' },
        { id: 'contact', label: 'Contact' },
    ];

    const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                display: 'flex', justifyContent: 'center',
                padding: scrolled ? '16px 16px 0' : '0',
                transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s ease',
                pointerEvents: 'none'
            }}>
                <div style={{
                    width: '100%', maxWidth: 1320,
                    background: scrolled ? 'var(--bg)' : 'transparent',
                    border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                    borderRadius: 2,
                    padding: '30px 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'auto'
                }}>
                    <button onClick={() => go('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
                        <NeuaureliusTextLogo width="120px" height="24px" style={{ fill: 'currentColor' }} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                        {links.map(l => (
                            <button key={l.id} onClick={() => go(l.id)} style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600,
                                letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font)',
                                transition: 'color 0.2s'
                            }}
                                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                            >{l.label}</button>
                        ))}
                        <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
                        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>
                            <ThemeIcon size={16} />
                        </button>
                    </div>

                    <button onClick={() => setMobile(!mobile)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }} className="mobile-menu-btn">
                        {mobile ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <div style={{
                position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 999,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
                opacity: mobile ? 1 : 0, pointerEvents: mobile ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }}>
                {links.map(l => (
                    <button key={l.id} onClick={() => go(l.id)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text)', fontSize: '1.2rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font)'
                    }}>{l.label}</button>
                ))}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
};

const Globe = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const S = 1000;
        canvas.width = S; canvas.height = S;
        const cx = S / 2, cy = S / 2, R = 440;
        const pts = [];
        for (let i = 2; i < 34; i++) {
            const lat = Math.PI * (-0.5 + i / 36);
            for (let j = 0; j < 68; j++) {
                pts.push({ x: Math.cos(lat) * Math.cos(2 * Math.PI * j / 68), y: Math.sin(lat), z: Math.cos(lat) * Math.sin(2 * Math.PI * j / 68), t: 'g' });
            }
        }
        for (let i = 0; i < 2800; i++) {
            const y = 1 - (i / 2799) * 2, r = Math.sqrt(1 - y * y), t = Math.PI * (3 - Math.sqrt(5)) * i;
            pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, t: 'd' });
        }
        let angle = 0, raf;
        const draw = () => {
            ctx.clearRect(0, 0, S, S);
            angle += 0.0008;
            const cosY = Math.cos(angle), sinY = Math.sin(angle), cosX = Math.cos(0.12), sinX = Math.sin(0.12);
            const proj = pts.map(p => {
                const x1 = p.x * cosY - p.z * sinY, z1 = p.z * cosY + p.x * sinY;
                const y2 = p.y * cosX - z1 * sinX, z2 = z1 * cosX + p.y * sinX;
                const sc = 3.5 / (3.5 + z2);
                return { x: cx + x1 * R * sc, y: cy + y2 * R * sc, z: z2, sc, t: p.t };
            }).filter(p => p.z > -0.1).sort((a, b) => b.z - a.z);

            for (const p of proj) {
                const a = Math.min(1, (p.z + 1.2) * 0.8);
                if (p.t === 'g') {
                    ctx.fillStyle = `rgba(232,200,122,${a * 0.4})`;
                    ctx.fillRect(p.x, p.y, 1.5 * p.sc, 1.5 * p.sc);
                } else {
                    ctx.fillStyle = `rgba(180,140,60,${a * 0.2})`;
                    ctx.fillRect(p.x, p.y, 1 * p.sc, 1 * p.sc);
                }
            }
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);
    return (
        <div style={{ position: 'absolute', right: '-30%', top: '50%', transform: 'translateY(-50%)', width: 800, height: 800, pointerEvents: 'none', zIndex: 0 }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0.7 }} />
        </div>
    );
};

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const h = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
            <div style={{ transform: `translateY(${scrollY * 0.25}px)`, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <Globe />
            </div>

            <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px', width: '100%', position: 'relative', zIndex: 1 }}>


                <Reveal delay={200}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: 28, maxWidth: '12ch' }}>
                        Manufacturing<br />
                        <span style={{ color: 'var(--muted)' }}>the Humanoid</span><br />
                        <span style={{ color: 'var(--muted)' }}>Future.</span>
                    </h1>
                </Reveal>

                <Reveal delay={350}>
                    <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'var(--text2)', maxWidth: 480, lineHeight: 1.6, marginBottom: 48, fontWeight: 400 }}>
                        Neuaurelius builds production ready humanoid robots for the world's most demanding environments. We target factories, warehouses, defense, and eldercare.
                    </p>
                </Reveal>

                <Reveal delay={500}>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <button className="sharp-button" onClick={() => document.getElementById('investors')?.scrollIntoView({ behavior: 'smooth' })}>
                            Investor Relations
                        </button>
                        <button className="sharp-button-outline" onClick={() => document.getElementById('opportunity')?.scrollIntoView({ behavior: 'smooth' })}>
                            Our Vision
                        </button>
                    </div>
                </Reveal>

                <Reveal delay={700}>
                    <div className="responsive-grid-3" style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid var(--border)', maxWidth: 600 }}>
                        {[
                            { val: '$251B', sub: 'Market by 2035' },
                            { val: '49%', sub: 'Annual CAGR' },
                            { val: '2026', sub: 'Entry Window' }
                        ].map(s => (
                            <div key={s.val}>
                                <div className="accent-num" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, marginBottom: 4 }}>{s.val}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--mono)' }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>


        </section>
    );
};

const Section = ({ id, children, style = {} }) => (
    <section id={id} style={{ padding: 'clamp(80px, 10vw, 140px) 0', borderTop: '1px solid var(--border)', ...style }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
            {children}
        </div>
    </section>
);

const Label = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
        <div style={{ width: 12, height: 12, background: 'var(--accent)' }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font)' }}>{children}</span>
    </div>
);

const Card = ({ children, style = {}, active = false }) => (
    <div style={{
        background: active ? 'var(--surface)' : 'var(--bg)',
        border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: 2,
        padding: '32px 36px', ...style
    }}>
        {children}
    </div>
);

const Opportunity = () => (
    <Section id="opportunity" style={{ background: 'var(--bg)' }}>
        <Reveal>
            <Label>The Opportunity</Label>
        </Reveal>
        <div className="responsive-grid-2">
            <div>
                <Reveal>
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 32 }}>
                        The dominant humanoid platform has not yet been established.
                    </h2>
                </Reveal>
                <Reveal delay={150}>
                    <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '1.05rem', fontWeight: 400, marginBottom: 24 }}>
                        The global humanoid robot market is projected to reach $46B to $251B by 2035, growing at 35 to 49% annually. It is one of the fastest expanding sectors in technology history. We are entering the critical 2026 to 2028 window before any competitor reaches manufacturing scale.
                    </p>
                </Reveal>
                <Reveal delay={250}>
                    <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '1.05rem', fontWeight: 400 }}>
                        The race to deploy is real, and the position of industry leader is still open. Neuaurelius is building now at pre-seed with the conviction that the next 24 months represent the last window for independent platforms to establish a foothold.
                    </p>
                </Reveal>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                    { label: 'Global market by 2035', val: '$46B to $251B', src: 'Goldman Sachs / SNS Insider' },
                    { label: 'Market CAGR 2026 to 2035', val: '35% to 49%', src: 'MarketsandMarkets, 2026' },
                    { label: 'India robotics market 2026', val: '$2.14B', src: 'Robolabs / IFR, 2026' },
                    { label: 'India robot density vs. South Korea', val: '12 vs 415', src: 'IFR World Robotics 2024' },
                    { label: 'RaaS market growth', val: '+17.3%', src: 'Future Market Insights, 2026' },
                ].map((s, i) => (
                    <Reveal key={s.label} delay={i * 80}>
                        <Card style={{ padding: '20px 24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', fontFamily: 'var(--font)', marginBottom: 6 }}>{s.label}</div>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--mono)' }}>REF: {s.src}</div>
                                </div>
                                <div className="accent-num" style={{ fontSize: '1.2rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{s.val}</div>
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </div>

        <Reveal delay={200}>
            <div className="responsive-grid-3" style={{ marginTop: 80 }}>
                {[
                    {
                        title: 'Hardware is commoditizing',
                        body: 'Humanoid unit costs fell from $85K in 2023 to $25K in 2025. The moat is in the intelligence layer, not the hardware. This is precisely where Neuaurelius builds.'
                    },
                    {
                        title: 'The RaaS shift is irreversible',
                        body: 'Over 68% of enterprises now leverage Robotics as a Service to eliminate CapEx. Every robot we deploy feeds our data flywheel. This compounds our intelligence advantage with every deployment.'
                    },
                    {
                        title: 'The supply chain gap is our window',
                        body: 'Actuators, tendon drives, and dexterous hands do not yet exist at production volume. Companies that architect around this constraint will own the next decade. Our hardware agnostic approach is built for this reality.'
                    }
                ].map((c, i) => (
                    <Reveal key={c.title} delay={i * 120}>
                        <Card style={{ height: '100%' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 16, lineHeight: 1.3 }}>{c.title}</h3>
                            <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 400 }}>{c.body}</p>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Reveal>
    </Section>
);

const CoreSystems = () => (
    <Section id="research" style={{ background: 'var(--surface)' }}>
        <Reveal>
            <Label>Core Technical Systems</Label>
        </Reveal>
        <Reveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 32, maxWidth: '16ch' }}>
                Three problems. Every robot. Solved at the foundation.
            </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {[
                {
                    number: '01',
                    title: 'High-Density Energy Storage',

                    body: 'Robots must operate through full production cycles, 8–24 hours daily, without downtime for charging. We engineer battery systems, thermal management, and power distribution so every unit survives the factory floor.',
                    points: ['Multi-cell architecture', 'Thermal stability', 'Hot-swap capability', 'Predictive load balancing']
                },
                {
                    number: '02',
                    title: 'Biomechanical Precision',

                    body: 'Humanoid kinematics must deliver repeatable accuracy in unstructured environments. We design servo-controlled joints, sensing feedback, and motion planning so every movement is precise even when external conditions shift.',
                    points: ['Servo redundancy', 'Multi-axis sensing', 'Real-time feedback', 'Adaptive compliance']
                },
                {
                    number: '03',
                    title: 'Computational Cognition',

                    body: 'True autonomy demands cognition: perception, real-time reasoning, and safe decision-making around people and equipment. We build control systems that understand context, adjust dynamically, and never compromise operator safety.',
                    points: ['Distributed cognition', 'Real-time perception', 'Safety-first reasoning', 'Context awareness']
                }
            ].map((sys, i) => (
                <Reveal key={sys.number} delay={i * 120}>
                    <div style={{
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        background: 'var(--bg)',
                        padding: '36px 32px',
                        display: 'flex', flexDirection: 'column',
                        height: '100%',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--surface)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'var(--bg)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ fontSize: '3.2rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--mono)', letterSpacing: '-0.08em', marginBottom: 12 }}>
                                {sys.number}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.1, marginBottom: 6 }}>
                                {sys.title}
                            </h3>

                        </div>

                        <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 400, marginBottom: 24, flexGrow: 1 }}>
                            {sys.body}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {sys.points.map((point) => (
                                <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 4, height: 4, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text2)', fontWeight: 400 }}>
                                        {point}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>

    </Section>
);

const Sectors = () => {
    const sectors = [
        {
            label: 'Defense & Security',
            tag: 'Priority Sector',
            body: 'Autonomous patrol, perimeter surveillance, ordnance handling, and logistics in contested environments. Strategic procurement corridors favor domestic manufacturers.',
            stats: [{ v: '~$38B', l: 'Market by 2030' }, { v: 'Active', l: 'TRUST corridor' }]
        },
        {
            label: 'Automotive & Manufacturing',
            tag: 'Largest Segment',
            body: 'The automotive sector drives 36% of robot demand. Humanoids execute precision assembly, quality inspection, and part transfer across 24/7 production cycles.',
            stats: [{ v: '36%', l: 'India demand share' }, { v: '~14%', l: 'Sector CAGR' }]
        },
        {
            label: 'Logistics & Warehousing',
            tag: 'Fastest Growing',
            body: 'Fulfillment infrastructure requires automation growing over 25% annually. Robots manage unstructured picking, inventory tracking, and sorting beyond the capability of fixed conveyors.',
            stats: [{ v: '25%+', l: 'Automation growth' }, { v: '$153M', l: 'AMR market 2025' }]
        },
        {
            label: 'Electronics & Semiconductor',
            tag: 'Volume Production',
            body: 'Assembly plants and semiconductor fabs require precision automation at volume. Electronics represents the second largest segment at 29% of industrial revenue.',
            stats: [{ v: '29%', l: 'Revenue share' }, { v: '~18%', l: 'Sector CAGR' }]
        },
        {
            label: 'Healthcare & Surgery',
            tag: 'High Precision',
            body: 'Surgical assistance, sterile instrument handling, and patient transport require humanoid dexterity. Hospital staffing shortages make robotic support operationally critical.',
            stats: [{ v: '~25%+', l: 'Healthcare CAGR' }, { v: 'Critical', l: 'Staffing gap' }]
        },
        {
            label: 'Eldercare & Assisted Living',
            tag: 'Mega-TAM',
            body: 'India will have 230 million seniors by 2036. Mobility assistance, medication delivery, and emergency response match the capabilities of humanoid form factors.',
            stats: [{ v: '230M', l: 'Seniors by 2036' }, { v: '$10B+', l: 'Eldercare TAM' }]
        },
        {
            label: 'Oil, Gas & Energy',
            tag: 'High-Value',
            body: 'Offshore platform inspection, valve operation, and hazard response put human workers at risk. Humanoids operate safely in infrastructure built entirely for human hands.',
            stats: [{ v: 'Zero', l: 'Exposure target' }, { v: '24/7', l: 'Operation' }]
        },
        {
            label: 'Construction & Real Estate',
            tag: 'Emerging',
            body: 'The construction sector faces acute skilled labor deficits. Bricklaying, rebar tying, and site logistics are repetitive tasks suitable for scalable robotic deployment.',
            stats: [{ v: '$1.4T', l: 'Market by 2030' }, { v: '31M', l: 'Worker deficit' }]
        },
        {
            label: 'Pharmaceutical Processing',
            tag: 'Regulated',
            body: 'Cleanroom compliance, sterile packaging, and batch handling demand contamination free manipulation. Automation penetration remains low in this highly regulated environment.',
            stats: [{ v: '#1', l: 'Generic pharma' }, { v: 'Low', l: 'Current automation' }]
        },
        {
            label: 'Retail & Hospitality',
            tag: 'Consumer-Facing',
            body: 'Shelf stocking, inventory counting, and facility assistance are standard tasks. The retail market grows at 9% annually and provides high visibility early deployment environments.',
            stats: [{ v: '9%', l: 'Retail CAGR' }, { v: '$20B+', l: 'Hospitality market' }]
        },
        {
            label: 'Mining & Subsurface',
            tag: 'Extreme Environments',
            body: 'Underground drilling, structural inspection, and emergency evacuation represent highly dangerous jobs. Robots operating in confined environments replace risk with precision.',
            stats: [{ v: '$6.5B', l: 'Equipment market' }, { v: 'High', l: 'Risk reduction' }]
        },
        {
            label: 'Space & Research',
            tag: 'Long-Term',
            body: 'Advanced space programs and defense labs require robots capable of operating in analog environments and executing high precision assembly tasks.',
            stats: [{ v: 'Active', l: 'ISRO program' }, { v: '2030+', l: 'Deployment' }]
        },
        {
            label: 'Agriculture & Processing',
            tag: 'Underserved',
            body: 'Precision harvesting, crop inspection, and sorting are labor intensive tasks. Humanoid forms navigate uneven terrain where purpose built equipment fails.',
            stats: [{ v: '140M ha', l: 'Cultivated land' }, { v: '$24B+', l: 'Agri-tech 2030' }]
        },
        {
            label: 'Education & Training',
            tag: 'Institutional',
            body: 'Humanoid platforms serve as physical simulation partners in vocational training institutes and engineering colleges, establishing a captive early deployment market.',
            stats: [{ v: '40,000+', l: 'Institutions' }, { v: 'Growing', l: 'EdTech spend' }]
        },
        {
            label: 'Ports & Maritime',
            tag: 'Infrastructure',
            body: 'Cargo handling, container inspection, and facility maintenance require mobile dexterity. Static conveyor systems cannot deliver the necessary flexibility in major port environments.',
            stats: [{ v: '1.6B t', l: 'Annual tonnage' }, { v: '12', l: 'Major ports' }]
        },
        {
            label: 'Textile & Apparel',
            tag: 'Labor-Intensive',
            body: 'The textile industry employs 45 million workers in tasks like thread handling and quality inspection. These tasks require the flexibility provided by dexterous robotic hands.',
            stats: [{ v: '$100B+', l: 'Textile industry' }, { v: '45M', l: 'Sector workers' }]
        }
    ];

    return (
        <Section id="sectors" style={{ background: 'var(--surface)' }}>
            <Reveal>
                <Label>Client Sectors</Label>
            </Reveal>
            <Reveal>
                <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 16, maxWidth: '16ch' }}>
                    Sixteen sectors. One platform. Unlimited deployments.
                </h2>
            </Reveal>
            <Reveal delay={100}>
                <p style={{ color: 'var(--text2)', fontSize: '1rem', fontWeight: 400, maxWidth: 540, marginBottom: 56, lineHeight: 1.6 }}>
                    Humanoid form is the only robot architecture that can operate in every environment built for humans. That is the full scope of our addressable market.
                </p>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {sectors.map((s, i) => (
                    <Reveal key={s.label} delay={i * 40}>
                        <Card style={{ height: '100%', padding: '28px 32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--mono)', border: '1px solid var(--accent)', padding: '4px 8px' }}>{s.tag}</span>
                                <ArrowUpRight size={16} color="var(--muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12, lineHeight: 1.2 }}>{s.label}</h3>
                            <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 400, marginBottom: 24 }}>{s.body}</p>
                            <div style={{ display: 'flex', gap: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                                {s.stats.map(st => (
                                    <div key={st.l}>
                                        <div className="accent-num" style={{ fontSize: '1rem', fontWeight: 600 }}>{st.v}</div>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.05em', fontFamily: 'var(--mono)', marginTop: 4 }}>{st.l}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

const Market = () => {
    const milestones = [
        { year: '2023', val: '$2B to $3B', label: 'Global humanoid market baseline' },
        { year: '2025', val: '$4.87B', label: 'Market reaches first commercial scale' },
        { year: '2026', val: '$2.14B', label: 'India robotics market alone' },
        { year: '2030', val: '$15B to $38B', label: 'Conservative consensus range' },
        { year: '2035', val: '$46B to $251B', label: 'Full market maturity range' },
        { year: '2050', val: '$5T', label: 'Morgan Stanley long-range estimate' },
    ];

    const insights = [
        {
            num: '45,000+',
            label: 'Global installed units in 2025',
            body: 'Up from near zero in 2023. The market is real and accelerating.'
        },
        {
            num: '40%',
            label: 'Hardware cost reduction in 2025',
            body: 'Goldman Sachs documented a 40% year over year cost decline. Hardware is commoditizing rapidly, validating our software first architecture.'
        },
        {
            num: '$26.9B',
            label: 'RaaS market value, 2025',
            body: 'Growing at 17.3% CAGR. Over 68% of enterprises leverage Robotics as a Service to eliminate capital expenditure.'
        },
        {
            num: '30X to 35X',
            label: 'India robot density upside',
            body: 'India has 12 robots per 10,000 workers compared to 415 in South Korea. This gap represents the primary growth opportunity.'
        },
    ];

    return (
        <Section id="market" style={{ background: 'var(--bg)' }}>
            <Reveal>
                <Label>Market Intelligence</Label>
            </Reveal>

            <div className="responsive-grid-half" style={{ marginBottom: 72 }}>
                <div>
                    <Reveal>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24 }}>
                            Every major research house agrees on exponential trajectory.
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p style={{ color: 'var(--text2)', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.6, marginBottom: 20 }}>
                            The wide CAGR range reflects uncertainty about production scale velocity, not market direction. Goldman Sachs raised its estimate significantly after recent data. The conservative anchor is $38B by 2035.
                        </p>
                    </Reveal>
                    <Reveal delay={180}>
                        <p style={{ color: 'var(--text2)', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.6 }}>
                            Morgan Stanley's long range view puts the sector at $5 trillion by 2050, making early stage entry today analogous to investing in the early internet.
                        </p>
                    </Reveal>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <Reveal delay={100}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', fontFamily: 'var(--mono)', padding: '16px 0' }}>Market Growth Timeline</div>
                    </Reveal>
                    {milestones.map((m, i) => (
                        <Reveal key={m.year} delay={i * 40}>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '60px 100px 1fr',
                                gap: 16, alignItems: 'center',
                                padding: '16px 0',
                                borderBottom: i < milestones.length - 1 ? '1px solid var(--border)' : 'none'
                            }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{m.year}</span>
                                <span className="accent-num" style={{ fontSize: '1rem', fontWeight: 600 }}>{m.val}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text2)', fontWeight: 400 }}>{m.label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <div className="responsive-grid-4" style={{ marginBottom: 40 }}>
                {insights.map((ins, i) => (
                    <Reveal key={ins.num} delay={i * 60}>
                        <Card style={{ height: '100%' }}>
                            <div className="accent-num" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 12 }}>{ins.num}</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--mono)' }}>{ins.label}</div>
                            <p style={{ color: 'var(--text2)', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 400 }}>{ins.body}</p>
                        </Card>
                    </Reveal>
                ))}
            </div>


        </Section>
    );
};

const Investors = () => {
    const [open, setOpen] = useState(null);

    const faqs = [
        {
            q: 'What is the business model?',
            a: 'We manufacture humanoid robots and deploy them via a Robotics as a Service model. Customers pay a monthly subscription rather than a large capital purchase. This creates recurring revenue, and every deployed unit generates training data.'
        },
        {
            q: 'Why is the 2026 to 2028 window critical for investment?',
            a: 'No dominant platform has established market leadership. The next 24 months represent the final period to enter before volume producers close the scale gap. We are building at pre-seed to capture this exact window.'
        },
        {
            q: 'What is the path to global markets?',
            a: 'India serves as our manufacturing and data generation base. We target the domestic market first, then expand to Japan, Germany, and the US where labor shortages create urgent demand. Our location provides an unmatched engineering talent advantage.'
        },
        {
            q: 'What sectors do you target first?',
            a: 'Stage 1 targets structured environments like automotive manufacturing and logistics. Stage 2 expands to semi-structured environments including hospitals and pharma. Stage 3 covers unstructured domains like eldercare and agriculture.'
        },
        {
            q: 'How do you handle hardware commoditization?',
            a: 'Hardware commoditization acts as a strategic tailwind. As unit costs fall rapidly, market adoption accelerates. We focus on the intelligence and orchestration layer, which appreciates in value as physical hardware depreciates.'
        },
        {
            q: 'What is the sovereign advantage?',
            a: 'Strategic procurement in defense and allied sectors maintains strict restrictions on foreign hardware. As a domestically manufactured platform, we are uniquely positioned for sensitive procurement channels.'
        }
    ];

    return (
        <Section id="investors" style={{ background: 'var(--surface)' }}>
            <Reveal>
                <Label>Investor Relations</Label>
            </Reveal>
            <Reveal>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 16, maxWidth: '18ch' }}>
                    Built to lead a $251B market. We are raising at pre-seed.
                </h2>
            </Reveal>
            <Reveal delay={100}>
                <p style={{ color: 'var(--text2)', fontSize: '1rem', fontWeight: 400, maxWidth: 560, marginBottom: 64, lineHeight: 1.6 }}>
                    Neuaurelius is seeking founding investors for its pre-seed round. We welcome conversations with angels, family offices, and strategic partners aligned with the future of intelligent manufacturing.
                </p>
            </Reveal>

            <div style={{ marginBottom: 64 }}>
                <Reveal>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 24, letterSpacing: '-0.01em' }}>Why Invest Now</h3>
                </Reveal>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                    {[
                        { title: 'Pre-seed entry value', body: 'Investing at pre-seed means entering at the earliest stage, before any subsequent dilution. The market window is open now.' },
                        { title: 'First-mover timing', body: 'The 2026 to 2028 period is the last entry point before market leaders are established. Delay narrows the opportunity.' },
                        { title: 'Sovereign advantage', body: 'Strategic procurement restrictions create a protected market lane. Domestic manufacture is the prerequisite, not just an advantage.' },
                        { title: 'Compounding data', body: 'Early deployments generate proprietary training data. No legacy player has built this asset. It cannot be bought, only earned.' }
                    ].map((p, i) => (
                        <Reveal key={p.title} delay={i * 60}>
                            <Card style={{ height: '100%' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--mono)' }}>{p.title}</div>
                                <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 400 }}>{p.body}</p>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Reveal>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 20 }}>Technical Briefing & FAQs</h3>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {faqs.map((f, i) => (
                    <Reveal key={f.q} delay={i * 40}>
                        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                            <button onClick={() => setOpen(open === i ? null : i)} style={{
                                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '24px 32px', background: 'none', border: 'none', cursor: 'pointer',
                                color: 'var(--text)', fontFamily: 'var(--font)', textAlign: 'left'
                            }}>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{f.q}</span>
                                <ChevronDown size={16} color="var(--text)" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0, marginLeft: 16 }} />
                            </button>
                            <div style={{ maxHeight: open === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                                <p style={{ padding: '0 32px 24px', color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 400 }}>{f.a}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

const Contact = () => (
    <Section id="contact" style={{ background: 'var(--bg)' }}>
        <Reveal>
            <Label>Contact & Protocol</Label>
        </Reveal>

        <div className="responsive-grid-contact">
            <div>
                <Reveal>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, maxWidth: '18ch' }}>
                        We welcome conversations with investors and enterprise partners.
                    </h2>
                </Reveal>
                <Reveal delay={100}>
                    <p style={{ color: 'var(--text2)', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6, marginBottom: 48 }}>
                        Whether you are evaluating deployment opportunities, exploring manufacturing partnerships, or considering investment in the humanoid robotics sector, reach out directly.
                    </p>
                </Reveal>
                <Reveal delay={200}>
                    <a href="mailto:post@neuaurelius.com" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 12,
                        color: 'var(--accent)', textDecoration: 'none',
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 600,
                        borderBottom: '1px solid var(--accent)', paddingBottom: 8,
                        transition: 'opacity 0.2s',
                        fontFamily: 'var(--mono)'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                    >
                        post@neuaurelius.com
                        <ArrowUpRight size={20} />
                    </a>
                    <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: 16, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>General Inquiries / Investor Relations / Partnerships</p>
                </Reveal>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Reveal delay={150}>
                    <Card>
                        <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Headquarters</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Jaipur</div>
                        <div style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>Rajasthan, India</div>
                    </Card>
                </Reveal>
                <Reveal delay={220}>
                    <Card>
                        <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Established</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>2023</div>
                        <div style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>Humanoid Manufacturing / Robotics Systems</div>
                    </Card>
                </Reveal>
                <Reveal delay={290}>
                    <Card>

                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--mono)' }}>[ PRE-SEED: OPEN ]</div>
                        <div style={{ color: 'var(--text2)', fontSize: '0.85rem', fontWeight: 400 }}>Seeking founding investors for manufacturing development and initial commercial deployments.</div>
                    </Card>
                </Reveal>
            </div>
        </div>

        <Reveal delay={300}>
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ color: 'var(--text)', opacity: 0.8 }}>
                    <NeuaureliusTextLogo width="110px" height="22px" style={{ fill: 'currentColor' }} />
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.05em', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>© 2024 Neuaurelius. All Rights Reserved.</span>
            </div>
        </Reveal>
    </Section>
);

export default function App() {
    const [done, setDone] = useState(false);

    // Safety check added for localStorage to prevent iframe crashes
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                return localStorage.getItem('theme') || 'dark';
            } catch (e) {
                return 'dark'; // Fallback if browser blocks localStorage
            }
        }
        return 'dark';
    });

    useEffect(() => {
        const timer = setTimeout(() => setDone(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        try {
            document.documentElement.setAttribute('data-theme', theme === 'system'
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : theme);
            localStorage.setItem('theme', theme);
        } catch (e) {
            // Ignore if localStorage is unavailable
        }
    }, [theme]);

    const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : p === 'light' ? 'system' : 'dark');

    return (
        <>
            <GlobalStyles />
            <Preloader done={done} />
            <Nav theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero />
                <Opportunity />
                <CoreSystems />
                <Sectors />
                <Market />
                <Investors />
                <Contact />
            </main>
        </>
    );
}