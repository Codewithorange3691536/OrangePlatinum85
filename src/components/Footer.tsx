import React from 'react';

interface FooterProps {
  onOpenTrialModal: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrialModal, onSelectCategory }) => {
  return (
    <footer className="bg-[#050507] border-t border-zinc-900 py-16 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black tracking-wider text-white uppercase font-heading">
              <span className="w-2.5 h-5 bg-[#ff5500] inline-block -skew-x-12" />
              <span>Kinetic Noir</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Official flagship portal for high-contrast technical athletic apparel and high-yield physical training systems. All designs tested under barbell load.
            </p>
            <div className="text-[11px] text-zinc-500">
              EST. 2024 · ATELIER DIVISION · CODE: KN-SYS
            </div>
          </div>

          {/* Apparel Links */}
          <div className="space-y-3">
            <div className="text-white uppercase font-bold tracking-wider">Apparel Catalog</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('tshirt')}
                  className="hover:text-white transition-colors uppercase"
                >
                  Heavyweight T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('shirt')}
                  className="hover:text-white transition-colors uppercase"
                >
                  Technical Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('mens')}
                  className="hover:text-white transition-colors uppercase"
                >
                  Men's Division
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('womens')}
                  className="hover:text-white transition-colors uppercase"
                >
                  Women's Division
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('children')}
                  className="hover:text-white transition-colors uppercase"
                >
                  Cadet Junior Activewear
                </button>
              </li>
            </ul>
          </div>

          {/* Training Curriculum */}
          <div className="space-y-3">
            <div className="text-white uppercase font-bold tracking-wider">Faculty & System</div>
            <ul className="space-y-2">
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors uppercase">
                  Force & Density
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors uppercase">
                  High-Velocity Conditioning
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-white transition-colors uppercase">
                  Coach Profiles & Bios
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors uppercase">
                  Transformation Logs
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTrialModal}
                  className="text-[#ff5500] hover:underline uppercase font-bold"
                >
                  Book a Trial Class
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Dispatch */}
          <div className="space-y-3">
            <div className="text-white uppercase font-bold tracking-wider">Atelier Care</div>
            <ul className="space-y-2 text-zinc-500">
              <li>Washing: Cold Wash (30°C)</li>
              <li>Zero Fabric Softener</li>
              <li>Drying: Flat Shade Air Dry</li>
              <li>Returns: 30-Day Platform Trial</li>
              <li>Warranty: 365-Day Seam Guarantee</li>
            </ul>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <div>
            © {new Date().getFullYear()} KINETIC NOIR Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-zinc-400">
            <a href="#" className="hover:text-zinc-200">Privacy Protocol</a>
            <a href="#" className="hover:text-zinc-200">Terms of Movement</a>
            <a href="#" className="hover:text-zinc-200">Platform Safety Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
