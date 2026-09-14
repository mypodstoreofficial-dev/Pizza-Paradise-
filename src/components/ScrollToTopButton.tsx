import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Instant direct jump to top without scrolling delay
  const handleInstantJumpToTop = () => {
    window.scrollTo(0, 0);
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      {/* Outer Gradient Border Wrapper */}
      <button
        onClick={handleInstantJumpToTop}
        id="instant-scroll-top-btn"
        aria-label="Direct Instant Jump to Top"
        title="Direct Jump to Top (Ek Click Me Oper)"
        className="group relative p-[2.5px] rounded-[18px] bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 hover:from-amber-400 hover:via-rose-400 hover:to-indigo-400 shadow-2xl shadow-rose-950/60 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
      >
        {/* Inner Dark Background */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 bg-[#13141f] group-hover:bg-[#1a1b2b] rounded-[15.5px] flex items-center justify-center transition-colors">
          <ArrowUp className="w-6 h-6 text-white stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
};
