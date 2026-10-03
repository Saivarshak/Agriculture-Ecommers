import React from 'react';

export const LeafyBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Layer 1: Soft Botanical Atmospheric Gradients & Sunlight Rays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-3xl animate-sunlight" />
      <div className="absolute top-1/3 left-[-100px] w-[600px] h-[600px] rounded-full bg-emerald-200/25 blur-3xl" />
      <div className="absolute bottom-1/4 right-[-100px] w-[650px] h-[650px] rounded-full bg-lime-100/35 blur-3xl" />

      {/* Layer 2: Subtle Botanical Silhouettes & Branch Sprigs at Edges */}

      {/* Top Left Leaf Sprig */}
      <div className="absolute -top-6 -left-8 w-64 h-64 opacity-25 md:opacity-35 text-emerald-800 animate-leaf-sway">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform -rotate-12">
          <path d="M40,20 C80,30 110,70 120,110 C100,120 70,110 50,80 C35,60 30,35 40,20 Z" fillOpacity="0.8" />
          <path d="M30,30 C70,45 95,85 105,125" stroke="#166534" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M70,60 C85,55 100,60 110,70" stroke="#166534" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M55,40 C65,25 90,30 115,45 C100,65 80,65 65,55 Z" fillOpacity="0.6" />
          <path d="M80,85 C115,80 145,105 155,140 C130,150 100,135 90,110 Z" fillOpacity="0.7" />
        </svg>
      </div>

      {/* Top Right Foliage Silhouette */}
      <div className="absolute -top-12 -right-12 w-80 h-80 opacity-20 md:opacity-30 text-emerald-900 animate-leaf-sway" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform scale-x-[-1] rotate-6">
          <path d="M30,20 C75,25 115,65 130,115 C105,125 75,115 50,80 C35,55 25,30 30,20 Z" fillOpacity="0.8" />
          <path d="M25,25 C65,40 95,85 110,130" stroke="#14532d" strokeWidth="2.5" fill="none" opacity="0.6" />
          <path d="M75,50 C95,35 125,45 145,70 C125,90 95,85 80,70 Z" fillOpacity="0.6" />
          <path d="M90,95 C125,90 155,115 165,150 C140,160 110,145 100,120 Z" fillOpacity="0.75" />
        </svg>
      </div>

      {/* Left Mid-screen Soft Vine Silhouette */}
      <div className="hidden lg:block absolute top-[40%] -left-10 w-48 h-96 opacity-15 text-emerald-800 animate-leaf-sway" style={{ animationDelay: '5s' }}>
        <svg viewBox="0 0 100 250" fill="currentColor" className="w-full h-full">
          <path d="M20,10 Q60,80 30,160 T40,240" stroke="#166534" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M35,60 C55,50 75,60 80,75 C70,85 50,85 38,70 Z" fillOpacity="0.8" />
          <path d="M28,110 C8,100 -5,115 0,130 C15,135 30,125 28,110 Z" fillOpacity="0.7" />
          <path d="M32,170 C52,160 70,175 75,190 C60,200 45,195 35,180 Z" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Right Mid-screen Soft Vine Silhouette */}
      <div className="hidden lg:block absolute top-[55%] -right-10 w-52 h-96 opacity-15 text-emerald-800 animate-leaf-sway" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 250" fill="currentColor" className="w-full h-full scale-x-[-1]">
          <path d="M15,10 Q65,90 25,170 T35,245" stroke="#166534" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M30,55 C55,45 75,55 80,70 C70,82 50,80 35,65 Z" fillOpacity="0.8" />
          <path d="M25,120 C5,110 -5,125 0,140 C15,145 30,135 25,120 Z" fillOpacity="0.75" />
          <path d="M30,185 C55,175 72,190 76,205 C60,215 45,210 32,195 Z" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Bottom Corner Vines */}
      <div className="hidden sm:block absolute -bottom-10 -left-10 w-72 h-72 opacity-20 text-emerald-900 animate-leaf-sway" style={{ animationDelay: '4s' }}>
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform rotate-45">
          <path d="M30,30 C75,35 110,75 125,125 C100,135 70,125 45,90 C30,65 25,40 30,30 Z" fillOpacity="0.8" />
          <path d="M25,35 C65,50 95,95 110,140" stroke="#14532d" strokeWidth="2.5" fill="none" opacity="0.6" />
          <path d="M70,60 C90,45 120,55 140,80 C120,100 90,95 75,80 Z" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Layer 3: Discrete Floating Leaves Moving on Gentle Breeze Curves */}

      {/* Floating Leaf 1 - Left upper quadrant */}
      <div className="absolute top-[18%] left-[6%] w-10 h-10 opacity-70 animate-leaf-1">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
          <path
            d="M12,52 C20,30 38,16 54,10 C50,28 36,46 16,54 Z"
            fill="#22c55e"
            fillOpacity="0.75"
          />
          <path
            d="M14,50 C26,34 38,24 52,12"
            stroke="#15803d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Leaf 2 - Right upper quadrant */}
      <div className="absolute top-[28%] right-[8%] w-12 h-12 opacity-65 animate-leaf-2" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
          <path
            d="M52,52 C44,30 26,16 10,10 C14,28 28,46 48,54 Z"
            fill="#16a34a"
            fillOpacity="0.7"
          />
          <path
            d="M50,50 C38,34 26,24 12,12"
            stroke="#14532d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Leaf 3 - Left lower quadrant */}
      <div className="hidden sm:block absolute top-[62%] left-[4%] w-11 h-11 opacity-60 animate-leaf-3" style={{ animationDelay: '7s' }}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
          <path
            d="M14,14 C36,18 48,34 52,52 C34,48 18,34 12,16 Z"
            fill="#4ade80"
            fillOpacity="0.65"
          />
          <path
            d="M16,16 C30,28 40,40 50,50"
            stroke="#166534"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Leaf 4 - Right lower quadrant */}
      <div className="hidden md:block absolute top-[75%] right-[5%] w-10 h-10 opacity-70 animate-leaf-4" style={{ animationDelay: '5s' }}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
          <path
            d="M10,50 C24,28 42,18 54,12 C48,30 32,48 14,54 Z"
            fill="#15803d"
            fillOpacity="0.75"
          />
          <path
            d="M12,48 C28,32 40,22 52,14"
            stroke="#052e16"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Leaf 5 - Center-right delicate leaf */}
      <div className="hidden lg:block absolute top-[45%] right-[14%] w-8 h-8 opacity-50 animate-leaf-2" style={{ animationDelay: '11s' }}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
          <path
            d="M16,48 C24,28 38,18 48,14 C44,30 32,44 18,50 Z"
            fill="#86efac"
            fillOpacity="0.8"
          />
          <path
            d="M18,46 C28,32 38,24 46,16"
            stroke="#15803d"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
