import React, { useState, useEffect, useRef } from 'react';

const useFadeIn = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return { isVisible, domRef };
};

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const { isVisible, domRef } = useFadeIn();
  return (
    <div
      ref={domRef}
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Standalone icon SVG for Navbar
const iconSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 3600 2700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/></svg>`;

// Text logo SVG for Hero / Footer
const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" zoomAndPan="magnify" viewBox="0 0 375 74.999997" height="100%" preserveAspectRatio="xMidYMid meet" version="1.0"><path fill="#231f20" d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " fill-opacity="1" fill-rule="evenodd"/><path fill="#231f20" d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " fill-opacity="1" fill-rule="nonzero"/></svg>`;

const Navbar = ({ setNotice }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["research", "about", "careers"];
    const updateActiveSection = () => {
      const current = sections.reduce((active, id) => {
        const el = document.getElementById(id);
        if (!el) return active;
        return window.scrollY + 140 >= el.offsetTop ? id : active;
      }, "");
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";

    const handleEscape = (event) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const navItems = ["Research", "Career", "Investors", "Blogs"];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (item === "Research") {
      const el = document.getElementById("research");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (item === "Blogs") {
      setNotice(`${item} section is currently under development.`);
      setTimeout(() => setNotice(""), 3500);
      return;
    }

    if (item === "Career") {
      const el = document.getElementById("careers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (item === "Investors") {
      const el = document.getElementById("footer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.05] py-3 lg:py-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]" : "bg-white py-5 lg:py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Standalone Icon SVG in Navbar */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex items-center group z-50 py-1"
        >
          <div className="h-8 w-8 text-[#1d1d1f] shrink-0" dangerouslySetInnerHTML={{ __html: iconSvg }} />
        </a>

        {/* Desktop Nav - Premium Segmented Pill Style */}
        <div className="hidden md:flex items-center gap-1 bg-[#f5f5f7]/80 rounded-full p-1 border border-transparent transition-all">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase() || (item === 'Career' && activeSection === 'careers');
            return (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.04]" 
                    : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.02] border border-transparent"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden z-50 p-2.5 -mr-2 text-[#1d1d1f] bg-[#f5f5f7]/80 hover:bg-[#e5e5ea] rounded-full transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>

      </div>

      {/* Smooth Apple-Style Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-6 sm:px-8 ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="text-xs font-semibold tracking-widest text-[#86868b] uppercase mb-2">Navigation</div>
          {navItems.map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className="group flex items-center justify-between text-3xl font-semibold text-[#1d1d1f] hover:text-[#0066cc] transition-colors py-2 border-b border-[#f5f5f7]"
              style={{ 
                transitionDelay: `${index * 60}ms`, 
                opacity: mobileMenuOpen ? 1 : 0, 
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)', 
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
            >
              <span>{item}</span>
              <span className="text-xl opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#0066cc]">→</span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-[#e5e5ea] flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs font-semibold text-[#86868b] tracking-wider uppercase">
            <span>Offices: Jaipur & Kolkata</span>
            <span>Est. 2024</span>
          </div>
          <a 
            href="mailto:post@neuaurelius.com"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-2xl bg-[#1d1d1f] text-white text-center font-semibold text-base shadow-md active:scale-[0.98] transition-transform"
          >
            Contact post@neuaurelius.com
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tightened padding transition on scroll
  const scrollProgress = Math.min(scrollY / 350, 1);
  
  const containerStyle = {
    paddingLeft: `${scrollProgress * 1.5}rem`,
    paddingRight: `${scrollProgress * 1.5}rem`,
    paddingTop: `${Math.max(0.2, scrollProgress * 0.8)}rem`,
    paddingBottom: `${scrollProgress * 1.5}rem`,
  };

  const innerStyle = {
    borderRadius: `${scrollProgress * 1.5}rem`,
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[75vh] sm:h-[calc(80vh-2rem)] min-h-[500px] flex items-center justify-center pt-14 bg-white overflow-hidden">
      <div 
        className="w-full h-full max-w-[1920px] mx-auto transition-all duration-300 ease-out flex items-center justify-center"
        style={containerStyle}
      >
        <div 
           className="relative w-full h-full overflow-hidden transition-all duration-300 ease-out bg-[#f5f5f7] shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
           style={innerStyle}
        >
          {/* Skeleton placeholder for slow internet */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#e5e5ea] to-[#f5f5f7] transition-opacity duration-1000 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full h-full flex items-center justify-center text-[#86868b] text-sm tracking-wide">
              Loading High-Res Visual...
            </div>
          </div>

          {/* Hero Image */}
          <img 
            src="https://plain-apac-prod-public.komododecks.com/202608/06/57avg6A0gyO6nKGgAs9s/image.png" 
            alt="Intelligent Humanoid Robot"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-[opacity,transform] duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
            onLoad={() => setImageLoaded(true)}
            decoding="async"
            fetchpriority="high" 
          />

          {/* Darkening overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 text-center">
            <h1 className="text-[2.25rem] sm:text-[3.5rem] md:text-[4.75rem] leading-[1.08] font-semibold text-white tracking-tight mb-8 max-w-[1100px]">
              Creating Intelligent Humanoids That make a real difference.
            </h1>
            <button 
              onClick={scrollToAbout}
              className="bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] px-8 py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white px-5 sm:px-8 max-w-[1200px] mx-auto">
      <FadeInSection>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-16 tracking-tight">
          ABOUT US
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="text-xl sm:text-2xl leading-relaxed text-[#1d1d1f] font-medium tracking-tight">
            Neuaurelius develops intelligent humanoid robotics for practical applications. Our research focuses on artificial muscle fibers, proprioceptive systems, embedded intelligence, and scalable robotics engineering.
          </div>
          <div className="text-lg sm:text-xl leading-relaxed text-[#86868b] font-normal">
            We build technologies that improve movement, perception, efficiency, and reliability. Every system is designed for practical deployment and long term manufacturing.
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

const Problems = () => {
  const problems = [
    {
      title: "Artificial Muscle Fibers",
      description: "Soft actuation inspired by biological muscle systems for smooth and efficient movement.",
    },
    {
      title: "Proprioceptive Systems",
      description: "Continuous body awareness for stable motion, balance, and precision control.",
    },
    {
      title: "Intelligent Energy Systems",
      description: "Efficient battery management and distributed electronics for reliable operation.",
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-12 tracking-tight">
            PROBLEMS WE SOLVE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                className="bg-white p-10 rounded-3xl border border-[#e5e5ea] transition-all duration-300 hover:shadow-[0_12px_30px_rgb(0,0,0,0.05)] hover:border-[#1d1d1f] hover:-translate-y-1 group cursor-default"
              >
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4 tracking-tight group-hover:text-black transition-colors">{problem.title}</h3>
                <p className="text-[#86868b] leading-relaxed text-base">{problem.description}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Research = () => {
  const areas = [
    {
      number: "01",
      title: "Research",
      description: "We investigate artificial muscle fibers, proprioception, and embedded intelligence for more capable humanoid systems.",
    },
    {
      number: "02",
      title: "Prototype",
      description: "Research is translated into physical systems that can be tested, refined, and validated in real conditions.",
    },
    {
      number: "03",
      title: "Manufacture",
      description: "Our engineering approach is built around scalable robotics that can move from working prototypes toward practical deployment.",
    },
    {
      number: "04",
      title: "Publications",
      description: "We are currently preparing several papers detailing our findings in artificial muscle performance. Expected publication soon.",
    }
  ];

  return (
    <section id="research" className="py-24 sm:py-32 bg-white px-5 sm:px-8 border-t border-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <div className="max-w-2xl mb-14 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#86868b] mb-4">
              RESEARCH
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
              Building from fundamental research to practical robotics.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, index) => (
              <FadeInSection key={area.number} delay={index * 100} className="h-full">
                <div className="group h-full min-h-[260px] p-8 sm:p-10 rounded-3xl border border-[#e5e5ea] bg-[#fafafa] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-white hover:border-[#1d1d1f] hover:shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between mb-14">
                    <span className="text-xs font-semibold tracking-widest text-[#86868b]">
                      {area.number}
                    </span>
                    <span className="w-8 h-px bg-[#d2d2d7] transition-all duration-500 group-hover:w-12 group-hover:bg-[#1d1d1f]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                    {area.title}
                  </h3>
                  <p className="text-[#86868b] leading-relaxed text-base">
                    {area.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    { name: "Arkadeep Nag", role: "CEO and Co-founder", link: "https://linkedin.com/in/arkadeepnag" },
    { name: "Rahul Konar", role: "CTO and Co-founder", link: "https://www.linkedin.com/in/konar-rahul/" },
    { name: "Shreyas Raj", role: "COO and Co-founder", link: "https://www.linkedin.com/in/bshreeshreyasraj/" },
  ];

  const scrollToCareers = () => {
    const careersSection = document.getElementById('careers');
    if (careersSection) {
      careersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pb-24 sm:pb-32 bg-white px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
              LEADERSHIP
            </h2>
            <button 
              onClick={scrollToCareers}
              className="text-sm font-semibold text-[#0066cc] hover:text-[#004499] transition-colors flex items-center gap-1 group cursor-pointer"
            >
              Join the team 
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <a 
                key={index}
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 rounded-3xl bg-[#f5f5f7] hover:bg-[#e5e5ea] transition-colors duration-300 group"
              >
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1 tracking-tight group-hover:text-black transition-colors">{member.name}</h3>
                <p className="text-[#86868b] text-sm">{member.role}</p>
                <div className="mt-6 flex items-center text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                  View Profile <span className="ml-1">↗</span>
                </div>
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Careers = () => {
  const jobs = [
    {
      title: "Senior Research Lead",
      location: "Hybrid • Jaipur, Kolkata",
      reqs: "Pursuing Post Grad or PhD in Soft Robotics, Biotech, Mechanics, or related fields."
    },
    {
      title: "Research Intern",
      location: "On-site • Jaipur, Kolkata",
      reqs: "Undergrad, at least 3rd Semester in relevant engineering fields."
    },
    {
      title: "Researcher",
      location: "On-site • Jaipur, Kolkata",
      reqs: "Pursuing Post Grad or PhD in Biomimicry, Hardware Design, Mechanical Systems, Soft Robotics, Actuations, etc."
    }
  ];

  const handleApply = (jobTitle) => {
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(`Hi Neuaurelius Team,\n\nI am writing to express my interest in the ${jobTitle} position. Please find my profile and resume attached/linked below.\n\n[Attach your resume here]\n\nBest regards,`);
    window.location.href = `mailto:post@neuaurelius.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="careers" className="py-24 sm:py-32 bg-[#fafafa] px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            OPEN POSITIONS
          </h2>
          <p className="text-[#86868b] text-lg mb-16 max-w-2xl">
            Join us in building the next generation of intelligent humanoid robotics. Submit your profile for the roles below.
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleApply(job.title)}
                className="group w-full text-left cursor-pointer bg-white p-8 sm:p-10 rounded-3xl border border-[#e5e5ea] hover:border-[#1d1d1f] transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-2 group-hover:text-black transition-colors">{job.title}</h3>
                  <div className="text-sm font-medium text-[#86868b] mb-4">{job.location}</div>
                  <p className="text-[#1d1d1f] text-sm max-w-xl leading-relaxed">{job.reqs}</p>
                </div>
                
                <div className="shrink-0">
                  <span className="inline-flex items-center justify-center bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300">
                    Apply Now
                  </span>
                </div>
              </button>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#f5f5f7] pt-24 pb-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            
            <div className="lg:col-span-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] leading-tight tracking-tight mb-8 max-w-2xl">
                We welcome conversations with investors, researchers, and enterprise partners.
              </h3>
              <p className="text-[#86868b] text-lg sm:text-xl mb-12 max-w-xl">
                Whether you are interested in research, manufacturing, partnerships, or investment, we would like to hear from you.
              </p>
              
              <div className="mt-8">
                <a href="mailto:post@neuaurelius.com" className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] hover:text-[#0066cc] transition-colors tracking-tight inline-block mb-4">
                  post@neuaurelius.com
                </a>
                <p className="text-xs font-semibold tracking-widest text-[#86868b]">
                  GENERAL INQUIRIES / INVESTOR RELATIONS / PARTNERSHIPS
                </p>
              </div>
            </div>

            {/* Corporate Office in Jaipur, Head Office in Kolkata */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-10 lg:gap-12 lg:pl-12 lg:border-l border-[#d2d2d7]">
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 text-[#86868b]">Corporate Office</h4>
                <p className="text-[#1d1d1f] font-medium text-lg">Jaipur</p>
                <p className="text-[#86868b] font-normal">Rajasthan, India</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 text-[#86868b]">Head Office</h4>
                <p className="text-[#1d1d1f] font-medium text-lg">Kolkata</p>
                <p className="text-[#86868b] font-normal">West Bengal, India</p>
              </div>
            </div>

          </div>

          <div className="border-t border-[#d2d2d7] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
             {/* Only Text Logo SVG in Footer */}
             <a
                href="#"
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-6 w-[108px] sm:w-[120px] cursor-pointer shrink-0 overflow-hidden flex items-center"
                dangerouslySetInnerHTML={{ __html: textSvg }}
              />
            <span className="text-xs sm:text-sm font-medium text-[#86868b] text-center md:text-right tracking-wide">
              © 2026 Neuaurelius. All Rights Reserved.
            </span>
          </div>
        </FadeInSection>
      </div>
    </footer>
  );
};

export default function App() {
  const [notice, setNotice] = useState("");

  return (
    <div 
      className="min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#1d1d1f] selection:text-white overflow-x-hidden"
      style={{ fontFamily: "'Gilmer', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Apple-style notification pill for features under construction */}
      <div 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          notice ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#1d1d1f]/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
           <span className="text-sm font-medium text-white tracking-wide">{notice}</span>
        </div>
      </div>

      <Navbar setNotice={setNotice} />
      <main>
        <Hero />
        <About />
        <Problems />
        <Research />
        <Team />
        <Careers />
      </main>
      <Footer />
    </div>
  );
}
