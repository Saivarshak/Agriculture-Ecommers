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
  Check
} from 'lucide-react';
import { Product, LanguageCode, User } from '../types';
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
          // Compare harvest timestamps or dates
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
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 border border-stone-200 shadow-sm bg-stone-900">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[460px] w-full overflow-hidden">
          <img
            src="/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg"
            alt="Lush organic farm at sunrise"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 scale-105 hover:scale-100 transition-transform duration-1000"
          />
          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Harvest · 0% Intermediary Margin · 100% to Rural Farmers</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-serif-display leading-tight text-balance">
              {t.heroHeadline}
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 mt-3 max-w-xl leading-relaxed text-balance">
              {t.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="#catalog"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <span>{t.exploreProduce}</span>
                <span aria-hidden="true">↓</span>
              </a>

              <button
                onClick={onNavigateToFarmer}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs py-2.5 px-4 rounded-xl border border-white/20 transition-colors"
              >
                {t.farmerDashboardBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* APMC Mandi Fair-Price Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-white shrink-0 mt-0.5">
              <TrendingUp className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-serif-display text-white">
                  Direct Fair-Trade Realization Index
                </h3>
                <span className="text-[11px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                  Zero Commission
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl leading-relaxed">
                In traditional mandi auctions, farmers receive only 40-55% of your grocery spend. On KisanSetu, 100% of the produce value is transferred directly to the farmer via DBT/UPI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-950/60 border border-emerald-700/50 p-3 rounded-xl shrink-0 text-xs">
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

      {/* Main Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Controls: Search, Verified Toggle, Sort, Categories */}
        <div className="space-y-4">
          {/* Top Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search farm crops, vegetables, village name, farmer..."
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

          {/* Interactive Category Tabs (Buttons, not pills) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200">
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

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8">
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
                className="group bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between overflow-hidden"
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
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
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
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 font-numeric">
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
