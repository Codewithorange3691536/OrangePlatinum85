import React, { useState } from 'react';
import { Award, Dumbbell, Users, RotateCw, Calendar } from 'lucide-react';
import { COACHES } from '../data/storeData';
import { Coach } from '../types';

interface CoachProfilesProps {
  onBookWithCoach: (coachId: string) => void;
}

export const CoachProfiles: React.FC<CoachProfilesProps> = ({ onBookWithCoach }) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  return (
    <section id="coaches" className="py-24 bg-[#0a0a0d] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-2">
              Master Faculty
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Coach Profiles
            </h2>
          </div>
          <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Hover or tap card to flip & reveal credentials</span>
          </div>
        </div>

        {/* 3-Column 3D Perspective Card Flip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {COACHES.map((coach) => {
            const isFlipped = flippedCardId === coach.id;

            return (
              <div
                key={coach.id}
                className="perspective-1000 h-[520px] w-full cursor-pointer group"
                onClick={() => toggleFlip(coach.id)}
                onMouseEnter={() => setFlippedCardId(coach.id)}
                onMouseLeave={() => setFlippedCardId(null)}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-[#101015] border border-zinc-800 flex flex-col justify-between overflow-hidden shadow-xl">
                    {/* Coach Portrait (monochrome, blurred surroundings) */}
                    <div className="relative h-[68%] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={coach.image}
                        alt={coach.name}
                        className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-transparent" />

                      {/* Experience Stamp */}
                      <div className="absolute top-3 left-3 bg-black/85 border border-zinc-700/80 px-2.5 py-1 text-xs font-mono text-zinc-300">
                        {coach.experienceYears} YRS EXP
                      </div>

                      {/* Flip Hint */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                        <RotateCw className="w-3 h-3 text-[#ff5500]" />
                        <span>Flip Profile</span>
                      </div>
                    </div>

                    {/* Front Details */}
                    <div className="p-6 h-[32%] flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#ff5500] font-mono font-semibold">
                          {coach.role}
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-heading mt-0.5">
                          {coach.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-3">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-zinc-500" />
                          {coach.athletesTrained} Athletes Conditioned
                        </span>
                        <span className="text-zinc-500">CSCS / USAW</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Revealed on hover/tap) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0c0c10] border-2 border-[#ff5500]/60 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto text-left shadow-2xl">
                    <div className="space-y-5">
                      {/* Back Header */}
                      <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-[#ff5500] font-mono font-bold">
                            Verified Credentials
                          </div>
                          <h4 className="text-xl font-black uppercase text-white font-heading mt-0.5">
                            {coach.name}
                          </h4>
                        </div>
                        <span className="w-2.5 h-2.5 bg-[#ff5500]" />
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {coach.bio}
                      </p>

                      {/* Certifications List */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                          <Award className="w-3.5 h-3.5 text-[#ff5500]" />
                          <span>Board Certifications</span>
                        </div>
                        <div className="space-y-1.5">
                          {coach.certifications.map((cert, cIdx) => (
                            <div
                              key={cIdx}
                              className="text-xs text-zinc-200 bg-zinc-900/90 border border-zinc-800 p-2 font-mono flex items-center gap-2"
                            >
                              <span className="text-[#ff5500]">›</span>
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Signature Workout */}
                      <div className="bg-zinc-950 border border-zinc-800 p-3.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white">
                          <Dumbbell className="w-3.5 h-3.5 text-[#ff5500]" />
                          <span>Signature Workout: {coach.signatureWorkout.title}</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-mono">
                          {coach.signatureWorkout.protocol}
                        </p>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          Target: {coach.signatureWorkout.targetAdaptiveTrait}
                        </div>
                      </div>
                    </div>

                    {/* Back Action */}
                    <div className="pt-4 border-t border-zinc-800">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookWithCoach(coach.id);
                        }}
                        className="w-full py-3 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-black" />
                        <span>Book Session with {coach.name.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
