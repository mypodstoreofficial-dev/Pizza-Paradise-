import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ReturnToHomeButtonProps {
  onNavigateHome: () => void;
  className?: string;
}

export const ReturnToHomeButton: React.FC<ReturnToHomeButtonProps> = ({
  onNavigateHome,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Outer gradient glow halo */}
      <div className="relative p-[2.5px] rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 shadow-xl shadow-cyan-500/20">
        <button
          onClick={onNavigateHome}
          id="return-to-home-btn"
          aria-label="Return to Home Page"
          className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-white font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#00d2ff] via-[#10b981] to-[#84cc16] hover:brightness-110 shadow-md transition-all duration-200 transform hover:scale-[1.03] active:scale-95 cursor-pointer focus:outline-none"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-4 h-4 text-white stroke-[3.5]" />
          </span>
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-black tracking-normal">
            Return to Home Page
          </span>
        </button>
      </div>
    </div>
  );
};

