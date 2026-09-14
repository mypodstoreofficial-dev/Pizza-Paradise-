import React from 'react';

interface SevenColorBorderToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  className?: string;
  id?: string;
}

export const SevenColorBorderToggle: React.FC<SevenColorBorderToggleProps> = ({
  isEnabled,
  onToggle,
  className = '',
  id = 'seven-color-border-toggle',
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      title={isEnabled ? 'Click to turn OFF 7-Color Running Border' : 'Click to turn ON 7-Color Running Border'}
      className={`group relative inline-flex items-center gap-2.5 px-4 py-1.5 sm:py-2 rounded-full select-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 active:scale-95 cursor-pointer ${
        isEnabled ? 'seven-color-btn-active' : 'seven-color-btn-inactive'
      } ${className}`}
    >
      {/* Indicator Glowing Dot */}
      <span
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0 transition-all duration-300 ${
          isEnabled
            ? 'bg-gradient-to-tr from-rose-600 via-pink-500 to-fuchsia-500 shadow-[0_0_10px_rgba(244,63,94,0.95)] animate-pulse'
            : 'bg-stone-600 shadow-none opacity-60'
        }`}
      />

      {/* Button Text */}
      <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-tight whitespace-nowrap">
        <span className="text-white drop-shadow-sm font-sans">7–Color Border:</span>
        <span
          className={`font-black tracking-wider transition-colors duration-200 ${
            isEnabled
              ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]'
              : 'text-stone-400'
          }`}
        >
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </span>
    </button>
  );
};
