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
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const navItems = ["Research", "Career", "Investors", "Blogs"];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (item === "Research" || item === "Blogs") {
      setNotice(`${item} is currently under development.`);
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

  const iconSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 3600 2700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path fill="#1d1d1f" d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/></svg>`;
  
  const textLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 74.999997" height="100" preserveAspectRatio="xMidYMid meet" version="1.0"><path fill="#1d1d1f" d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " fill-opacity="1" fill-rule="evenodd"/><path fill="#1d1d1f" d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " fill-opacity="1" fill-rule="nonzero"/></svg>`;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? "border-b border-[#d2d2d7]" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex justify-between items-center h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
             <div 
               className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0" 
               dangerouslySetInnerHTML={{ __html: iconSvg }} 
             />
             <div 
               className="w-24 sm:w-32 h-5 flex items-center transition-opacity duration-300 group-hover:opacity-75" 
               dangerouslySetInnerHTML={{ __html: textLogoSvg }} 
             />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-medium text-[#1d1d1f] hover:text-black relative group py-2 transition-colors"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1d1d1f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Sexy Animated Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 text-[#1d1d1f] p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center relative">
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Premium Full-Screen Mobile Overlay Menu */}
        <div className={`md:hidden fixed inset-0 z-40 bg-white/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col h-full pt-32 px-8 pb-12">
            <div className="flex flex-col space-y-8 mt-10">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-4xl font-semibold text-[#1d1d1f] tracking-tight transition-all duration-500 ease-out transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className={`mt-auto transition-all duration-500 ease-out transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <p className="text-[#86868b] text-sm font-semibold tracking-widest uppercase mb-4">Get in touch</p>
              <a href="mailto:post@neuaurelius.com" className="text-xl font-medium text-[#1d1d1f]">post@neuaurelius.com</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Notice */}
      {notice && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#1d1d1f] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-all border border-black/10">
          {notice}
        </div>
      )}
    </>
  );
};

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress between 0 and 400 pixels
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / 400, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMore = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Dimensions expand to 100% on scroll, border radius tightens
  const containerWidth = 85 + (scrollProgress * 15);
  const containerHeight = 85 + (scrollProgress * 15);
  const borderRadius = 3 - (scrollProgress * 1.5); 

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto w-full">
      <FadeInSection>
        <div className="relative w-full h-[75vh] min-h-[500px] max-h-[850px] flex flex-col items-center justify-center isolate">
          
          {/* Animated Background Container */}
          <div 
            className="absolute bg-[#f5f5f7] overflow-hidden flex items-center justify-center z-0"
            style={{
              width: `${containerWidth}%`,
              height: `${containerHeight}%`,
              borderRadius: `${borderRadius}rem`,
            }}
          >
            <img 
              src="https://plain-apac-prod-public.komododecks.com/202608/06/57avg6A0gyO6nKGgAs9s/image.png" 
              alt="Intelligent Humanoid" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle dark overlay explicitly to make white text legible */}
            <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
          </div>

          {/* Text Content */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 max-w-[1000px] mt-12 sm:mt-24 pointer-events-none">
            <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] tracking-tight mb-8 sm:mb-10 w-full">
              Creating Intelligent Humanoids That make a real difference.
            </h1>
            <button 
              onClick={handleLearnMore}
              className="pointer-events-auto bg-white text-[#1d1d1f] hover:bg-gray-100 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 shadow-sm"
            >
              Learn More
            </button>
          </div>

        </div>
      </FadeInSection>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-5 sm:px-8 max-w-[1200px] mx-auto w-full">
      <FadeInSection>
        <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-8 sm:mb-12 text-[#86868b]">
          ABOUT US
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          <div className="text-[1.35rem] sm:text-2xl md:text-3xl text-[#1d1d1f] leading-[1.4] tracking-tight font-medium">
            <p>
              Neuaurelius develops intelligent humanoid robotics for practical applications. Our research focuses on artificial muscle fibers, proprioceptive systems, embedded intelligence, and scalable robotics engineering.
            </p>
          </div>
          <div className="text-lg sm:text-xl text-[#1d1d1f] leading-relaxed font-normal flex items-end md:pb-1">
            <p className="max-w-md">
              We build technologies that improve movement, perception, efficiency, and reliability. Every system is designed for practical deployment and long term manufacturing.
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

const Problems = () => {
  const cards = [
    {
      title: "Artificial Muscle Fibers",
      description: "Soft actuation inspired by biological muscle systems for smooth and efficient movement."
    },
    {
      title: "Proprioceptive Systems",
      description: "Continuous body awareness for stable motion, balance, and precision control."
    },
    {
      title: "Intelligent Energy Systems",
      description: "Efficient battery management and distributed electronics for reliable operation."
    }
  ];

  return (
    <section id="problems" className="py-20 md:py-32 px-5 sm:px-8 max-w-[1200px] mx-auto w-full">
      <FadeInSection>
        <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-10 sm:mb-12 text-[#86868b]">
          PROBLEMS WE SOLVE
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <FadeInSection key={index} delay={index * 150} className="h-full">
              <div className="bg-white border border-[#d2d2d7] p-8 sm:p-10 h-full flex flex-col rounded-3xl transition-all duration-500 ease-out hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#1d1d1f]/30 group cursor-default">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight leading-tight transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[#86868b] text-base leading-relaxed font-normal mt-auto transition-colors duration-300 group-hover:text-[#55555a]">
                  {card.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

const Team = () => {
  const teamMembers = [
    { name: "Arkadeep Nag", role: "CEO and Co-founder", linkedin: "https://linkedin.com/in/arkadeepnag" },
    { name: "Rahul Konar", role: "CTO and Co-founder", linkedin: "https://www.linkedin.com/in/konar-rahul/" },
    { name: "Shreyas Raj", role: "COO and Co-founder", linkedin: "https://www.linkedin.com/in/bshreeshreyasraj/" }
  ];

  const handleCareerClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("careers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="team" className="py-20 md:py-32 px-5 sm:px-8 max-w-[1200px] mx-auto w-full">
      <FadeInSection>
        <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-10 sm:mb-12 text-[#86868b]">
          LEADERSHIP
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <FadeInSection key={index} delay={index * 150} className="h-full">
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[#f5f5f7] p-8 sm:p-10 h-full flex flex-col rounded-3xl transition-all duration-300 hover:bg-[#ebebef]"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[#86868b] text-sm font-medium mb-12">
                  {member.role}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-medium text-[#1d1d1f] opacity-60 group-hover:opacity-100 transition-opacity">
                  LinkedIn Profile
                  <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </FadeInSection>
          ))}
        </div>

        {/* Join the team subtle banner */}
        <FadeInSection delay={300} className="mt-6 sm:mt-8">
          <div className="bg-white border border-[#d2d2d7] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-1">
                Join the team
              </h3>
              <p className="text-[#86868b] font-normal text-base">
                Help us build the future of intelligent humanoids.
              </p>
            </div>
            <a 
              href="#careers"
              onClick={handleCareerClick}
              className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full font-medium text-sm transition-all hover:bg-black whitespace-nowrap shrink-0"
            >
              View Openings
            </a>
          </div>
        </FadeInSection>
      </FadeInSection>
    </section>
  );
};

const Careers = () => {
  const positions = [
    {
      title: "Senior Research Lead",
      location: "Hybrid (Jaipur, Kolkata)",
      requirements: "Pursuing post-grad or PhD in Soft Robotics, Biotech, Mechanics or related fields."
    },
    {
      title: "Research Intern",
      location: "Jaipur, Kolkata",
      requirements: "Undergrad, at least 3rd Sem."
    },
    {
      title: "Researcher",
      location: "Jaipur, Kolkata",
      requirements: "Pursuing post-grad, or PhD in Bio-mimicry, Hardware Design, Mechanical Systems, Soft Robotics, Actuations etc."
    }
  ];

  const handleApply = (positionTitle, location) => {
    const email = "post@neuaurelius.com";
    const subject = encodeURIComponent(`Application for ${positionTitle} (${location})`);
    const body = encodeURIComponent(`Dear Neuaurelius Team,\n\nI am writing to express my interest in the position of ${positionTitle} located in ${location}.\n\nPlease find my resume attached herewith.\n\nBest regards,\n[Your Name]`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="careers" className="py-20 md:py-32 px-5 sm:px-8 max-w-[1200px] mx-auto w-full border-t border-[#d2d2d7]">
      <FadeInSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 text-[#86868b]">
              CAREERS
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              Open Positions
            </h3>
          </div>
        </div>
        
        <div className="flex flex-col border-t border-[#d2d2d7]">
          {positions.map((pos, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <div className="py-8 sm:py-10 border-b border-[#d2d2d7] flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:bg-[#fbfbfd] transition-colors -mx-5 px-5 sm:-mx-8 sm:px-8 rounded-xl lg:rounded-none lg:bg-transparent">
                
                <div className="max-w-3xl w-full">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                    <h4 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                      {pos.title}
                    </h4>
                    <span className="text-sm font-medium text-[#86868b]">
                      {pos.location}
                    </span>
                  </div>
                  <p className="text-[#1d1d1f] text-base font-normal leading-relaxed">
                    <span className="font-semibold text-[#86868b] mr-2">Requirements:</span> 
                    {pos.requirements}
                  </p>
                </div>
                
                <button
                  onClick={() => handleApply(pos.title, pos.location)}
                  className="bg-[#f5f5f7] text-[#1d1d1f] px-6 py-3 rounded-full font-medium text-sm transition-all hover:bg-[#e8e8ed] whitespace-nowrap shrink-0 lg:opacity-0 lg:group-hover:opacity-100 self-start lg:self-center"
                >
                  Submit Profile
                </button>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

const Footer = () => {
  const iconSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 3600 2700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path fill="#1d1d1f" d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/></svg>`;
  
  const textLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 74.999997" height="100" preserveAspectRatio="xMidYMid meet" version="1.0"><path fill="#1d1d1f" d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " fill-opacity="1" fill-rule="evenodd"/><path fill="#1d1d1f" d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#1d1d1f" d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " fill-opacity="1" fill-rule="nonzero"/></svg>`;

  return (
    <footer id="footer" className="bg-[#fbfbfd] border-t border-[#d2d2d7] pt-24 pb-12 px-5 sm:px-8 max-w-full w-full">
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
            
            <div className="lg:col-span-8 pr-0 lg:pr-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] leading-tight tracking-tight max-w-2xl mb-8">
                We welcome conversations with investors, researchers, and enterprise partners.
              </h2>
              <p className="text-lg text-[#1d1d1f] font-normal max-w-lg mb-12 leading-relaxed">
                Whether you are interested in research, manufacturing, partnerships, or investment, we would like to hear from you.
              </p>
              
              <div>
                <a 
                  href="mailto:post@neuaurelius.com" 
                  className="text-xl sm:text-2xl font-medium text-[#1d1d1f] hover:text-[#86868b] transition-colors duration-300 block mb-2 break-all sm:break-normal"
                >
                  post@neuaurelius.com
                </a>
                <p className="text-xs font-semibold tracking-widest text-[#86868b] uppercase">
                  GENERAL INQUIRIES / INVESTOR RELATIONS / PARTNERSHIPS
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-10 lg:gap-12 lg:pl-12 lg:border-l border-[#d2d2d7]">
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 text-[#86868b]">Head Office</h4>
                <p className="text-[#1d1d1f] font-medium text-lg">Kolkata</p>
                <p className="text-[#86868b] font-normal">West Bengal, India</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3 text-[#86868b]">Corporate Office</h4>
                <p className="text-[#1d1d1f] font-medium text-lg">Jaipur</p>
                <p className="text-[#86868b] font-normal">Rajasthan, India</p>
              </div>
            </div>

          </div>

          <div className="border-t border-[#d2d2d7] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
             <a href="#" className="flex items-center gap-3 group cursor-pointer">
               <div 
                 className="w-8 h-8 transition-transform duration-300 group-hover:scale-105 shrink-0" 
                 dangerouslySetInnerHTML={{ __html: iconSvg }} 
               />
               <div 
                 className="w-24 h-4 flex items-center transition-opacity duration-300 group-hover:opacity-75" 
                 dangerouslySetInnerHTML={{ __html: textLogoSvg }} 
               />
             </a>
            <span className="text-xs sm:text-sm font-medium text-[#86868b] text-center md:text-right">
              © 2026 Neuaurelius. All Rights Reserved.
            </span>
          </div>
        </FadeInSection>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div 
      className="min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#1d1d1f] selection:text-white overflow-x-hidden"
      style={{ fontFamily: "'Gilmer', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problems />
        <Team />
        <Careers />
      </main>
      <Footer />
    </div>
  );
}
