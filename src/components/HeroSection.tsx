import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowDownRight, Users, Play, Pause } from 'lucide-react';
import { HERO_IMAGE, BRAND_STATS } from '../data/storeData';
import { trainingAudio } from '../utils/audioSynth';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
  onExploreApparel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrialModal,
  onExploreApparel
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isPlayingReel, setIsPlayingReel] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio toggle
  const handleToggleAudio = () => {
    const newState = trainingAudio.toggle();
    setIsAudioActive(newState);
  };

  // Slow motion film grain & slow pan canvas simulation over high-res monochrome imagery
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlayingReel) {
        // Slow shutter film bar sweep
        const scanlineY = (frame * 0.4) % canvas.height;
        const grad = ctx.createLinearGradient(0, scanlineY - 20, 0, scanlineY + 20);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanlineY - 20, canvas.width, 40);

        // Fine grain particles
        if (frame % 2 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          for (let i = 0; i < 40; i++) {
            const rx = Math.random() * canvas.width;
            const ry = Math.random() * canvas.height;
            ctx.fillRect(rx, ry, 1.5, 1.5);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingReel]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end pt-28 pb-12 overflow-hidden bg-[#08080a] border-b border-zinc-900">
      {/* Background Slow-Motion Reel Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={`relative w-full h-full transition-transform duration-[12000ms] ease-out ${
            isPlayingReel ? 'scale-105' : 'scale-100'
          }`}
        >
          <img
            src={HERO_IMAGE}
            alt="Elite coach and athlete in high-contrast black and white training with barbell"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dynamic canvas grain & scanline overlay */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
        />

        {/* Gradient Scrim for contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/40 to-transparent" />
      </div>

      {/* Reel Control HUD Overlay */}
      <div className="absolute top-28 right-6 sm:right-10 z-20 flex items-center gap-2">
        <button
          onClick={handleToggleAudio}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase border transition-all ${
            isAudioActive
              ? 'bg-[#ff5500] text-black border-[#ff5500] shadow-[0_0_20px_rgba(255,85,0,0.5)]'
              : 'bg-black/70 text-zinc-300 border-zinc-700/80 hover:text-white hover:border-zinc-500 backdrop-blur-md'
          }`}
          title="Click to toggle slow-motion training reel atmosphere audio"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Training Reel Sound On</span>
              <span className="flex gap-0.5 items-end h-3 ml-1">
                <span className="w-0.5 h-2 bg-black animate-bounce" />
                <span className="w-0.5 h-3 bg-black animate-bounce delay-75" />
                <span className="w-0.5 h-1.5 bg-black animate-bounce delay-150" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              <span>Click to Unmute Reel</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsPlayingReel(!isPlayingReel)}
          className="p-1.5 rounded-md bg-black/70 border border-zinc-700 text-zinc-300 hover:text-white backdrop-blur-md"
          aria-label={isPlayingReel ? 'Pause reel motion' : 'Play reel motion'}
        >
          {isPlayingReel ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed editorial kicker */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-400 font-mono">
            <span className="text-[#ff5500] font-bold">KINETIC NOIR</span>
            <span aria-hidden="true">/</span>
            <span>HIGH-YIELD PERFORMANCE APPAREL</span>
            <span aria-hidden="true">/</span>
            <span>ATHLETIC COMMUNITY</span>
          </div>

          {/* Powerful Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.92] font-heading">
            Born in Resistance. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#c0c5ce]">
              Engineered for Force.
            </span>
          </h1>

          {/* Clean, forceful body copy */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
            High-contrast brutalist training apparel paired with an elite coaching curriculum.
            Crafted for athletes who measure existence in velocity, tensile power, and absolute discipline.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Pulsing CTA button */}
            <button
              onClick={onOpenTrialModal}
              className="pulse-glow group flex items-center justify-center gap-3 px-8 py-4 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-200 active:scale-95"
            >
              <span>Book a Trial Class</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onExploreApparel}
              className="px-8 py-4 bg-zinc-950/80 hover:bg-zinc-900 text-white font-bold uppercase tracking-wider text-sm border border-zinc-700/80 hover:border-zinc-500 transition-all backdrop-blur-sm"
            >
              Shop Collection
            </button>
          </div>

          {/* Coach Team Showcase Micro Strip */}
          <div className="pt-4 flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-800/80 max-w-lg">
            <div className="flex -space-x-2">
              <img
                src="/src/assets/images/coach_marcus_vance_1791699229975.jpg"
                alt="Coach Marcus"
                className="w-7 h-7 rounded-full border border-black grayscale object-cover"
              />
              <img
                src="/src/assets/images/coach_elena_rostova_1791699242443.jpg"
                alt="Coach Elena"
                className="w-7 h-7 rounded-full border border-black grayscale object-cover"
              />
              <img
                src="/src/assets/images/coach_kai_chen_1791699254981.jpg"
                alt="Coach Kai"
                className="w-7 h-7 rounded-full border border-black grayscale object-cover"
              />
            </div>
            <div>
              <span className="text-white font-semibold">Led by Master Faculty: </span>
              <span>Marcus Vance, Elena Rostova & Dr. Kai Chen</span>
            </div>
          </div>
        </div>

        {/* Full-width Metric Strip below hero content */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRAND_STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
