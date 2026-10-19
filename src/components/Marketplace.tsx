import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  Search,
  Sprout,
  ArrowRight,
  Heart,
  ArrowUpDown,
  Truck,
  Headphones,
  CheckCircle2,
  Lock,
  Leaf,
  Edit2,
  Plus,
  RotateCcw,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Product, ProductCategory, LanguageCode, AdCard, SiteStructureConfig, CategoryNode } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';
import { CategoryNavPanel } from './CategoryNavPanel';
import { EditProductModal } from './EditProductModal';
import { AdminProductManagerModal } from './AdminProductManagerModal';
import { AdminImageManagerModal } from './AdminImageManagerModal';
import { StorageService } from '../services/storage';
import { SHOP_CATEGORIES, productMatchesCategory, smoothScrollToCategory, smoothScrollToItem } from '../utils/categoryMatcher';

export interface MarketplaceProps {
  products: Product[];
  categories?: CategoryNode[];
  selectedCategoryId?: string | null;
  onSelectCategoryNode?: (catId: string | null) => void;
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
  isAdmin?: boolean;
  onLoginAsAdmin?: () => void;
  onLogoutAdmin?: () => void;
  onNavigateToAdmin?: () => void;
  onRefreshProducts?: () => void;
  onOpenAdminLogin?: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  categories = [],
  selectedCategoryId = null,
  onSelectCategoryNode,
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
  onNavigateToFarmer,
  isAdmin = false,
  onLoginAsAdmin,
  onLogoutAdmin,
  onNavigateToAdmin,
  onRefreshProducts,
  onOpenAdminLogin
}) => {
  const t = translations[language];

  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high'>('rating');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductManagerOpen, setIsProductManagerOpen] = useState(false);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Direct Image Management Modal state
  const [imageTargetProduct, setImageTargetProduct] = useState<Product | null>(null);
  const [isGlobalImageManagerOpen, setIsGlobalImageManagerOpen] = useState(false);

  const handleSaveProduct = (updated: Product) => {
    StorageService.updateProduct(updated);
    if (onRefreshProducts) {
      onRefreshProducts();
    }
    setAdminNotice(`"${updated.name}" updated successfully!`);
    setTimeout(() => setAdminNotice(null), 3500);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to remove "${productName}" from the store catalog?`)) {
      StorageService.deleteProduct(productId);
      if (onRefreshProducts) {
        onRefreshProducts();
      }
      setAdminNotice(`"${productName}" removed from store catalog.`);
      setTimeout(() => setAdminNotice(null), 3500);
    }
  };

  const handleAddNewProductModal = () => {
    const blankProduct: Product = {
      id: `prod_${Date.now()}`,
      farmerId: 'farm_01',
      farmerName: 'Verified Organic Producer',
      farmerVillage: 'Mandya Valley',
      farmerVerified: true,
      name: '',
      category: 'vegetables',
      price: 50,
      originalPrice: 60,
      discountPercent: 16,
      unit: 'kg',
      stock: 100,
      harvestTime: 'Fresh morning harvest',
      harvestDate: new Date().toISOString().split('T')[0],
      farmDistanceKm: 15,
      organicCertification: 'NPOP Certified Organic',
      image: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg',
      description: 'Organically cultivated produce with natural compost and zero synthetic chemicals.',
      nutrition: 'Rich in essential vitamins, dietary fibre and natural minerals.',
      rating: 5.0,
      reviewCount: 0,
      badge: 'Organic'
    };
    setEditingProduct(blankProduct);
  };

  // Active category handling
  const activeCatId = selectedCategoryId || (currentCategory !== 'all' ? currentCategory : null);

  const activeCategoryObj = useMemo(() => {
    if (!activeCatId || activeCatId === 'all') return null;
    return SHOP_CATEGORIES.find((c) => c.id.toLowerCase() === activeCatId.toLowerCase()) || null;
  }, [activeCatId]);

  const handleCategorySelect = (catId: string | null) => {
    if (onSelectCategoryNode) {
      onSelectCategoryNode(catId);
    }
    if (!catId || catId === 'all') {
      onSelectCategory('all');
    }
    setTimeout(() => {
      smoothScrollToCategory(catId);
    }, 50);
  };

  // Real-time category product counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SHOP_CATEGORIES.forEach((cat) => {
      counts[cat.id] = products.filter((p) => productMatchesCategory(p, cat.id)).length;
    });
    return counts;
  }, [products]);

  // Filter products based on selected category, search, and sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCatId && activeCatId !== 'all') {
          if (!productMatchesCategory(p, activeCatId)) return false;
        }

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
        return 0;
      });
  }, [products, activeCatId, searchQuery, sortBy, language]);

  // Color helper for badges matching screenshot
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Popular':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Organic':
        return 'bg-emerald-50 text-[#007a4d] border-emerald-300';
      case 'Heavy Duty':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Eco Friendly':
        return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'Top Rated':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-5 flex flex-col gap-6 relative z-10 animate-fadeIn">
      {/* ========================================================================= */}
      {/* TOP SECTION: 3-COLUMN GRID (Category Menu + Center Hero Banner + Features) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* COLUMN 1 (Desktop: 3 cols): "Shop by Category" Vertical Menu */}
        <div className="lg:col-span-3 flex flex-col">
          <CategoryNavPanel
            categories={categories}
            activeCategoryId={activeCatId}
            onSelectCategory={handleCategorySelect}
            products={products}
            language={language}
            className="h-full flex-1"
          />
        </div>

        {/* COLUMN 2 (Desktop: 6 cols): Main Hero Banner with Poster Background */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-sm flex-1 min-h-[380px] lg:min-h-[420px] flex items-center p-6 sm:p-10">
            {/* Full Poster Image Background */}
            <img
              src={siteStructure?.heroBgImage || "/src/assets/images/xiva_farm_poster_1791974208276.jpg"}
              alt="Fresh from Farmers to Your Home - AgriShop / Xiva.Org"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Admin Change Hero Banner Image Button */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageTargetProduct(null);
                  setIsGlobalImageManagerOpen(true);
                }}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/65 hover:bg-black/85 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 backdrop-blur-xs cursor-pointer transition-all shadow-md group/btn"
                title="Admin: Update Hero Banner Image"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                <span>Change Banner Image</span>
              </button>
            )}

            {/* Gradient Scrim on Left so text is crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

            {/* Banner Text Content: Perfectly Aligned Typography */}
            <div className="relative z-10 space-y-3.5 max-w-lg text-white">
              {/* Green Sub-heading */}
              <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>QUALITY INPUTS • HIGHER YIELDS</span>
              </p>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm font-sans">
                Everything Your Farm Needs, In One Place
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
                Premium seeds, quality fertilizers, crop protection and more — for a healthier harvest.
              </p>

              {/* Call to action button */}
              <div className="pt-2">
                <a
                  href="#featured-catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToCategory(null);
                  }}
                  className="inline-flex items-center gap-2 bg-[#007a4d] hover:bg-[#006841] active:bg-[#005736] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer group"
                >
                  <span>Explore Categories</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3 (Desktop: 3 cols): Trust Feature Cards + Bottom Promo */}
        <div className="lg:col-span-3 flex flex-col gap-2.5">
          {/* 1. Free Delivery */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-tight">Free Delivery</h4>
              <p className="text-xs text-stone-500 mt-0.5">On orders above ₹999</p>
            </div>
          </div>

          {/* 2. Secure Payments */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-tight">Secure Payments</h4>
              <p className="text-xs text-stone-500 mt-0.5">100% Safe & Encrypted</p>
            </div>
          </div>

          {/* 3. Quality Products */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-tight">Quality Products</h4>
              <p className="text-xs text-stone-500 mt-0.5">Trusted by Farmers</p>
            </div>
          </div>

          {/* 4. 24/7 Support */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-tight">24/7 Support</h4>
              <p className="text-xs text-stone-500 mt-0.5">We're here to help</p>
            </div>
          </div>

          {/* 5. Bottom Promo Card: Better Farming for a Brighter Future */}
          <div className="bg-[#eaf7f0] rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex-1 flex flex-col justify-between relative overflow-hidden min-h-[110px]">
            {/* Soft gradient to protect text legibility against image */}
            <div className="absolute inset-y-0 left-0 right-24 bg-gradient-to-r from-[#eaf7f0] via-[#eaf7f0]/95 to-transparent z-5 pointer-events-none" />

            <div className="relative z-10 space-y-1 max-w-[58%] pr-2">
              <div className="flex items-center gap-1.5 text-[#007a4d] mb-1">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-stone-900 leading-snug">
                Better Farming for a Brighter Future
              </h4>
              <p className="text-[11px] text-stone-600 leading-normal">
                Sustainable solutions for modern agriculture.
              </p>
            </div>

            {/* Embedded Landscape Image */}
            <img
              src={siteStructure?.promoCardImage || "/src/assets/images/sustainable_farming_promo_1791974229133.jpg"}
              alt="Farmer in organic field"
              className="absolute right-0 bottom-0 top-0 w-32 h-full object-cover object-center rounded-r-2xl"
            />
          </div>
        </div>
      </div>

      {/* Admin Live Feedback Toast */}
      {adminNotice && (
        <div className="bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-600 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{adminNotice}</span>
          </div>
          <button
            onClick={() => setAdminNotice(null)}
            className="text-emerald-200 hover:text-white p-1 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Admin Mode Top Banner */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-2xl p-3.5 sm:p-4 border border-emerald-600/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white">
                  Administrator Live Edit Mode
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Hover or view any product below to update its name, price, stock, discount, or badge directly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setIsProductManagerOpen(true)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Catalog Editor ({products.length})</span>
            </button>
            <button
              onClick={handleAddNewProductModal}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3.5 rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-300" />
              <span>New Crop</span>
            </button>
            <button
              onClick={() => {
                setImageTargetProduct(null);
                setIsGlobalImageManagerOpen(true);
              }}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-bold text-xs py-2 px-3 rounded-xl border border-emerald-600/70 transition-colors shadow-xs cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Image Manager</span>
            </button>
            <button
              onClick={onNavigateToAdmin}
              className="inline-flex items-center justify-center gap-1 text-emerald-300 hover:text-white font-bold text-xs py-2 px-3 cursor-pointer transition-colors"
            >
              <span>Admin Studio Section →</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: PRODUCT RESULTS CATALOG (Header + Category Pills + Card Grid)    */}
      {/* ========================================================================= */}
      <section
        id={activeCatId ? `category-${activeCatId}` : 'featured-catalog'}
        className="space-y-4 pt-2 scroll-mt-24 relative"
      >
        {/* Invisible anchor points for all 8 categories so every category has its unique HTML ID */}
        <div id="featured-catalog" className="scroll-mt-24 pointer-events-none" />
        {SHOP_CATEGORIES.map((cat) => (
          <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24 pointer-events-none" />
        ))}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-stone-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-2xs">
              {searchQuery.trim() ? <Search className="w-4 h-4 text-[#007a4d]" /> : <Leaf className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  {searchQuery.trim()
                    ? `Search Results`
                    : activeCategoryObj
                    ? `${activeCategoryObj.name}`
                    : 'Featured Products'}
                </h2>
                {searchQuery.trim() ? (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#007a4d] border border-emerald-300">
                    "{searchQuery}" ({filteredProducts.length})
                  </span>
                ) : activeCategoryObj ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#007a4d] border border-emerald-300">
                    Active Filter
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {searchQuery.trim()
                  ? `Found ${filteredProducts.length} items matching your search. Click any item to jump directly to it.`
                  : activeCategoryObj
                  ? `Showing ${filteredProducts.length} verified products in ${activeCategoryObj.name}`
                  : `Showing all ${filteredProducts.length} agricultural products directly from farmers`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            {searchQuery.trim() && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Search</span>
              </button>
            )}
            {activeCatId ? (
              <button
                onClick={() => handleCategorySelect(null)}
                className="text-xs sm:text-sm font-bold text-[#007a4d] hover:text-[#005c3a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Reset category filter and restore all products"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Category</span>
              </button>
            ) : !searchQuery.trim() && (
              <button
                onClick={() => handleCategorySelect(null)}
                className="text-xs sm:text-sm font-semibold text-[#007a4d] hover:text-[#005c3a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All {products.length} Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Searched Items Quick Jump Bar - Smoothly scroll to respective items */}
        {searchQuery.trim() && filteredProducts.length > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none animate-fadeIn">
            <span className="text-xs font-bold text-[#007a4d] shrink-0 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Scroll to item:</span>
            </span>
            <div className="flex items-center gap-2 flex-nowrap">
              {filteredProducts.slice(0, 8).map((p) => (
                <button
                  key={p.id}
                  onClick={() => smoothScrollToItem(p.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-emerald-100/80 text-stone-800 hover:text-[#007a4d] border border-emerald-200 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shadow-2xs cursor-pointer group"
                  title={`Jump to ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-4 h-4 object-cover rounded-sm shrink-0"
                  />
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">{p.name}</span>
                  <span className="text-[10px] text-emerald-700 font-bold font-numeric">
                    ₹{p.price}
                  </span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#007a4d] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Responsive Quick Category Filter Pills Bar (Works across Desktop, Tablet, Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              !activeCatId || activeCatId === 'all'
                ? 'bg-[#007a4d] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All ({products.length})
          </button>
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = activeCatId === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                id={`pill-cat-${cat.id}`}
                onClick={() => handleCategorySelect(isSelected ? null : cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#007a4d] text-white shadow-xs ring-2 ring-[#007a4d]/20'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-numeric font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid: 6 columns on large screens */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 max-w-md mx-auto space-y-3">
            <Sprout className="w-12 h-12 text-[#007a4d] mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-stone-900">No items found</h3>
            <p className="text-xs text-stone-500">
              No products found in this category. Try resetting the category filter.
            </p>
            <button
              onClick={() => {
                handleCategorySelect(null);
                onSearchChange('');
              }}
              className="bg-[#007a4d] hover:bg-[#006841] text-white font-bold text-xs py-2 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const localized = getProductLocalized(
                product.id,
                product.name,
                product.category,
                language,
                product.description,
                product.unit
              );

              // Calculate discount percent and strikethrough price if not present
              const origPrice = product.originalPrice || Math.round(product.price * 1.15);
              const discPct =
                product.discountPercent || Math.max(5, Math.round(((origPrice - product.price) / origPrice) * 100));
              const badgeLabel = product.badge || (product.farmerVerified ? 'Organic' : 'Top Rated');

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  data-product-id={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-stone-200 hover:border-emerald-500/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-3 sm:p-4 cursor-pointer relative scroll-mt-28"
                >
                  {/* Top: Wishlist Heart Button & Admin Edit Badge */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getBadgeStyle(badgeLabel)}`}
                      >
                        {badgeLabel}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-bold cursor-pointer transition-colors shadow-xs"
                          title="Admin: Edit this product"
                        >
                          <Edit2 className="w-2.5 h-2.5" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="w-7 h-7 rounded-full bg-stone-50 hover:bg-rose-50 text-stone-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-400'}`}
                      />
                    </button>
                  </div>

                  {/* Product Image (Centered on clean white) */}
                  <div className="relative aspect-square w-full my-2 flex items-center justify-center overflow-hidden rounded-xl bg-stone-50/50 group/img">
                    <img
                      src={product.image}
                      alt={localized.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageTargetProduct(product);
                        }}
                        className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded-lg bg-black/75 hover:bg-black/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-md transition-all z-20 cursor-pointer"
                        title="Admin: Change product image"
                      >
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>Change</span>
                      </button>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 mt-auto">
                    {/* Title */}
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#007a4d] transition-colors line-clamp-1">
                      {localized.name}
                    </h3>

                    {/* Star Rating & Review Count */}
                    <div className="flex items-center text-xs text-stone-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <span className="font-bold text-stone-800 ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-stone-400 ml-1">
                        ({product.reviewCount || 45})
                      </span>
                    </div>

                    {/* Price Row: Current, Strikethrough, Discount % */}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-base sm:text-lg font-black text-stone-900 font-numeric">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {origPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through font-numeric">
                          ₹{origPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {discPct > 0 && (
                        <span className="text-[11px] font-bold text-[#007a4d]">
                          {discPct}% OFF
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: If admin, show both Edit and Add to Cart */}
                    {isAdmin ? (
                      <div className="grid grid-cols-2 gap-1.5 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                          className="flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs py-2 px-2 rounded-xl transition-colors shadow-xs cursor-pointer"
                          title="Admin: Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1);
                          }}
                          className="w-full bg-[#007a4d] hover:bg-[#006841] text-white font-semibold text-xs py-2 px-2 rounded-xl transition-colors text-center shadow-xs cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product, 1);
                        }}
                        className="w-full bg-[#007a4d] hover:bg-[#006841] active:bg-[#005736] text-white font-semibold text-xs sm:text-sm py-2 px-3 rounded-xl transition-colors text-center shadow-xs cursor-pointer mt-1"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Admin Product Manager Catalog Modal */}
      <AdminProductManagerModal
        isOpen={isProductManagerOpen}
        onClose={() => setIsProductManagerOpen(false)}
        products={products}
        onEditProduct={(p) => {
          setIsProductManagerOpen(false);
          setEditingProduct(p);
        }}
        onAddNewProduct={handleAddNewProductModal}
        onDeleteProduct={handleDeleteProduct}
        onNavigateToAdminStudio={onNavigateToAdmin || (() => {})}
      />

      {/* Admin Image Manager Modal (For Product or Global Banner) */}
      {(imageTargetProduct || isGlobalImageManagerOpen) && (
        <AdminImageManagerModal
          isOpen={Boolean(imageTargetProduct || isGlobalImageManagerOpen)}
          targetProduct={imageTargetProduct}
          targetImageId={imageTargetProduct ? `img_prod_${imageTargetProduct.id}` : 'img_hero_main'}
          onClose={() => {
            setImageTargetProduct(null);
            setIsGlobalImageManagerOpen(false);
          }}
          onImageSaved={() => {
            if (onRefreshProducts) onRefreshProducts();
          }}
        />
      )}
    </div>
  );
};
