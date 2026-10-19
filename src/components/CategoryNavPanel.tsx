import React, { useMemo } from 'react';
import {
  ChevronRight,
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
  RotateCcw
} from 'lucide-react';
import { CategoryNode, Product, LanguageCode } from '../types';
import { SHOP_CATEGORIES, productMatchesCategory, smoothScrollToCategory } from '../utils/categoryMatcher';

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
    return <Wheat className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('fertilizer') || lower.includes('urea') || lower.includes('compost')) {
    return <PackageCheck className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('pesticide') || lower.includes('neem') || lower.includes('protect')) {
    return <ShieldCheck className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('equipment') || lower.includes('tiller') || lower.includes('tractor') || lower.includes('machinery')) {
    return <Tractor className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('irrigation') || lower.includes('pump') || lower.includes('water')) {
    return <Droplets className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('tool') || lower.includes('accessor')) {
    return <Wrench className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('animal') || lower.includes('feed') || lower.includes('cattle')) {
    return <Beef className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('cereal') || lower.includes('grain') || lower.includes('rice') || lower.includes('wheat')) {
    return <Wheat className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('pulse') || lower.includes('dal') || lower.includes('lentil')) {
    return <PackageCheck className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('veg') || lower.includes('tomato')) {
    return <Carrot className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('fruit') || lower.includes('mango') || lower.includes('orchard')) {
    return <Apple className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  if (lower.includes('spice')) {
    return <Flame className="w-4 h-4 text-[#007a4d] shrink-0" />;
  }
  return <Sprout className="w-4 h-4 text-[#007a4d] shrink-0" />;
};

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

  // Real-time count of actual products in each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SHOP_CATEGORIES.forEach((cat) => {
      counts[cat.id] = products.filter((p) => productMatchesCategory(p, cat.id)).length;
    });
    return counts;
  }, [products]);

  const handleCategoryClick = (catId: string) => {
    const isAlreadySelected = activeCategoryId === catId;
    const nextCatId = isAlreadySelected ? null : catId;
    onSelectCategory(nextCatId);
    // Smooth scroll to the corresponding category's product results section
    setTimeout(() => {
      smoothScrollToCategory(nextCatId);
    }, 60);
  };

  const handleReset = () => {
    onSelectCategory(null);
    setTimeout(() => {
      smoothScrollToCategory(null);
    }, 60);
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 flex flex-col justify-between ${className}`}>
      <div className="space-y-3">
        {/* Header: Shop by Category with Leaf Icon & Reset Button */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-stone-900 text-base tracking-tight leading-tight">
              Shop by Category
            </h3>
          </div>

          {activeCategoryId && (
            <button
              onClick={handleReset}
              className="text-xs text-[#007a4d] hover:text-[#005c3a] hover:underline font-bold flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset category filter and restore all products"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Breadcrumb Trail if drilled into subcategory */}
        {activeNode && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600 pb-2 border-b border-stone-100 flex-wrap">
            <button
              onClick={handleReset}
              className="text-stone-500 hover:text-[#007a4d] font-medium cursor-pointer"
            >
              All
            </button>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3 h-3 text-stone-300" />
                <button
                  onClick={() => {
                    onSelectCategory(crumb.id);
                    setTimeout(() => smoothScrollToCategory(crumb.id), 60);
                  }}
                  className={`font-semibold hover:text-[#007a4d] cursor-pointer ${
                    idx === breadcrumbs.length - 1 ? 'text-[#007a4d] font-bold' : 'text-stone-600'
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Category List: All 8 Categories from User Brief */}
        <div className="space-y-1">
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = activeCategoryId === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                id={`sidebar-cat-${cat.id}`}
                onClick={() => handleCategoryClick(cat.id)}
                aria-pressed={isSelected}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 text-[#007a4d] font-bold border border-emerald-300 shadow-xs ring-1 ring-[#007a4d]/20'
                    : 'hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-transparent'
                }`}
              >
                {/* Fixed-width Icon Container Ensures Perfect Left Alignment of all Category Names */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#007a4d]">
                    {getCategoryIcon(cat.id, cat.name)}
                  </div>
                  <span className="truncate leading-none">{cat.name}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-2">
                  <span
                    className={`text-xs min-w-5 h-5 flex items-center justify-center px-1.5 rounded-md font-numeric font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#007a4d] text-white font-bold'
                        : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                    }`}
                  >
                    {count}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSelected ? 'text-[#007a4d]' : 'text-stone-300 group-hover:text-stone-500'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom subtle trust helper ensuring clean vertical balance */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
        <span>100% Verified Farmer Direct</span>
      </div>
    </div>
  );
};
