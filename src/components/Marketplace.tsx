import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Search,
  CheckCircle2,
  Heart,
  Truck,
  Leaf,
  Users,
  Award,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { XivaLogo } from './XivaLogo';

interface MarketplaceProps {
  products: Product[];
  currentCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  onSearchChange
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (currentCategory !== 'all' && p.category !== currentCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, currentCategory, searchQuery, sortBy]);

  // Categories matching the PDF table
  const pdfCategories: { id: ProductCategory; label: string; icon: string; desc: string }[] = [
    { id: 'cereals', label: 'Cereals', icon: '🌾', desc: 'Paddy, Wheat, Millets, Oats' },
    { id: 'pulses', label: 'Pulses', icon: '🥣', desc: 'Green gram, Lentils, Chickpea' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥦', desc: 'Tomato, Onion, Potato, Greens' },
    { id: 'fruits', label: 'Fruits', icon: '🍎', desc: 'Banana, Mango, Papaya, Grapes' },
    { id: 'spices', label: 'Spices', icon: '🌶️', desc: 'Turmeric, Pepper, Cardamom, Tea' },
    { id: 'exotic', label: 'Exotic', icon: '🥗', desc: 'Broccoli, Zucchini, Kale, Saffron' }
  ];

  return (
    <div className="space-y-12 pb-20 relative z-10 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION: Faithfully Recreated from Reference Image (IMG-20261003-WA0005.jpg)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf4ec] via-[#f4f9f5] to-white border-b border-stone-200/80 pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Decorative Script Labels matching Image */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-emerald-900 pb-2">
            {/* Left Top: Pure Organic Fresh */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-sm">
                🌿
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-emerald-950 block">Pure Organic Fresh</span>
                <span className="text-[11px] text-stone-500 font-serif italic">Better Food for a Brighter Tomorrow</span>
              </div>
            </div>

            {/* Right Top: Healthy Food Happy Life ♡ */}
            <div className="hidden md:flex items-center gap-1.5 text-emerald-900 font-serif italic text-sm">
              <span className="tracking-wide font-bold">Healthy Food Happy Life</span>
              <span className="text-rose-500 text-base">♡</span>
            </div>
          </div>

          {/* Central Logo & Headline from Reference Image */}
          <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
            {/* Centered Brand Emblem */}
            <div className="flex justify-center">
              <XivaLogo layout="vertical" size="lg" showSubtitle={false} />
            </div>

            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.25em] text-emerald-900 uppercase">
                — FARM FRESH PRODUCE —
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#14361e] font-serif-display tracking-tight leading-[1.15]">
              Fresh from Farmers{' '}
              <span className="font-serif italic text-[#16a34a] font-normal block sm:inline">
                to Your Home
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed pt-1">
              Organic vegetables, fresh fruits, quality pulses, grains, and aromatic spices — all in one place!
            </p>
          </div>

          {/* Central Hero Farm Produce Display Banner */}
          <div className="mt-8 relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 max-w-5xl mx-auto group">
            <div className="aspect-[16/9] sm:aspect-[21/9] max-h-[460px] w-full relative">
              <img
                src="/src/assets/images/hero_farm_produce_spread_1791160693688.jpg"
                alt="Farm fresh vegetables, pulses, and fruits spread"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Floating Leaf Badge Right matching Image: "Goodness of Nature Delivered" */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-emerald-800/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-lg border border-emerald-500/40 text-xs sm:text-sm font-bold flex items-center gap-2">
                <span>🍃</span>
                <span className="font-serif italic">Goodness of Nature Delivered</span>
              </div>

              {/* Bottom Callout Left: Pure Produce ✓✓ */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs sm:text-sm drop-shadow-md hidden sm:block">
                <div className="font-serif italic text-emerald-300 font-bold text-base">
                  Pure Produce ✓✓ · Real Farmers ✓ · A Healthier You ✓
                </div>
                <span className="text-[11px] text-stone-200">Chemical-free soil to table</span>
              </div>

              {/* Bottom CTA Button matching Reference Image: "SHOP NOW →" */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <a
                  href="#catalog-grid"
                  className="bg-[#15803d] hover:bg-[#166534] text-white text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>SHOP NOW →</span>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              4 VALUE PROPOSITION CARDS (Exact Match to Reference Image)
             ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 max-w-5xl mx-auto">
            {/* 1. Fresh & Natural */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[#16a34a]" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Fresh & Natural</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">No harmful chemicals</p>
              </div>
            </div>

            {/* 2. Direct from Farmers */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Direct from Farmers</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Support local farmers</p>
              </div>
            </div>

            {/* 3. Quality Products */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Quality Products</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Freshness you can trust</p>
              </div>
            </div>

            {/* 4. Fast Delivery */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#16a34a]" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Fast Delivery</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOP BY CATEGORY SECTION (Matching Image & Derived strictly from PDF)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-extrabold text-emerald-800 tracking-widest uppercase">
            — ORGANIC HARVEST COLLECTION —
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-display">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs text-stone-500">
            Browse our complete selection of authentic farm harvests verified by local farmers.
          </p>
        </div>

        {/* 6 Category Tiles from Reference Image & PDF */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {pdfCategories.map((cat) => {
            const isSelected = currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-2 group cursor-pointer ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/90 shadow-md ring-2 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <span className="font-bold text-stone-900 text-xs sm:text-sm block">
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-stone-400 block line-clamp-1">
                    {cat.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Big CTA Banner matching reference */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-8 py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
              currentCategory === 'all'
                ? 'bg-[#15803d] text-white hover:bg-[#166534]'
                : 'bg-white text-emerald-900 border border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{currentCategory === 'all' ? 'VIEWING ALL CROPS' : 'SHOW ALL CATEGORIES'}</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          PRODUCT LIST SECTION (Exclusively Populated by PDF Table)
         ========================================================================= */}
      <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        {/* Controls: Filter Status & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-900 font-serif-display capitalize">
                {currentCategory === 'all' ? 'All Organic Crops' : currentCategory}
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full font-numeric">
                {filteredProducts.length} items from PDF
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Exact farm products specified in the official catalog.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
            >
              <option value="featured">Featured Crops</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8">
            <div className="text-4xl">🔍</div>
            <h4 className="text-base font-bold text-stone-900">No products found matching "{searchQuery}"</h4>
            <p className="text-xs text-stone-500">Try checking your spelling or clearing search filters.</p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
              }}
              className="text-xs text-emerald-800 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inWishlist = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Card Image */}
                  <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 cursor-pointer"
                    />

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
                        inWishlist
                          ? 'bg-rose-50 text-rose-600 shadow-xs'
                          : 'bg-white/80 text-stone-400 hover:text-rose-600'
                      }`}
                      title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>

                    {/* Category Label */}
                    <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                      {product.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1 font-semibold text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                          Organic
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-numeric font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="text-sm font-bold text-stone-900 font-serif-display mt-1 hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Card Price & Action */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                      <div>
                        <span className="text-base font-bold text-emerald-950 font-numeric">
                          ₹{product.price}
                        </span>
                        <span className="text-[11px] text-stone-500"> / {product.unit}</span>
                      </div>

                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
