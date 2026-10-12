import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrialModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, single element, one line */}
          <a
            href="#"
            className="group flex items-center gap-2 text-2xl font-extrabold tracking-wider text-white uppercase whitespace-nowrap shrink-0 font-heading hover:text-[#ff5500] transition-colors"
          >
            <span className="w-2.5 h-6 bg-[#ff5500] inline-block -skew-x-12 transition-transform group-hover:scale-110" />
            <span>Kinetic Noir</span>
          </a>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-zinc-300">
            <button
              onClick={() => scrollTo('collection')}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#ff5500] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Apparel
            </button>
            <button
              onClick={() => scrollTo('curriculum')}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#ff5500] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollTo('coaches')}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#ff5500] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Coaches
            </button>
            <button
              onClick={() => scrollTo('case-studies')}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#ff5500] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollTo('community')}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#ff5500] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Community
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Bag with ${cartCount} items`}
              className="relative flex items-center justify-center p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-black bg-[#ff5500] rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0c0c10] px-6 py-6 space-y-4">
          <button
            onClick={() => scrollTo('collection')}
            className="block w-full text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ff5500]"
          >
            Apparel Collection
          </button>
          <button
            onClick={() => scrollTo('curriculum')}
            className="block w-full text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ff5500]"
          >
            Training Curriculum
          </button>
          <button
            onClick={() => scrollTo('coaches')}
            className="block w-full text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ff5500]"
          >
            Coach Profiles
          </button>
          <button
            onClick={() => scrollTo('case-studies')}
            className="block w-full text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ff5500]"
          >
            Member Transformations
          </button>
          <button
            onClick={() => scrollTo('community')}
            className="block w-full text-left text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ff5500]"
          >
            Community Standards
          </button>
        </div>
      )}
    </header>
  );
};
