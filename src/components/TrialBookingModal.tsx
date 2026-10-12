import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Clock, User, Mail, Phone, Dumbbell, ShieldCheck } from 'lucide-react';
import { CURRICULUM_GOALS, COACHES } from '../data/storeData';
import { TrialBooking } from '../types';

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedGoalId?: string | null;
  preselectedCoachId?: string | null;
}

export const TrialBookingModal: React.FC<TrialBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedGoalId,
  preselectedCoachId
}) => {
  const [formData, setFormData] = useState<TrialBooking>({
    goalId: preselectedGoalId || CURRICULUM_GOALS[0].id,
    coachId: preselectedCoachId || COACHES[0].id,
    sessionDate: 'Tomorrow (Wednesday)',
    sessionTime: '18:00 - 19:15',
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: 'intermediate',
    apparelSize: 'L'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    const ref = `KN-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0e0e13] border border-zinc-800 shadow-2xl text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900 rounded-md transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#ff5500]/10 border border-[#ff5500] text-[#ff5500] mx-auto flex items-center justify-center rounded-full">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono">
                Booking Confirmed · Ref: {bookingRef}
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
                Trial Session Reserved
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Welcome to the fold, <strong className="text-white">{formData.fullName}</strong>. A confirmation dispatch and diagnostic preparation packet have been transmitted to <span className="text-[#ff5500]">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-5 max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Date & Time:</span>
                <span className="text-white font-bold">{formData.sessionDate} · {formData.sessionTime}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Mentoring Coach:</span>
                <span className="text-white font-bold">
                  {COACHES.find(c => c.id === formData.coachId)?.name || 'Lead Faculty'}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Complimentary Trial Kit:</span>
                <span className="text-[#ff5500] font-bold">Size {formData.apparelSize} Performance Shirt</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Protocol:</span>
                <span className="text-white font-bold uppercase">{formData.goalId} System</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs transition-colors"
            >
              Return to Official Portal
            </button>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-1">
                Zero Obligation · Diagnostic Assessment
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading">
                Book a Trial Class
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Step into our high-performance facility. Test our apparel under real platform tension and receive direct mechanical programming from master coaches.
              </p>
            </div>

            <div className="space-y-4">
              {/* Training Goal Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  1. Training Stream / Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CURRICULUM_GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, goalId: g.id })}
                      className={`p-3 text-left border text-xs font-mono transition-colors ${
                        formData.goalId === g.id
                          ? 'border-[#ff5500] bg-zinc-900 text-white font-bold'
                          : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="font-heading uppercase text-sm text-white">{g.title}</div>
                      <div className="text-[11px] text-zinc-500 truncate">{g.intensity}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coach Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  2. Select Master Coach
                </label>
                <select
                  value={formData.coachId}
                  onChange={(e) => setFormData({ ...formData, coachId: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 text-sm text-zinc-200 focus:border-[#ff5500] focus:outline-none"
                >
                  {COACHES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.role} ({c.experienceYears} Yrs Exp)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Preferred Session Day
                  </label>
                  <select
                    value={formData.sessionDate}
                    onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-[#ff5500] focus:outline-none"
                  >
                    <option value="Tomorrow (Wednesday)">Tomorrow (Wednesday)</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday Morning">Saturday Morning</option>
                    <option value="Sunday Conditioning">Sunday Conditioning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={formData.sessionTime}
                    onChange={(e) => setFormData({ ...formData, sessionTime: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-[#ff5500] focus:outline-none"
                  >
                    <option value="07:00 - 08:15">07:00 - 08:15 (Dawn Wave)</option>
                    <option value="12:00 - 13:15">12:00 - 13:15 (Midday Power)</option>
                    <option value="18:00 - 19:15">18:00 - 19:15 (Evening Prime)</option>
                    <option value="19:30 - 20:45">19:30 - 20:45 (Night Heavy)</option>
                  </select>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="athlete@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>
              </div>

              {/* Apparel Kit Size & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'elite'
                      })
                    }
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-[#ff5500] focus:outline-none"
                  >
                    <option value="beginner">Novice (Under 1 Year Barbell)</option>
                    <option value="intermediate">Intermediate (1-3 Years Solid)</option>
                    <option value="advanced">Advanced (3+ Years High Load)</option>
                    <option value="elite">Competitive / Elite Athlete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Complimentary Shirt Size
                  </label>
                  <select
                    value={formData.apparelSize}
                    onChange={(e) => setFormData({ ...formData, apparelSize: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-[#ff5500] focus:outline-none"
                  >
                    <option value="XS">XS (Extra Small)</option>
                    <option value="S">S (Small)</option>
                    <option value="M">M (Medium)</option>
                    <option value="L">L (Large)</option>
                    <option value="XL">XL (Extra Large)</option>
                    <option value="XXL">XXL (Double Extra Large)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-zinc-500">
                100% Free · No credit card required
              </span>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs transition-colors"
              >
                Confirm Trial Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
