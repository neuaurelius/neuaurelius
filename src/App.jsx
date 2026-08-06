import React, { useState, useEffect, useRef } from 'react';

// Custom hook for simple scroll-based fade-in animations
const useFadeIn = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it's visible, we don't need to observe anymore for a one-time fade
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return { isVisible, domRef };
};

// Reusable FadeInSection component
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const { isVisible, domRef } = useFadeIn();
  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Research", "Career", "Investors", "Blogs"];

  const iconSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 3600 2700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/></svg>`;
  const textLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 74.999997" height="100" preserveAspectRatio="xMidYMid meet" version="1.0"><path fill="#231f20" d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " fill-opacity="1" fill-rule="evenodd"/><path fill="#231f20" d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " fill-opacity="1" fill-rule="nonzero"/></svg>`;

  // Map nav items to target section IDs or fallback anchors
  const getHref = (item) => {
    switch (item) {
      case "Research": return "#about";
      case "Career": return "#team";
      case "Investors": return "#footer";
      case "Blogs": return "#footer";
      default: return "#";
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? "border-b border-black/10" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
           <div 
             className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" 
             dangerouslySetInnerHTML={{ __html: iconSvg }} 
           />
           <div 
             className="w-32 h-6 flex items-center transition-opacity duration-300 group-hover:opacity-80" 
             dangerouslySetInnerHTML={{ __html: textLogoSvg }} 
           />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={getHref(item)}
              className="text-sm font-medium text-black/80 hover:text-black relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={getHref(item)}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-black/80 hover:text-black py-2 border-b border-gray-100"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full">
      <FadeInSection>
        <div className="relative w-full h-[60vh] md:h-[75vh] min-h-[500px] bg-black rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center border border-black/5">
          
          {}
          <img 
            src="https://plain-apac-prod-public.komododecks.com/202608/06/57avg6A0gyO6nKGgAs9s/image.png" 
            alt="Neuaurelius Humanoid"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Overlay Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              Creating Intelligent Humanoids<br className="hidden md:block" /> That make a real difference.
            </h1>
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm transition-colors duration-300 hover:bg-gray-200">
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
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeInSection>
        <h2 className="text-sm font-bold tracking-widest uppercase mb-12 text-black">
          About Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="text-lg md:text-xl text-black leading-relaxed font-medium max-w-lg">
            <p>
              Neuaurelius develops intelligent humanoid robotics for practical applications. Our research focuses on artificial muscle fibers, proprioceptive systems, embedded intelligence, and scalable robotics engineering.
            </p>
          </div>
          <div className="text-lg md:text-xl text-black leading-relaxed font-medium max-w-lg">
            <p>
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
    <section id="problems" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeInSection>
        <h2 className="text-sm font-bold tracking-widest uppercase mb-12 text-black">
          Problems We Solve
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <FadeInSection key={index} delay={index * 100} className="h-full">
              <div className="bg-white border border-gray-200 p-8 md:p-10 h-full flex flex-col transition-all duration-300 hover:border-black/30 hover:shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-black/70 text-base leading-relaxed font-medium mt-auto">
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
    {
      name: "Arkadeep Nag",
      role: "CEO and Co-founder",
      linkedin: "https://linkedin.com/in/arkadeepnag"
    },
    {
      name: "Rahul Konar",
      role: "CTO and Co-founder",
      linkedin: "https://www.linkedin.com/in/konar-rahul/"
    },
    {
      name: "Shreyas Raj",
      role: "COO and Co-founder",
      linkedin: "https://www.linkedin.com/in/bshreeshreyasraj/"
    }
  ];

  return (
    <section id="team" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeInSection>
        <h2 className="text-sm font-bold tracking-widest uppercase mb-12 text-black">
          Leadership
        </h2>
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <FadeInSection key={index} delay={index * 100} className="h-full">
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 p-8 md:p-10 h-full flex flex-col transition-all duration-300 hover:border-black/30 hover:shadow-sm group"
              >
                <h3 className="text-lg font-bold text-black mb-1 uppercase tracking-wide group-hover:text-black/80 transition-colors">
                  {member.name}
                </h3>
                <p className="text-black/50 text-sm font-bold tracking-widest uppercase mb-12">
                  {member.role}
                </p>
                <div className="mt-auto flex items-center text-sm font-bold text-black/40 group-hover:text-black transition-colors uppercase tracking-widest">
                  LinkedIn
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </FadeInSection>
          ))}
        </div>

        {}
        <FadeInSection delay={300}>
          <div className="bg-[#F5F5F5] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-black/5">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-2 tracking-tight">
                Join the team
              </h3>
              <p className="text-black/70 font-medium text-lg">
                Help us build the future of intelligent humanoids.
              </p>
            </div>
            <a 
              href="#career" 
              className="bg-black text-white px-8 py-3 rounded-full font-medium text-sm transition-colors duration-300 hover:bg-black/80 whitespace-nowrap shrink-0"
            >
              Careers
            </a>
          </div>
        </FadeInSection>

      </FadeInSection>
    </section>
  );
};

const Footer = () => {
  const iconSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 3600 2700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/></svg>`;
  const textLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 74.999997" height="100" preserveAspectRatio="xMidYMid meet" version="1.0"><path fill="#231f20" d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " fill-opacity="1" fill-rule="evenodd"/><path fill="#231f20" d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " fill-opacity="1" fill-rule="nonzero"/><path fill="#231f20" d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " fill-opacity="1" fill-rule="nonzero"/></svg>`;

  return (
    <footer className="bg-white border-t border-black/10 pt-24 pb-12 px-6 md:px-12 w-full mt-12">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            
            {/* Left/Main Column */}
            <div className="lg:col-span-8 pr-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-[1.15] tracking-tight max-w-3xl mb-8">
                We welcome conversations with investors, researchers, and enterprise partners.
              </h2>
              <p className="text-lg text-black/70 font-medium max-w-xl mb-16 leading-relaxed">
                Whether you are interested in research, manufacturing, partnerships, or investment, we would like to hear from you.
              </p>
              
              <div>
                <a 
                  href="mailto:post@neuaurelius.com" 
                  className="text-2xl md:text-3xl font-bold text-black hover:text-black/70 transition-colors duration-300 block mb-4"
                >
                  post@neuaurelius.com
                </a>
                <p className="text-xs font-bold tracking-widest text-black/50 uppercase">
                  General Inquiries / Investor Relations / Partnerships
                </p>
              </div>
            </div>

            {/* Right Column - Information Boxes */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-12 lg:gap-16 lg:pl-12">
              <div>
                <h4 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Corporate Office</h4>
                <p className="text-black/70 font-medium">Kolkata</p>
                <p className="text-black/70 font-medium">West Bengal, India</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Head Office</h4>
                <p className="text-black/70 font-medium">Jaipur</p>
                <p className="text-black/70 font-medium">Rajasthan, India</p>
              </div>
            </div>

          </div>

          {/* Bottom Footer Area */}
          {}
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <a href="#" className="flex items-center gap-3 group cursor-pointer">
               <div 
                 className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" 
                 dangerouslySetInnerHTML={{ __html: iconSvg }} 
               />
               <div 
                 className="w-24 h-5 flex items-center transition-opacity duration-300 group-hover:opacity-80" 
                 dangerouslySetInnerHTML={{ __html: textLogoSvg }} 
               />
             </a>
            <span className="text-sm font-medium text-black/50">
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
      className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white"
      style={{ fontFamily: "'Gilmer', 'Inter', sans-serif" }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problems />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
