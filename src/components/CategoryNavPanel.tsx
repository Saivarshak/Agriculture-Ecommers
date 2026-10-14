import React, { useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sprout,
  Wheat,
  Apple,
  Carrot,
  Flame,
  Droplets,
  PackageCheck,
  ShieldCheck,
  Tractor,
  Wrench,
  Beef,
  Sparkles
} from 'lucide-react';
import { CategoryNode, Product, LanguageCode } from '../types';

interface CategoryNavPanelProps {
  categories: CategoryNode[];
  activeCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  products: Product[];
  language?: LanguageCode;
  className?: string;
  isCompact?: boolean;
}

// Icon helper matching Image 1
const getCategoryIcon = (id: string, name: string) => {
  const lower = (id + ' ' + name).toLowerCase();
  if (lower.includes('seed')) {
    return <Wheat className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('fertilizer') || lower.includes('urea') || lower.includes('compost')) {
    return <PackageCheck className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('pesticide') || lower.includes('neem') || lower.includes('protect')) {
    return <ShieldCheck className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('equipment') || lower.includes('tiller') || lower.includes('tractor') || lower.includes('machinery')) {
    return <Tractor className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('irrigation') || lower.includes('pump') || lower.includes('water')) {
    return <Droplets className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('tool') || lower.includes('accessor')) {
    return <Wrench className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('animal') || lower.includes('feed') || lower.includes('cattle')) {
    return <Beef className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('cereal') || lower.includes('grain') || lower.includes('rice') || lower.includes('wheat')) {
    return <Wheat className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('pulse') || lower.includes('dal') || lower.includes('lentil')) {
    return <PackageCheck className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('veg') || lower.includes('tomato')) {
    return <Carrot className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('fruit') || lower.includes('mango') || lower.includes('orchard')) {
    return <Apple className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('spice')) {
    return <Flame className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
  }
  return <Sprout className="w-4.5 h-4.5 text-[#007a4d] shrink-0" />;
};

// Default high-level agricultural categories shown in Image 1
const DEFAULT_MENU_CATEGORIES = [
  { id: 'seeds', name: 'Seeds', icon: 'seed' },
  { id: 'fertilizers', name: 'Fertilizers', icon: 'fertilizer' },
  { id: 'pesticides', name: 'Pesticides', icon: 'pesticide' },
  { id: 'equipment', name: 'Farm Equipment', icon: 'equipment' },
  { id: 'irrigation', name: 'Irrigation', icon: 'irrigation' },
  { id: 'tools', name: 'Tools & Accessories', icon: 'tools' },
  { id: 'animal_feed', name: 'Animal Feed', icon: 'feed' },
  { id: 'organic', name: 'Organic Products', icon: 'organic' }
];

export const CategoryNavPanel: React.FC<CategoryNavPanelProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  products,
  className = ''
}) => {
  const categoryMap = useMemo(() => {
    const map = new Map<string, CategoryNode>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  const activeNode = activeCategoryId ? categoryMap.get(activeCategoryId) : null;
  const parentNode = activeNode?.parentId ? categoryMap.get(activeNode.parentId) || null : null;

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    const trail: CategoryNode[] = [];
    let curr = activeNode;
    while (curr) {
      trail.unshift(curr);
      curr = curr.parentId ? categoryMap.get(curr.parentId) || null : null;
    }
    return trail;
  }, [activeNode, categoryMap]);

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 flex flex-col justify-between ${className}`}>
      <div className="space-y-3">
        {/* Header: Shop by Category with Leaf Icon */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Sprout className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-extrabold text-stone-900 text-base tracking-tight">
              Shop by Category
            </h3>
          </div>

          {activeCategoryId && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs text-[#007a4d] hover:underline font-semibold cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Breadcrumb Trail if drilled into subcategory */}
        {activeNode && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600 pb-2 border-b border-stone-100 flex-wrap">
            <button
              onClick={() => onSelectCategory(null)}
              className="text-stone-500 hover:text-[#007a4d] font-medium"
            >
              All
            </button>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3 h-3 text-stone-300" />
                <button
                  onClick={() => onSelectCategory(crumb.id)}
                  className={`font-semibold hover:text-[#007a4d] ${
                    idx === breadcrumbs.length - 1 ? 'text-[#007a4d] font-bold' : 'text-stone-600'
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Category List styled exactly as Image 1 */}
        <div className="space-y-1">
          {DEFAULT_MENU_CATEGORIES.map((cat) => {
            const isSelected = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 text-[#007a4d] font-bold border border-emerald-200'
                    : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(cat.id, cat.name)}
                  <span className="truncate">{cat.name}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-[#007a4d]' : 'text-stone-300 group-hover:text-stone-500'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
