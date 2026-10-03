import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Filter,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Check,
  Sprout,
  ArrowRight
} from 'lucide-react';
import { Product, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface MarketplaceProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  language: LanguageCode;
  onNavigateToFarmer: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  language,
  onNavigateToFarmer
}) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'freshness' | 'price_low' | 'price_high'>('rating');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (verifiedOnly && !p.farmerVerified) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.farmerName.toLowerCase().includes(q) ||
            p.farmerVillage.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance') return a.farmDistanceKm - b.farmDistanceKm;
        if (sortBy === 'freshness') {
          return b.harvestDate.localeCompare(a.harvestDate);
        }
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, verifiedOnly, searchQuery, sortBy]);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'vegetables', label: t.vegetables },
    { id: 'fruits', label: t.fruits },
    { id: 'grains_pulses', label: t.grainsPulses },
    { id: 'cold_pressed_oils', label: t.coldPressedOils },
    { id: 'dairy_honey', label: t.dairyHoney },
    { id: 'spices', label: t.spices }
  ];

  return (
    <div className="space-y-10 pb-16 relative z-10 animate-fadeIn">
      {/* 1. Main Hero Section (Faithfully matching user's uploaded reference image) */}
      <section className="relative overflow-hidden w-full bg-stone-900 border-b border-stone-200">
        <div className="relative min-h-[500px] lg:min-h-[580px] w-full flex items-center">
          {/* Background Tractor & Green Wheat Field Image */}
          <img
            src="/src/assets/images/hero_nutrify_tractor_field_1791023332618.jpg"
            alt="Modern green agricultural tractor working in lush emerald wheat field"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Measured Green & Sunlight Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#072410]/95 via-[#0b3317]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051a0b]/80 via-transparent to-black/30" />

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="max-w-2xl space-y-5">
              {/* Green Pill Badge: 100% Organic & Natural (Exact match to reference) */}
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                <span>100% Organic & Natural</span>
              </div>

              {/* Main Headline (Playfair serif display typography) */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif-display tracking-tight leading-[1.1]">
                  Organic Fertilizers
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-300 font-serif-display">
                  For Healthier Crops
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl text-balance">
                Premium 100% organic fertilizers & farm-fresh harvests scientifically formulated to improve soil health, enhance root development, and boost crop yield naturally. Direct from verified rural farmers to urban consumers.
              </p>

              {/* Action Buttons: Explore Products & Contact Us */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#catalog"
                  className="bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={onNavigateToFarmer}
                  className="bg-black/30 hover:bg-black/50 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-lg border border-white/60 backdrop-blur-sm transition-all"
                >
                  Contact Us / Farmer Portal
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex items-center gap-6 pt-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  0% Intermediary Fee
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Govt Land Verified Farmers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Fair-Price APMC Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#0e3b1c] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
              <TrendingUp className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg font-serif-display text-white">
                  Direct Fair-Trade Realization Index
                </h3>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Zero Commission
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl leading-relaxed">
                In traditional mandi auctions, farmers receive only 40-55% of consumer grocery spend. On KisanSetu / Nutrify Organics, 100% of the produce value is transferred directly to the farmer via DBT or instant UPI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-950/70 border border-emerald-700/60 p-3 rounded-xl shrink-0 text-xs">
            <div>
              <span className="text-[10px] text-emerald-300 block uppercase tracking-wider">Farmer Earning</span>
              <span className="text-base font-bold text-emerald-100 font-numeric">+38% Direct</span>
            </div>
            <div className="h-7 w-px bg-emerald-700/60" />
            <div>
              <span className="text-[10px] text-emerald-300 block uppercase tracking-wider">Consumer Savings</span>
              <span className="text-base font-bold text-emerald-100 font-numeric">~20% vs Retail</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Section with Leafy Background Integration */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Controls: Search, Verified Toggle, Sort, Categories */}
        <div className="space-y-4 bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
          {/* Top Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search farm crops, organic bio-nutrients, village, farmer..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Verified Farmer Switch & Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Verified Farmers Only Filter Button */}
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
                  verifiedOnly
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-300' : 'text-emerald-700'}`} />
                <span>{t.filterVerifiedOnly}</span>
                {verifiedOnly && <Check className="w-3 h-3 text-emerald-300" />}
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-stone-300 rounded-xl px-2.5 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium">{t.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort produce by"
                  className="bg-transparent border-none text-xs font-bold text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="rating">{t.sortHighestRated}</option>
                  <option value="distance">{t.sortDistance}</option>
                  <option value="freshness">{t.sortFreshness}</option>
                  <option value="price_low">{t.sortPriceLowHigh}</option>
                  <option value="price_high">{t.sortPriceHighLow}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-stone-100 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with Premium Hover Animation */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white/95 rounded-2xl border border-stone-200 p-8">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif-display">
              No crops found matching your filters
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or uncheck the "Verified Farmers Only" filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setVerifiedOnly(false);
              }}
              className="text-xs text-emerald-800 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 shadow-2xs product-card-premium flex flex-col justify-between overflow-hidden relative"
              >
                <div>
                  {/* Product Card Image (Takes 65-75% visual lead) */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="aspect-[4/3] bg-stone-100 relative overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = document.getElementById(`card-fallback-${product.id}`);
                        if (el) el.style.display = 'flex';
                      }}
                    />
                    <div
                      id={`card-fallback-${product.id}`}
                      style={{ display: 'none' }}
                      className="w-full h-full bg-gradient-to-br from-emerald-50 to-stone-200 flex-col items-center justify-center p-4 text-center"
                    >
                      <Sparkles className="w-8 h-8 text-emerald-700 mb-1" />
                      <span className="font-bold text-xs text-emerald-950">{product.name}</span>
                    </div>

                    {/* Top Corner: Distance to consumer */}
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 font-numeric shadow-xs">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{product.farmDistanceKm} km</span>
                    </div>
                  </div>

                  {/* Product Metadata & Title (Zero-Pill Discipline: Unboxed Text with Separators) */}
                  <div className="p-4 sm:p-5 space-y-2">
                    {/* Quiet Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                      <span>{product.category.replace('_', ' ').toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {product.harvestTime}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-stone-900 font-serif-display hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Farmer Identity & Verified Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="font-medium text-stone-800">{product.farmerName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-500">{product.farmerVillage}</span>
                      {product.farmerVerified ? (
                        <span
                          title="Land & KYC Verified Producer"
                          className="inline-flex items-center gap-0.5 text-emerald-800 font-bold ml-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-[10px] uppercase">Verified</span>
                        </span>
                      ) : null}
                    </div>

                    {/* Customer Rating Stars with Tabular Review Count */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-xs font-bold text-stone-900 font-numeric">{product.rating}</span>
                      <span className="text-[11px] text-stone-400 font-numeric">({product.reviewCount})</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-[11px] text-emerald-800 font-medium truncate max-w-[130px]">
                        {product.organicCertification}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Add to Basket Button */}
                <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-stone-900 font-numeric">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/{product.unit}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 line-through font-numeric block">
                      APMC: ₹{product.mandiPriceBenchmark}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.addToCart}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
