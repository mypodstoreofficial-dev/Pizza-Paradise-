import React from 'react';
import { Sparkles, Film } from 'lucide-react';

interface ThreeDBackgroundToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  className?: string;
  id?: string;
  isPaused?: boolean;
  onTogglePlayPause?: () => void;
}

export const ThreeDBackgroundToggle: React.FC<ThreeDBackgroundToggleProps> = ({
  isEnabled,
  onToggle,
  className = '',
  id = 'threed-background-toggle',
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      title={isEnabled ? 'Click to disable 3D Video Background' : 'Click to enable 3D Video Background'}
      className={`group relative inline-flex items-center gap-2.5 px-4 py-1.5 sm:py-2 rounded-full select-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 active:scale-95 ${
        isEnabled ? 'threed-bg-btn-active shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'threed-bg-btn-inactive'
      } ${className}`}
    >
      {/* Indicator Glowing Badge with Sparkle/Film */}
      <span
        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
          isEnabled
            ? 'bg-gradient-to-tr from-rose-400 via-amber-300 to-emerald-200 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
            : 'bg-stone-700 opacity-60 shadow-none'
        }`}
      >
        {isEnabled ? (
          <Film className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-900 fill-stone-900 animate-pulse" />
        ) : (
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-400" />
        )}
      </span>

      {/* Button Text */}
      <span className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-tight whitespace-nowrap">
        <span className="text-white drop-shadow-sm font-sans font-bold flex items-center gap-1.5">
          <span>3D Video:</span>
          {isEnabled && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          )}
        </span>
        <span className="flex items-center gap-1 font-black tracking-wider">
          <span
            className={`transition-colors duration-200 ${
              isEnabled
                ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]'
                : 'text-stone-500'
            }`}
          >
            3D
          </span>
          <span
            className={`transition-colors duration-200 ${
              isEnabled
                ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.85)]'
                : 'text-stone-500'
            }`}
          >
            {isEnabled ? 'ON' : 'OFF'}
          </span>
        </span>
      </span>
    </button>
  );
};
