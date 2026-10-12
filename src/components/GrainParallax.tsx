import React, { useEffect, useState } from 'react';

export const GrainParallax: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY * 0.12);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-overlay opacity-25"
    >
      <div
        className="absolute -inset-10 bg-repeat"
        style={{
          transform: `translate3d(0, ${offsetY % 40}px, 0)`,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
};
