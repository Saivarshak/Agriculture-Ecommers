import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  TrendingUp,
  Search,
  CheckCircle2,
  Sprout,
  ArrowRight,
  Heart,
  ArrowUpDown,
  Plus,
  Minus
} from 'lucide-react';
import { Product, ProductCategory, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';

export interface MarketplaceProps {
  products: Product[];
  currentCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: LanguageCode;
  onNavigateToFarmer: () => void;
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
  onSearchChange,
  language,
  onNavigateToFarmer
}) => {
  const t = translations[language];

  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'distance'>('rating');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filter products based on category, search, and verified filter
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (currentCategory !== 'all' && p.category !== currentCategory) return false;
        if (verifiedOnly && !p.farmerVerified) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const localized = getProductLocalized(p.id, p.name, p.category, language, p.description, p.unit);
          return (
            p.name.toLowerCase().includes(q) ||
            localized.name.toLowerCase().includes(q) ||
            p.farmerName.toLowerCase().includes(q) ||
            p.farmerVillage.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'distance') return (a.farmDistanceKm || 99) - (b.farmDistanceKm || 99);
        return 0;
      });
  }, [products, currentCategory, verifiedOnly, searchQuery, sortBy, language]);

  // Categories dynamically translated from translations[language]
  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.allCrops },
    { id: 'cereals', label: t.cereals },
    { id: 'pulses', label: t.pulses },
    { id: 'vegetables', label: t.vegetables },
    { id: 'fruits', label: t.fruits },
    { id: 'spices', label: t.spices },
    { id: 'exotic', label: t.exotic }
  ];

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const qty = quantities[product.id] || 1;
    const localized = getProductLocalized(product.id, product.name, product.category, language, product.description, product.unit);
    onAddToCart(product, qty);
    setAddedNotice(`${t.addedToBasket}: ${qty} ${localized.unit} ${localized.name}`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16 relative z-10 animate-fadeIn">
      {/* 1. Main Hero Section */}
      <section className="relative overflow-hidden w-full bg-stone-900 border-b border-stone-200">
        <div className="relative min-h-[460px] lg:min-h-[540px] w-full flex items-center">
          {/* Lush Agricultural Farmland Image */}
          <img
            src="/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg"
            alt="Organic farmland at sunrise"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Natural Green & Golden Sunlight Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04200f]/95 via-[#063b19]/80 to-stone-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021308]/90 via-transparent to-black/30" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
            <div className="max-w-2xl space-y-5">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif-display tracking-tight leading-[1.15]">
                  {t.heroMainTitle}
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-300 font-serif-display">
                  {t.heroSubTitle}
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl text-balance">
                {t.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#crops-catalog"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/30 flex items-center gap-2 group cursor-pointer"
                >
                  <span>{t.heroCtaExplore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={onNavigateToFarmer}
                  className="bg-black/30 hover:bg-black/50 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl border border-white/60 backdrop-blur-sm transition-all cursor-pointer"
                >
                  {t.heroCtaFarmer}
                </button>
              </div>

              {/* Key Trust Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-800/60 text-white text-xs">
                <div>
                  <span className="block font-black text-lg text-emerald-300">0%</span>
                  <span className="text-stone-300 text-[11px]">{t.statCommission}</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-emerald-300">100%</span>
                  <span className="text-stone-300 text-[11px]">{t.statDirect}</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-emerald-300">24h</span>
                  <span className="text-stone-300 text-[11px]">{t.statGateToHome}</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-emerald-300">Govt</span>
                  <span className="text-stone-300 text-[11px]">{t.statVerifiedFarms}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APMC Mandi Price Ticker (Farmer Earnings vs Retail Margin) */}
        <div className="bg-[#031d0d] text-emerald-100 text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/80">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-white">{t.mandiTickerTitle}:</span>
              <span className="text-stone-300 hidden md:inline">
                {t.mandiTickerDesc}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-emerald-300">
              <span>🌾 Paddy/Rice: ₹65/kg (Mandi: ₹54)</span>
              <span className="hidden sm:inline">🍅 Tomato: ₹38/kg (Supermarket: ₹48)</span>
              <span>🥭 Alphonso: ₹520/doz</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Section */}
      <section id="crops-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter and Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
          {/* Left: Verified Only Toggle & Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                verifiedOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span>{t.filterVerifiedOnly}</span>
            </button>

            <span className="text-xs text-stone-500 font-medium">
              {t.showing} <strong className="text-stone-900">{filteredProducts.length}</strong> {t.crops}
            </span>
          </div>

          {/* Right: Search + Sort By */}
          <div className="flex items-center gap-2">
            {/* Mobile search bar if desktop search hidden */}
            <div className="relative md:hidden flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-stone-50 text-xs rounded-lg pl-7 pr-2 py-1.5 border border-stone-200 focus:outline-none focus:border-emerald-600"
              />
              <Search className="w-3 h-3 text-stone-400 absolute left-2 top-2" />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={t.sortBy}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-600 cursor-pointer font-medium"
              >
                <option value="rating">{t.sortHighestRated}</option>
                <option value="price_low">{t.sortPriceLowHigh}</option>
                <option value="price_high">{t.sortPriceHighLow}</option>
                <option value="distance">{t.sortDistance}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Added to Cart Notification Toast */}
        {addedNotice && (
          <div className="bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span className="font-semibold">{addedNotice}</span>
            </div>
          </div>
        )}

        {/* 3. Produce Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-3">
            <Sprout className="w-10 h-10 text-emerald-600 mx-auto opacity-60" />
            <h3 className="text-base font-bold text-stone-900 font-serif-display">{t.noCropsFound}</h3>
            <p className="text-xs text-stone-500">
              {t.noCropsFoundDesc}
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
                setVerifiedOnly(false);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const qty = quantities[product.id] || 1;
              const localized = getProductLocalized(product.id, product.name, product.category, language, product.description, product.unit);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:border-emerald-500/50 flex flex-col cursor-pointer relative"
                >
                  {/* Top Produce Image Container */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={localized.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Verified Farmer Badge */}
                    {product.farmerVerified && (
                      <div className="absolute top-2.5 left-2.5 bg-emerald-900/90 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-emerald-700">
                        <ShieldCheck className="w-3 h-3 text-emerald-300" />
                        <span>{t.farmerBadge}</span>
                      </div>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-stone-600 hover:text-rose-600 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-600'
                        }`}
                      />
                    </button>

                    {/* Distance & Freshness Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-emerald-300" />
                        <span>{product.farmDistanceKm || 20} {t.away}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-200">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{product.harvestTime || t.freshBatch}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Farmer Name & Village */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-semibold text-emerald-800 truncate max-w-[150px]">
                          {product.farmerName}
                        </span>
                        <span className="text-stone-400 truncate max-w-[110px]">
                          {product.farmerVillage.split(',')[0]}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h4 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1 font-serif-display">
                        {localized.name}
                      </h4>

                      {/* Star Rating & Review Count */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-stone-800 ml-1">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">
                          ({product.reviewCount || 18} {t.reviews})
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-emerald-700 text-[10px] font-semibold uppercase tracking-wider">
                          {localized.categoryName}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {localized.description}
                      </p>
                    </div>

                    {/* Pricing, Quantity & Add to Cart */}
                    <div className="pt-2 border-t border-stone-100 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-stone-900 font-numeric">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-stone-500 font-medium ml-1">
                            / {localized.unit}
                          </span>
                        </div>

                        {/* Direct to Farmer Tag */}
                        <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                          {t.directToFarmer}
                        </div>
                      </div>

                      {/* Action Row: Quantity Stepper & Add Button */}
                      <div className="flex items-center gap-2">
                        {/* Stepper */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-xs shrink-0"
                        >
                          <button
                            onClick={() => handleQtyChange(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-stone-900 font-numeric">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Add to Basket Button */}
                        <button
                          onClick={(e) => handleAdd(e, product)}
                          className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{t.addToBasket}</span>
                        </button>
                      </div>
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
