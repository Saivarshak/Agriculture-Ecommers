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
  Minus,
  Sparkles,
  Megaphone,
  Tag,
  Copy,
  Check
} from 'lucide-react';
import { Product, ProductCategory, LanguageCode, AdCard, SiteStructureConfig } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';

export interface MarketplaceProps {
  products: Product[];
  ads?: AdCard[];
  siteStructure?: SiteStructureConfig;
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
  ads = [],
  siteStructure,
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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Active ads filtered by placement
  const activeSpotlightAds = useMemo(
    () => ads.filter((a) => a.active && a.placement === 'hero_spotlight'),
    [ads]
  );
  const activeGridAds = useMemo(
    () => ads.filter((a) => a.active && a.placement === 'catalog_interstitial'),
    [ads]
  );

  const handleCopyPromoCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

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
        <div className="relative min-h-[500px] lg:min-h-[620px] w-full flex items-center">
          {/* Lush Agricultural Farmland Image */}
          <img
            src={siteStructure?.heroBgImage || '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg'}
            alt="Organic farmland at sunrise"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />

          {/* Natural Green & Golden Sunlight Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04200f]/95 via-[#063b19]/80 to-stone-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021308]/90 via-transparent to-black/30" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="max-w-3xl space-y-5">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                <Sprout className="w-3 h-3 text-emerald-300" />
                <span>{siteStructure?.heroBadge || t.heroBadge}</span>
              </div>

              {/* Main Headline - Enlarged Hero Visibility */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white font-serif-display tracking-tight leading-[1.1]">
                  {siteStructure?.heroTitle || t.heroMainTitle}
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-emerald-300 font-serif-display leading-tight">
                  {siteStructure?.heroSubtitle || t.heroSubTitle}
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl text-balance">
                {siteStructure?.heroDescription || t.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#crops-catalog"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md hover:shadow-emerald-900/30 flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>{siteStructure?.heroCtaExploreText || t.heroCtaExplore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={onNavigateToFarmer}
                  className="bg-black/30 hover:bg-black/50 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl border border-white/60 backdrop-blur-xs transition-all cursor-pointer"
                >
                  {siteStructure?.heroCtaFarmerText || t.heroCtaFarmer}
                </button>
              </div>

              {/* Key Trust Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-800/60 text-white text-xs max-w-xl">
                {siteStructure?.trustStats?.length ? (
                  siteStructure.trustStats.map((stat) => (
                    <div key={stat.id}>
                      <span className="block font-black text-xl lg:text-2xl text-emerald-300">
                        {stat.value}
                      </span>
                      <span className="text-stone-300 text-[10px] sm:text-[11px]">{stat.label}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <span className="block font-black text-xl lg:text-2xl text-emerald-300">0%</span>
                      <span className="text-stone-300 text-[10px] sm:text-[11px]">{t.statCommission}</span>
                    </div>
                    <div>
                      <span className="block font-black text-xl lg:text-2xl text-emerald-300">100%</span>
                      <span className="text-stone-300 text-[10px] sm:text-[11px]">{t.statDirect}</span>
                    </div>
                    <div>
                      <span className="block font-black text-xl lg:text-2xl text-emerald-300">24h</span>
                      <span className="text-stone-300 text-[10px] sm:text-[11px]">{t.statGateToHome}</span>
                    </div>
                    <div>
                      <span className="block font-black text-xl lg:text-2xl text-emerald-300">Govt</span>
                      <span className="text-stone-300 text-[10px] sm:text-[11px]">{t.statVerifiedFarms}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* APMC Mandi Price Ticker (Farmer Earnings vs Retail Margin) */}
        {(siteStructure?.mandiTickerEnabled ?? true) && (
          <div className="bg-[#031d0d] text-emerald-100 text-[11px] py-2 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/80">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-bold text-white text-xs">
                  {siteStructure?.mandiTickerTitle || t.mandiTickerTitle}:
                </span>
                <span className="text-stone-300 hidden md:inline text-[11px]">
                  {siteStructure?.mandiTickerDesc || t.mandiTickerDesc}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-emerald-300 overflow-x-auto">
                {siteStructure?.mandiTickerItems?.length ? (
                  siteStructure.mandiTickerItems.map((item) => (
                    <span key={item.id} className="whitespace-nowrap font-medium">
                      <strong>{item.name}:</strong> {item.price}
                    </span>
                  ))
                ) : (
                  <>
                    <span>{t.tickerPaddy}</span>
                    <span className="hidden sm:inline">{t.tickerTomato}</span>
                    <span>{t.tickerMango}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Spotlight Ad Banner Cards (if configured by Admin) */}
      {activeSpotlightAds.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {activeSpotlightAds.map((ad) => (
              <div
                key={ad.id}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 group"
              >
                {/* Background Artwork */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative z-10 space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Megaphone className="w-3 h-3 text-amber-950" />
                      {ad.badge}
                    </span>
                    {ad.discountText && (
                      <span className="bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        {ad.discountText}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-serif-display tracking-tight text-white leading-tight">
                    {ad.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {ad.subtitle}
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  {ad.code && (
                    <button
                      onClick={(e) => handleCopyPromoCode(e, ad.code!)}
                      className="bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-400/50 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Click to copy coupon code"
                    >
                      <span>Code: <strong>{ad.code}</strong></span>
                      {copiedCode === ad.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (ad.ctaCategory && ad.ctaCategory !== 'all') {
                        onSelectCategory(ad.ctaCategory);
                      }
                      const el = document.getElementById('crops-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{ad.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Main Catalog Section */}
      <section id="crops-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter and Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-2.5 sm:px-3 rounded-xl border border-stone-200 shadow-xs">
          {/* Left: Verified Only Toggle & Count */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border ${
                verifiedOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <ShieldCheck className={`w-3 h-3 ${verifiedOnly ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span>{t.filterVerifiedOnly}</span>
            </button>

            <span className="text-[11px] text-stone-500 font-medium">
              {t.showing} <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> {t.crops}
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
                className="w-full bg-stone-50 text-[11px] rounded-md pl-6 pr-2 py-1 border border-stone-200 focus:outline-none focus:border-emerald-600"
              />
              <Search className="w-2.5 h-2.5 text-stone-400 absolute left-2 top-2" />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1 text-[11px] text-stone-600 shrink-0">
              <ArrowUpDown className="w-3 h-3 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={t.sortBy}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-[11px] rounded-md px-2 py-1 focus:outline-none focus:border-emerald-600 cursor-pointer font-medium"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredProducts.map((product, index) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const qty = quantities[product.id] || 1;
              const localized = getProductLocalized(product.id, product.name, product.category, language, product.description, product.unit);

              // Check if we should insert an in-grid ad card
              const shouldShowAd = activeGridAds.length > 0 && (index === 2 || (index > 2 && (index - 2) % 6 === 0));
              const adToDisplay = shouldShowAd
                ? activeGridAds[Math.floor(index / 6) % activeGridAds.length]
                : null;

              return (
                <React.Fragment key={product.id}>
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 hover:border-emerald-500/50 flex flex-col cursor-pointer relative"
                  >
                    {/* Top Produce Image Container */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={localized.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Verified Farmer Badge */}
                      {product.farmerVerified && (
                        <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-xs text-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs border border-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{t.farmerBadge}</span>
                        </div>
                      )}

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs hover:bg-white text-stone-600 hover:text-rose-600 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist toggle"
                      >
                        <Heart
                          className={`w-4.5 h-4.5 ${
                            isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-600'
                          }`}
                        />
                      </button>

                      {/* Distance & Freshness Overlay */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white font-medium bg-black/65 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-emerald-300" />
                          <span>{product.farmDistanceKm || 20} {t.away}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-200">
                          <Clock className="w-3 h-3" />
                          <span>{product.harvestTime || t.freshBatch}</span>
                        </div>
                      </div>
                    </div>

                    {/* Product Details Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Farmer Name & Village */}
                        <div className="flex items-center justify-between text-xs sm:text-[13px] text-stone-500">
                          <span className="font-semibold text-emerald-800 truncate max-w-[190px]">
                            {product.farmerName}
                          </span>
                          <span className="text-stone-400 truncate max-w-[140px]">
                            {product.farmerVillage.split(',')[0]}
                          </span>
                        </div>

                        {/* Product Name */}
                        <h4 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1 font-serif-display">
                          {localized.name}
                        </h4>

                        {/* Star Rating & Review Count */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="flex items-center text-amber-500">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-stone-800 ml-1">{product.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-stone-400 text-xs">
                            ({product.reviewCount || 18} {t.reviews})
                          </span>
                          <span className="text-stone-300">·</span>
                          <span className="text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                            {localized.categoryName}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-stone-600 line-clamp-2 leading-relaxed">
                          {localized.description}
                        </p>
                      </div>

                      {/* Pricing, Quantity & Add to Cart */}
                      <div className="pt-3 border-t border-stone-100 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-stone-900 font-numeric">
                              ₹{product.price}
                            </span>
                            <span className="text-xs sm:text-sm text-stone-500 font-medium ml-1">
                              / {localized.unit}
                            </span>
                          </div>

                          {/* Direct to Farmer Tag */}
                          <div className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-medium border border-emerald-200">
                            {t.directToFarmer}
                          </div>
                        </div>

                        {/* Action Row: Quantity Stepper & Add Button */}
                        <div className="flex items-center gap-2.5">
                          {/* Stepper */}
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200 text-xs shrink-0"
                          >
                            <button
                              onClick={() => handleQtyChange(product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-bold text-stone-900 font-numeric text-sm">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleQtyChange(product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Add to Basket Button */}
                          <button
                            onClick={(e) => handleAdd(e, product)}
                            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>{t.addToBasket}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interstitial Ad Card In-Grid */}
                  {adToDisplay && (
                    <div
                      key={`grid_ad_${adToDisplay.id}_${index}`}
                      onClick={() => {
                        if (adToDisplay.ctaCategory && adToDisplay.ctaCategory !== 'all') {
                          onSelectCategory(adToDisplay.ctaCategory);
                        }
                      }}
                      className="group bg-gradient-to-br from-[#04200f] via-[#064e3b] to-stone-950 text-white rounded-2xl border-2 border-emerald-400/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative cursor-pointer"
                    >
                      {/* Top Ad Image Container */}
                      <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-stone-900 overflow-hidden">
                        <img
                          src={adToDisplay.image}
                          alt={adToDisplay.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04200f] via-transparent to-black/40" />

                        <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md uppercase tracking-wider">
                          <Megaphone className="w-3.5 h-3.5" />
                          <span>{adToDisplay.badge}</span>
                        </div>

                        {adToDisplay.discountText && (
                          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md border border-emerald-400/40">
                            {adToDisplay.discountText}
                          </div>
                        )}

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-emerald-200 text-xs font-mono">
                          ★ Direct Farm-Gate Promotional Campaign
                        </div>
                      </div>

                      {/* Ad Content */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors font-serif-display leading-tight">
                            {adToDisplay.title}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed">
                            {adToDisplay.subtitle}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-emerald-800/80 space-y-3">
                          {adToDisplay.code && (
                            <div className="flex items-center justify-between bg-emerald-950/90 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs">
                              <span className="text-emerald-300">Use Code:</span>
                              <button
                                onClick={(e) => handleCopyPromoCode(e, adToDisplay.code!)}
                                className="font-mono font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                              >
                                <span>{adToDisplay.code}</span>
                                {copiedCode === adToDisplay.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                                )}
                              </button>
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (adToDisplay.ctaCategory && adToDisplay.ctaCategory !== 'all') {
                                onSelectCategory(adToDisplay.ctaCategory);
                              }
                            }}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                          >
                            <span>{adToDisplay.ctaText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
