import type { ReactNode } from 'react';

interface IPhoneMockupProps {
  children: ReactNode;
  showHomeIndicator?: boolean;
}

/**
 * Mockup de iPhone con diseño realista
 * Incluye notch, status bar y bezel
 */
export function IPhoneMockup({ children, showHomeIndicator = true }: IPhoneMockupProps) {
  return (
    <div className="flex items-center">
      {/* iPhone Bezel */}
      <div className="w-65 h-[470px] bg-black rounded-[3rem] p-2.5 shadow-2xl dark:bg-white/10">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-22 h-4 bg-black rounded-full" />
          
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-2 pb-1 bg-black/80">
            <div className="text-white text-sm">9:41</div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-white rounded-sm" />
              <div className="w-6 h-3 border border-white rounded-sm flex items-center">
                <div className="w-4 h-3 bg-green-400 rounded-sm" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          {children}
          
          {/* Home Indicator */}
          {showHomeIndicator && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60" />
          )}
        </div>
      </div>
    </div>
  );
}

