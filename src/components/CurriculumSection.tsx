import React, { useState } from 'react';
import { Target, Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CURRICULUM_GOALS } from '../data/storeData';
import { CurriculumGoal } from '../types';

interface CurriculumSectionProps {
  onSelectGoalApparel: (goalId: string) => void;
  onBookGoalTrial: (goalId: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  onSelectGoalApparel,
  onBookGoalTrial
}) => {
  const [activeGoalId, setActiveGoalId] = useState<string>(CURRICULUM_GOALS[0].id);

  const activeGoal = CURRICULUM_GOALS.find(g => g.id === activeGoalId) || CURRICULUM_GOALS[0];

  return (
    <section id="curriculum" className="py-24 bg-[#0a0a0d] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with unboxed metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-2">
              Adaptive System Architecture
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Curriculum By Goals
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Every piece of apparel is engineered as a mechanical instrument tailored to specific neuromuscular strain profiles and kinetic objectives.
          </p>
        </div>

        {/* Goal Selector Tabs - functional button segmented controls */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-8 pb-10">
          {CURRICULUM_GOALS.map((goal) => {
            const isActive = goal.id === activeGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
                className={`text-left p-4 sm:p-5 transition-all duration-200 border ${
                  isActive
                    ? 'bg-zinc-900 border-[#ff5500] text-white shadow-[0_0_20px_rgba(255,85,0,0.15)]'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">
                    Target Protocol
                  </span>
                  {isActive && <span className="w-2 h-2 bg-[#ff5500]" />}
                </div>
                <div className="text-lg font-bold uppercase tracking-tight font-heading text-white">
                  {goal.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Curriculum Detailed Showcase */}
        <div className="bg-[#101015] border border-zinc-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Focus & Protocol Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-400 font-mono mb-3">
                <span className="text-[#ff5500] font-bold">Goal Focus</span>
                <span aria-hidden="true">·</span>
                <span>{activeGoal.intensity}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-heading mb-4">
                {activeGoal.title}
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                {activeGoal.description}
              </p>

              {/* Protocol Pillars */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Core Tactical Directives:
                </div>
                {activeGoal.protocols.map((protocol, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-200 bg-zinc-900/60 p-3 border border-zinc-800/60">
                    <span className="text-xs font-mono text-[#ff5500] font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{protocol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                {activeGoal.weeklyCommitment}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                Verified Biomechanical Output
              </span>
            </div>
          </div>

          {/* Right Column: Apparel Integration & Trial Conversion */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                Curated Apparel Pairing
              </div>
              <h4 className="text-xl font-bold uppercase text-white font-heading mb-2">
                {activeGoal.recommendedApparel}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fabric woven with zero-distraction seams to withstand explosive velocity shifts and barbell wear under high tensile forces.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => onSelectGoalApparel(activeGoal.id)}
                className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 flex items-center justify-between transition-colors"
              >
                <span>View Goal Apparel Products</span>
                <ArrowRight className="w-4 h-4 text-[#ff5500]" />
              </button>

              <button
                onClick={() => onBookGoalTrial(activeGoal.id)}
                className="w-full py-3.5 px-4 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-colors"
              >
                <span>Book Trial for This Goal</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
