import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface StickyTrialBarProps {
  onOpenTrialModal: () => void;
}

export const StickyTrialBar: React.FC<StickyTrialBarProps> = ({ onOpenTrialModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky bottom bar once scrolled past 480px (past hero)
      const scrolledPastHero = window.scrollY > 480;
      setIsVisible(scrolledPastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Book a Trial Class Sticky Action"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0c10]/95 backdrop-blur-md border-t border-zinc-800 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 py-2.5 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Information Strip - compact & single-line */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[#ff5500] font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Community Intake Active</span>
          </span>
          <span className="text-zinc-600" aria-hidden="true">·</span>
          <span className="text-zinc-300 truncate">
            Complimentary 60-min private or small-group assessment + trial kit sizing
          </span>
        </div>

        <div className="sm:hidden text-xs font-mono text-zinc-300 truncate">
          <strong className="text-white">Trial Session</strong> · 100% Free
        </div>

        {/* Primary Pulsing CTA Button */}
        <button
          onClick={onOpenTrialModal}
          className="pulse-glow shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all duration-150 active:scale-95"
        >
          <span>Book a Trial Class</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>
    </aside>
  );
};
