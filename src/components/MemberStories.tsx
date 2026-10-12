import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, TrendingUp, Quote, CheckCircle2 } from 'lucide-react';
import { MEMBER_STORIES } from '../data/storeData';
import { MemberStory } from '../types';

interface MemberStoriesProps {
  onExploreGear: (gearName: string) => void;
}

export const MemberStories: React.FC<MemberStoriesProps> = ({ onExploreGear }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragX = useMotionValue(0);

  const total = MEMBER_STORIES.length;

  // Auto-advance every 5.5 seconds unless hovered/dragging
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      handlePrev();
    }
  };

  const story = MEMBER_STORIES[currentIndex];

  return (
    <section
      id="case-studies"
      className="py-24 bg-[#08080a] border-b border-zinc-900 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-2">
              Transformative Proof
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Member Case Studies
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-400">
              Drag to swipe or auto-advances ({currentIndex + 1} / {total})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous transformation story"
                className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next transformation story"
                className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rubber-band Drag Carousel Container */}
        <div className="pt-10">
          <motion.div
            key={story.id}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-grab active:cursor-grabbing bg-[#0f0f14] border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden shadow-2xl"
          >
            {/* Left: High-Contrast Athlete Portrait */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[380px] overflow-hidden bg-black">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover object-center filter grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0f14]" />

              {/* Key Quantitative Metric Stamp */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-black/90 border border-zinc-700/80 p-3.5 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
                  Primary Kinetic Outcome
                </div>
                <div className="text-2xl font-black text-[#ff5500] font-heading uppercase tracking-tight">
                  {story.keyMetricLabel}
                </div>
                <div className="text-xs text-zinc-300 font-mono">
                  Over {story.durationWeeks} Weeks of Adherence
                </div>
              </div>
            </div>

            {/* Right: Case Study Quantitative Detail & Quote */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading">
                      {story.name}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400">
                      {story.profession} · Focus: {story.goal}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Protocol Completion</span>
                  </div>
                </div>

                {/* Quantitative Before vs After Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-950 p-4 border border-zinc-800/80">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Baseline Diagnostics
                    </div>
                    <div className="text-sm font-bold text-zinc-300 font-mono">
                      {story.metricBefore}
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-4 border border-[#ff5500]/40">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-1">
                      Benchmark Post-Protocol
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      {story.metricAfter}
                    </div>
                  </div>
                </div>

                {/* Athlete Quote */}
                <blockquote className="relative text-zinc-200 text-sm sm:text-base leading-relaxed italic border-l-2 border-zinc-700 pl-4">
                  "{story.quote}"
                </blockquote>
              </div>

              {/* Gear Worn Proof */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="text-zinc-400">
                  <span>Apparel Uniform: </span>
                  <strong className="text-zinc-200">{story.apparelGear}</strong>
                </div>

                <button
                  onClick={() => onExploreGear(story.apparelGear)}
                  className="text-[#ff5500] hover:text-white uppercase font-bold tracking-wider hover:underline"
                >
                  Inspect Worn Gear →
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center items-center gap-2 pt-8">
          {MEMBER_STORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#ff5500]' : 'w-2 bg-zinc-800 hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
