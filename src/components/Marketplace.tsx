import React, { useState, useMemo } from 'react';
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
  Plus
} from 'lucide-react';
import { Product, ProductCategory, LanguageCode, AdCard, SiteStructureConfig, CategoryNode } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';
import { CategoryNavPanel } from './CategoryNavPanel';
import { AdminCard } from './AdminCard';
import { EditProductModal } from './EditProductModal';
import { AdminProductManagerModal } from './AdminProductManagerModal';
import { StorageService } from '../services/storage';

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

  const handleQuickLoginAdmin = () => {
    const success = StorageService.loginAdmin('saivarshak14@gmail.com', '1111');
    if (success && onLoginAsAdmin) {
      onLoginAsAdmin();
    } else if (onOpenAdminLogin) {
      onOpenAdminLogin();
    }
  };

  // Active category handling
  const activeCatId = selectedCategoryId || (currentCategory !== 'all' ? currentCategory : null);

  const handleCategorySelect = (catId: string | null) => {
    if (onSelectCategoryNode) {
      onSelectCategoryNode(catId);
    }
    if (!catId || catId === 'all') {
      onSelectCategory('all');
    }
  };

  // Filter products based on selected category, search, and sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCatId) {
          const lowerCat = activeCatId.toLowerCase();
          const pName = p.name.toLowerCase();
          const pCat = (p.category || '').toLowerCase();
          const pDesc = (p.description || '').toLowerCase();

          if (lowerCat === 'seeds') {
            if (!pName.includes('seed') && !pName.includes('maize') && !pName.includes('paddy') && !pName.includes('wheat')) return false;
          } else if (lowerCat === 'fertilizers') {
            if (!pName.includes('fertilizer') && !pName.includes('urea') && !pName.includes('compost')) return false;
          } else if (lowerCat === 'pesticides') {
            if (!pName.includes('pesticide') && !pName.includes('neem') && !pDesc.includes('pesticide')) return false;
          } else if (lowerCat === 'equipment') {
            if (!pName.includes('tiller') && !pName.includes('equipment') && !pName.includes('tractor')) return false;
          } else if (lowerCat === 'irrigation') {
            if (!pName.includes('pump') && !pName.includes('irrigation') && !pName.includes('water')) return false;
          } else if (lowerCat === 'tools') {
            if (!pName.includes('tool') && !pName.includes('tiller')) return false;
          } else if (lowerCat === 'animal_feed') {
            if (!pName.includes('feed') && !pName.includes('oats') && !pName.includes('maize')) return false;
          } else if (lowerCat === 'organic') {
            if (!pName.includes('organic') && !p.organicCertification.toLowerCase().includes('organic')) return false;
          } else {
            // direct category match
            if (pCat !== lowerCat && p.categoryId !== activeCatId) return false;
          }
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
              src="/src/assets/images/xiva_farm_poster_1791974208276.jpg"
              alt="Fresh from Farmers to Your Home - AgriShop / Xiva.Org"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Subtle Gradient Scrim on Left so text is crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent sm:max-w-xl" />

            {/* Banner Text Content */}
            <div className="relative z-10 space-y-3 max-w-md text-white">
              {/* Green Sub-heading */}
              <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-emerald-300 flex items-center gap-1.5">
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
                  className="inline-flex items-center gap-2 bg-[#007a4d] hover:bg-[#006841] active:bg-[#005736] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer group"
                >
                  <span>Explore Categories</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3 (Desktop: 3 cols): Admin Card + Trust Feature Cards + Bottom Promo */}
        <div className="lg:col-span-3 flex flex-col gap-2.5">
          {/* Admin Card */}
          <AdminCard
            isAdmin={isAdmin}
            onLoginAsAdmin={handleQuickLoginAdmin}
            onLogoutAdmin={onLogoutAdmin || (() => {})}
            onOpenProductManager={() => setIsProductManagerOpen(true)}
            onAddNewProduct={handleAddNewProductModal}
            onNavigateToAdminStudio={onNavigateToAdmin || (() => {})}
            totalProductsCount={products.length}
          />

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
            <div className="relative z-10 space-y-1 max-w-[65%]">
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
              src="/src/assets/images/sustainable_farming_promo_1791974229133.jpg"
              alt="Farmer in organic field"
              className="absolute right-0 bottom-0 top-0 w-36 h-full object-cover object-center rounded-r-2xl"
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
              onClick={onNavigateToAdmin}
              className="inline-flex items-center justify-center gap-1 text-emerald-300 hover:text-white font-bold text-xs py-2 px-3 cursor-pointer transition-colors"
            >
              <span>Admin Studio Section →</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: FEATURED PRODUCTS (Header + 6-Column Card Grid)                 */}
      {/* ========================================================================= */}
      <section id="featured-catalog" className="space-y-4 pt-2">
        {/* Section Header matching Image 1 */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Leaf className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Featured Products
            </h2>
          </div>

          <button
            onClick={() => handleCategorySelect(null)}
            className="text-sm font-semibold text-[#007a4d] hover:text-[#005c3a] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-stone-200 hover:border-emerald-500/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-3 sm:p-4 cursor-pointer relative"
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
                  <div className="relative aspect-square w-full my-2 flex items-center justify-center overflow-hidden rounded-xl bg-stone-50/50">
                    <img
                      src={product.image}
                      alt={localized.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
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
    </div>
  );
};
