import React from 'react';

export interface XivaLogoProps {
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'emblem';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  textColor?: string;
}

export const XivaLogo: React.FC<XivaLogoProps> = ({
  className = '',
  layout = 'horizontal',
  size = 'md',
  showSubtitle = false,
  subtitleText = 'Pure Organic Agriculture',
  textColor = 'text-stone-950'
}) => {
  // Sizing definitions
  const dimensions = {
    xs: { emblem: 'w-6 h-6', text: 'text-sm', sub: 'text-[8px]', gap: 'gap-1.5' },
    sm: { emblem: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]', gap: 'gap-2' },
    md: { emblem: 'w-10 h-10', text: 'text-2xl', sub: 'text-[10px]', gap: 'gap-2.5' },
    lg: { emblem: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs', gap: 'gap-3' },
    xl: { emblem: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm', gap: 'gap-3.5' }
  }[size];

  // Vector 4-Leaf Botanical X Emblem from the uploaded image
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
          d="M80 67 C86 46 108 18 152 4 C140 38 128 62 86 73 Z"
          fill="#1aa852"
        />
        <path
          d="M82 66 Q108 34 150 5"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Bottom-Right Leaf (Signature large curved leaf pointing down-right) */}
        <path
          d="M80 77 C88 96 114 128 152 148 C124 146 104 128 78 83 Z"
          fill="#1aa852"
        />
        <path
          d="M81 79 Q110 114 150 146"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Top-Left Leaf */}
        <path
          d="M74 67 C66 48 50 24 20 18 C28 44 42 60 72 71 Z"
          fill="#1aa852"
        />
        <path
          d="M71 66 Q50 44 21 19"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Bottom-Left Leaf */}
        <path
          d="M73 77 C64 96 46 116 18 122 C30 106 40 88 70 75 Z"
          fill="#1aa852"
        />
        <path
          d="M72 78 Q48 100 19 121"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>
    </div>
  );

  if (layout === 'emblem') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LeafXEmblem}</div>;
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LeafXEmblem}
        <span
          className={`font-black tracking-tight font-sans leading-none mt-2 ${textColor} ${dimensions.text}`}
        >
          Xiva.Org
        </span>
        {showSubtitle && (
          <span className={`text-[#1aa852] font-bold tracking-wider uppercase mt-1 ${dimensions.sub}`}>
            {subtitleText}
          </span>
        )}
      </div>
    );
  }

  // Default: horizontal layout (Emblem + Wordmark)
  return (
    <div className={`flex items-center ${dimensions.gap} ${className}`}>
      {LeafXEmblem}
      <div className="flex flex-col text-left leading-none">
        <span className={`font-black tracking-tight font-sans ${textColor} ${dimensions.text}`}>
          Xiva.Org
        </span>
        {showSubtitle && (
          <span className={`text-emerald-700 font-bold tracking-widest uppercase mt-0.5 ${dimensions.sub}`}>
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
