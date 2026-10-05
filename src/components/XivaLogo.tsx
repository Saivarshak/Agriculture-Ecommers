import React from 'react';

interface XivaLogoProps {
  className?: string;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const XivaLogo: React.FC<XivaLogoProps> = ({
  className = '',
  layout = 'horizontal',
  size = 'md',
  showSubtitle = true
}) => {
  // Sizing definitions
  const dimensions = {
    sm: { emblem: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { emblem: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { emblem: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' }
  }[size];

  const LeafXEmblem = (
    <div className={`relative shrink-0 ${dimensions.emblem} flex items-center justify-center`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
      >
        {/* Top-Right Leaf (Signature large extended leaf pointing up-right) */}
        <path
          d="M78 68 C84 48 106 20 152 4 C140 38 128 62 84 72 Z"
          fill="#1aa852"
        />
        <path
          d="M80 67 Q108 34 150 5"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Bottom-Right Leaf (Signature large curved leaf pointing down-right) */}
        <path
          d="M78 78 C86 96 112 128 152 148 C124 146 104 128 76 82 Z"
          fill="#1aa852"
        />
        <path
          d="M79 80 Q110 114 150 147"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Top-Left Leaf */}
        <path
          d="M72 67 C64 48 48 24 18 18 C26 44 40 60 70 70 Z"
          fill="#1aa852"
        />
        <path
          d="M69 66 Q48 44 19 19"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Bottom-Left Leaf */}
        <path
          d="M71 78 C62 96 44 116 16 122 C28 106 38 88 68 74 Z"
          fill="#1aa852"
        />
        <path
          d="M70 79 Q46 100 17 121"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LeafXEmblem}
        <span
          className={`font-black tracking-tight text-black font-sans leading-none mt-1.5 ${dimensions.text}`}
        >
          Xiva.Org
        </span>
        {showSubtitle && (
          <span className={`text-[#1aa852] font-semibold tracking-wider uppercase mt-0.5 ${dimensions.sub}`}>
            Pure Organic Agriculture
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {LeafXEmblem}
      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-tight text-black font-sans ${dimensions.text}`}>
          Xiva.Org
        </span>
        {showSubtitle && (
          <span className={`text-emerald-800 font-bold tracking-widest uppercase mt-0.5 ${dimensions.sub}`}>
            Organic Agriculture Platform
          </span>
        )}
      </div>
    </div>
  );
};
