import React from 'react';
import { Shield, Users, MapPin, Award, Check } from 'lucide-react';

interface CommunitySectionProps {
  onJoinCommunity: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onJoinCommunity }) => {
  return (
    <section id="community" className="py-24 bg-[#0a0a0d] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-2">
              Brotherhood & Sisterhood in Load
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Community Doctrine
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            We are not a casual apparel label. We are a sovereign network of lifters, sprinters, and mentors bonded by voluntary physical struggle.
          </p>
        </div>

        {/* 3 Pillars of Community Belonging */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="bg-[#101015] border border-zinc-800 p-8 space-y-4">
            <div className="text-xs font-mono uppercase text-[#ff5500] font-bold">
              Doctrine 01
            </div>
            <h3 className="text-2xl font-bold uppercase text-white font-heading">
              Zero Vanity, Pure Mechanics
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every training hour on the platform is logged against physiological adaptation. No mirror selfies, no empty hype—only quantifiable bar speed, bar load, and clean biomechanical angles.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-zinc-800 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Standardized Video Barbell Analysis</span>
            </div>
          </div>

          <div className="bg-[#101015] border border-zinc-800 p-8 space-y-4">
            <div className="text-xs font-mono uppercase text-[#ff5500] font-bold">
              Doctrine 02
            </div>
            <h3 className="text-2xl font-bold uppercase text-white font-heading">
              Intergenerational Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Veteran master lifters train shoulder-to-shoulder with junior development squads. Character, humility under failure, and relentless encouragement are transmitted through daily proximity.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-zinc-800 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Youth Cadet Scholarships Funded</span>
            </div>
          </div>

          <div className="bg-[#101015] border border-zinc-800 p-8 space-y-4">
            <div className="text-xs font-mono uppercase text-[#ff5500] font-bold">
              Doctrine 03
            </div>
            <h3 className="text-2xl font-bold uppercase text-white font-heading">
              Atelier Gear Resilience
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              If your KINETIC NOIR shirt tears during a registered barbell session within 365 days of acquisition, our atelier replaces it and recycles the fibers into platform chalk-bags.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-zinc-800 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>365-Day Platform Tensile Guarantee</span>
            </div>
          </div>
        </div>

        {/* Global Chapters Strip */}
        <div className="mt-12 p-6 bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-mono uppercase text-zinc-400">Official Physical Chapters:</span>
            <span className="text-xs font-mono text-white font-bold">
              Berlin Mitte · Tokyo Shibuya · Los Angeles Arts District · Stockholm Södermalm
            </span>
          </div>

          <button
            onClick={onJoinCommunity}
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono uppercase tracking-wider text-white transition-colors"
          >
            Request Chapter Admission
          </button>
        </div>
      </div>
    </section>
  );
};
