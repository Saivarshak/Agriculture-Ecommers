import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  ShoppingCart,
  Heart,
  UserCheck,
  User as UserIcon,
  ChevronDown,
  ShieldCheck,
  Globe,
  LogOut,
  LogIn,
  X,
  PackageCheck,
  Tractor,
  Sliders,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { User, LanguageCode, ProductCategory, SiteStructureConfig, Product } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';
import { smoothScrollToItem, smoothScrollToCategory } from '../utils/categoryMatcher';
import { XivaLogo } from './XivaLogo';

export interface TopBarProps {
  currentTab: 'marketplace' | 'farmer' | 'admin' | 'orders';
  onSelectTab: (tab: 'marketplace' | 'farmer' | 'admin' | 'orders') => void;
  selectedCategory?: ProductCategory | 'all';
  onSelectCategory?: (cat: ProductCategory | 'all') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  user: User | null;
  isAdmin: boolean;
  onOpenAuth: () => void;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onLogoutUser?: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  siteStructure?: SiteStructureConfig;
  products?: Product[];
  onScrollToProduct?: (productId: string, preferredQuery?: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  selectedCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  user,
  isAdmin,
  onOpenAuth,
  onOpenAdminLogin,
  onLogoutAdmin,
  onLogoutUser,
  language,
  onSelectLanguage,
  searchQuery,
  onSearchChange,
  siteStructure,
  products = [],
  onScrollToProduct
}) => {
  const t = translations[language];
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target as Node)) {
        setShowAdminMenu(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute matching products for live search dropdown
  const matchingProducts = React.useMemo(() => {
    if (!products.length || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products
      .filter((p) => {
        const localized = getProductLocalized(p.id, p.name, p.category, language, p.description, p.unit);
        return (
          p.name.toLowerCase().includes(q) ||
          localized.name.toLowerCase().includes(q) ||
          p.farmerName.toLowerCase().includes(q) ||
          p.farmerVillage.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
        );
      })
      .slice(0, 6);
  }, [products, searchQuery, language]);

  // Handle clicking a searched item from the dropdown: smoothly scroll to that specific card
  const handleSelectSearchedProduct = (product: Product) => {
    setIsSearchFocused(false);
    if (onScrollToProduct) {
      onScrollToProduct(product.id, searchQuery || product.name);
    } else {
      if (currentTab !== 'marketplace') {
        onSelectTab('marketplace');
      }
      if (onSelectCategory) {
        onSelectCategory('all');
      }
      setTimeout(() => {
        smoothScrollToItem(product.id);
      }, 100);
    }
  };

  // Handle pressing Enter or clicking the Search button
  const handleExecuteSearch = (customQuery?: string) => {
    const activeQuery = customQuery !== undefined ? customQuery : searchQuery;
    setIsSearchFocused(false);
    if (currentTab !== 'marketplace') {
      onSelectTab('marketplace');
    }
    if (onSelectCategory) {
      onSelectCategory('all');
    }

    if (customQuery !== undefined) {
      onSearchChange(customQuery);
    }

    // Determine target product to scroll to
    const q = activeQuery.toLowerCase().trim();
    const matches = products.filter((p) => {
      const localized = getProductLocalized(p.id, p.name, p.category, language, p.description, p.unit);
      return (
        p.name.toLowerCase().includes(q) ||
        localized.name.toLowerCase().includes(q) ||
        p.farmerName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });

    if (matches.length > 0) {
      const targetId = matches[0].id;
      if (onScrollToProduct) {
        onScrollToProduct(targetId, activeQuery);
      } else {
        setTimeout(() => {
          smoothScrollToItem(targetId);
        }, 120);
      }
    } else {
      setTimeout(() => {
        smoothScrollToCategory(null);
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* 1. Top Utility Bar (Trust announcement + Language selector) */}
      {(siteStructure?.topAnnouncementEnabled ?? true) && (
        <div className="bg-[#064e3b] text-white py-1 sm:py-1.5 px-4 sm:px-8 lg:px-12 border-b border-[#065f46]">
          <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
            {/* Left: Brand Trust Statement */}
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-white tracking-wide flex items-center gap-1.5 shrink-0">
                <XivaLogo layout="emblem" size="xs" />
                <span className="text-xs sm:text-sm font-bold">Xiva.Org</span>
              </span>
              <span className="text-emerald-400 font-bold">·</span>
              <span className="text-emerald-100 text-xs sm:text-sm font-medium truncate">
                {siteStructure?.topAnnouncementNotice || t.topTrustBar}
              </span>
            </div>

            {/* Right: Language Switcher */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative inline-block text-left">
                <select
                  value={language}
                  onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                  aria-label="Select Language"
                  className="appearance-none bg-emerald-900/95 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/90 rounded-lg px-2.5 py-1 pr-7 text-xs font-semibold cursor-pointer focus:outline-none transition-colors shadow-xs"
                >
                  <option value="en">English (EN)</option>
                  <option value="te">తెలుగు (TE)</option>
                  <option value="hi">हिन्दी (HI)</option>
                  <option value="ta">தமிழ் (TA)</option>
                  <option value="mr">मराठी (MR)</option>
                  <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                </select>
                <Globe className="w-3.5 h-3.5 text-emerald-400 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar (AgriShop / Xiva Branding, Pill Search with Green Action Button, Account, Wishlist, Cart) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 h-17 sm:h-19 flex items-center justify-between gap-4 sm:gap-8">
        {/* Left: AgriShop Logo with Leaves & Subtitle */}
        <button
          onClick={() => onSelectTab('marketplace')}
          className="group flex items-center gap-2.5 text-left focus:outline-none shrink-0 cursor-pointer"
          title="AgriShop - Grow Better • Farm Smarter"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 overflow-hidden">
            {siteStructure?.logoImage && siteStructure.logoImage !== '/src/assets/images/xiva_logo.svg' ? (
              <img src={siteStructure.logoImage} alt="Brand Logo" className="w-8 h-8 object-contain" />
            ) : (
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-xs">
                <path d="M20 20C20 10 12 4 4 6C3 14 9 21 20 20Z" fill="#007a4d" />
                <path d="M20 20C20 9 29 4 36 6C37 14 31 21 20 20Z" fill="#007a4d" opacity="0.9" />
                <path d="M20 20C13 25 8 32 8 38C17 38 22 31 20 20Z" fill="#059669" opacity="0.85" />
                <path d="M20 20C27 25 32 32 32 38C23 38 18 31 20 20Z" fill="#059669" opacity="0.85" />
              </svg>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none">
              AgriShop
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 tracking-wide mt-1">
              Grow Better • Farm Smarter
            </span>
          </div>
        </button>

        {/* Center: Search Bar with Pill Input & Integrated Green Search Button + Live Scroll-To-Item Dropdown */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-6 relative" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (!isSearchFocused) setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleExecuteSearch();
                } else if (e.key === 'Escape') {
                  setIsSearchFocused(false);
                }
              }}
              placeholder="Search for products, seeds, fertilizers, tools..."
              className="w-full bg-white text-xs sm:text-sm text-stone-900 rounded-full pl-5 pr-14 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] focus:ring-2 focus:ring-[#007a4d]/20 transition-all placeholder:text-stone-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange('');
                  setIsSearchFocused(false);
                }}
                className="absolute right-12 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => handleExecuteSearch()}
              className="absolute right-1 w-9 h-8 sm:w-10 sm:h-8.5 bg-[#007a4d] hover:bg-[#006841] text-white rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-xs group"
              aria-label="Search"
              title="Search and scroll to item"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Live Search Results Dropdown with Direct Smooth-Scroll to Respective Items */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 animate-fadeIn max-h-[460px] overflow-y-auto">
              {searchQuery.trim() ? (
                <div>
                  <div className="px-4 py-2 flex items-center justify-between text-xs border-b border-stone-100 bg-emerald-50/50">
                    <span className="font-bold text-[#007a4d] flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span>Matching Products ({matchingProducts.length})</span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Click any item to scroll directly to it
                    </span>
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div className="divide-y divide-stone-100">
                      {matchingProducts.map((p) => {
                        const localized = getProductLocalized(
                          p.id,
                          p.name,
                          p.category,
                          language,
                          p.description,
                          p.unit
                        );
                        return (
                          <button
                            key={p.id}
                            onClick={() => handleSelectSearchedProduct(p)}
                            className="w-full text-left px-4 py-2.5 hover:bg-emerald-50/60 transition-colors flex items-center gap-3 group cursor-pointer"
                          >
                            <img
                              src={p.image}
                              alt={localized.name}
                              className="w-10 h-10 object-cover rounded-xl bg-stone-50 border border-stone-200 shrink-0 group-hover:border-emerald-300 transition-colors"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#007a4d] truncate transition-colors">
                                  {localized.name}
                                </h4>
                                {p.badge && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 shrink-0">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                                {p.category.toUpperCase()} • {p.farmerVillage || p.farmerName}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 text-right">
                              <span className="text-xs sm:text-sm font-black text-stone-900 font-numeric">
                                ₹{p.price.toLocaleString('en-IN')}
                              </span>
                              <div className="w-7 h-7 rounded-lg bg-emerald-100/60 text-[#007a4d] flex items-center justify-center group-hover:bg-[#007a4d] group-hover:text-white transition-all shadow-2xs">
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      {/* View all search results button */}
                      <button
                        onClick={() => handleExecuteSearch()}
                        className="w-full text-center px-4 py-2.5 bg-stone-50 hover:bg-emerald-50 text-xs font-bold text-[#007a4d] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Scroll down to all matching products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-stone-500 space-y-1.5">
                      <p className="text-xs font-bold text-stone-700">No products matching "{searchQuery}"</p>
                      <p className="text-[11px]">Try searching for seeds, fertilizers, tractor, tiller, or neem oil.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#007a4d]" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Seeds',
                      'Fertilizers',
                      'Pesticides',
                      'Farm Equipment',
                      'Irrigation',
                      'Tools & Accessories',
                      'Animal Feed',
                      'Organic Products'
                    ].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleExecuteSearch(tag)}
                        className="text-xs px-2.5 py-1 rounded-full bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-[#007a4d] border border-stone-200 hover:border-emerald-200 transition-colors cursor-pointer font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Admin, Account, Wishlist, Cart */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-stone-700">
          {/* Unified Admin & Account Menu (Only 'Admin' button in TopBar) */}
          <div className="relative" ref={adminMenuRef}>
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className={`flex items-center gap-1.5 font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-[#007a4d] text-white shadow-xs'
                  : isAdmin
                  ? 'bg-emerald-50 text-[#007a4d] hover:bg-emerald-100 border border-emerald-200'
                  : 'text-stone-700 hover:text-[#007a4d] hover:bg-stone-100'
              }`}
              title="Administrator & Account Controls"
              aria-expanded={showAdminMenu}
              aria-haspopup="true"
            >
              <ShieldCheck className={`w-4 h-4 ${currentTab === 'admin' ? 'text-white' : 'text-[#007a4d]'}`} />
              <span>Admin</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showAdminMenu ? 'rotate-180' : ''
                } ${currentTab === 'admin' ? 'text-white/80' : 'text-stone-400'}`}
              />
            </button>

            {/* Unified Admin & Account Dropdown Menu */}
            {showAdminMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 text-sm animate-fadeIn">
                {isAdmin ? (
                  <>
                    <div className="px-5 py-3 border-b border-stone-100 bg-emerald-50/70 text-emerald-950">
                      <span className="font-bold flex items-center gap-2 text-emerald-900">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Administrator Access
                      </span>
                      <span className="text-xs text-emerald-700 block mt-0.5">
                        Verified Admin Session Active
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('admin');
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-stone-50 font-semibold text-stone-800 flex items-center gap-3 cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-emerald-700" />
                      <span>Admin Management Studio</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('marketplace');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-stone-500" />
                      <span>View Storefront</span>
                    </button>

                    <div className="border-t border-stone-100 my-1" />

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('orders');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4 text-stone-500" />
                      <span>My Orders & Harvest Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('farmer');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <Tractor className="w-4 h-4 text-stone-500" />
                      <span>Farmer Producer Hub</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onLogoutAdmin();
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2.5 border-t border-stone-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out Admin</span>
                    </button>
                  </>
                ) : user ? (
                  <>
                    <div className="px-5 py-3 border-b border-stone-100 bg-emerald-50/70 text-emerald-950">
                      <span className="font-bold text-emerald-900 block truncate">
                        {user.name}
                      </span>
                      <span className="text-xs text-emerald-700 block mt-0.5 capitalize">
                        {user.role} Account
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onOpenAdminLogin();
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-emerald-50 text-[#007a4d] font-bold flex items-center gap-3 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Open Admin Portal</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('orders');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4 text-stone-500" />
                      <span>My Orders & Harvest Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onSelectTab('farmer');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <Tractor className="w-4 h-4 text-stone-500" />
                      <span>Farmer Producer Hub</span>
                    </button>

                    {onLogoutUser && (
                      <button
                        onClick={() => {
                          setShowAdminMenu(false);
                          onLogoutUser();
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2.5 border-t border-stone-100 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="px-5 py-3 border-b border-stone-100 bg-emerald-50/70">
                      <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                        <ShieldCheck className="w-4 h-4 text-[#007a4d]" />
                        Admin & Account Access
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Manage products or access your account
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onOpenAdminLogin();
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-emerald-50 font-bold text-[#007a4d] flex items-center gap-2.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Sign in as Admin</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAdminMenu(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 font-medium flex items-center gap-2.5 cursor-pointer border-t border-stone-100"
                    >
                      <LogIn className="w-4 h-4 text-stone-500" />
                      <span>User / Farmer Sign In</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button with Counter Badge */}
          <button
            onClick={onOpenWishlist}
            className="flex items-center gap-2 hover:text-[#007a4d] font-semibold text-sm cursor-pointer transition-colors"
            title={t.myWishlist}
            aria-label="Wishlist"
          >
            <div className="relative flex items-center">
              <Heart className="w-5 h-5 text-stone-600 hover:text-[#007a4d] transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-[#007a4d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-numeric">
                {wishlistCount}
              </span>
            </div>
            <span className="hidden sm:inline">Wishlist</span>
          </button>

          {/* Shopping Cart Button with Counter Badge */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 hover:text-[#007a4d] font-semibold text-sm cursor-pointer transition-colors"
            title={t.shoppingBag}
            aria-label="Shopping Cart"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-5 h-5 text-stone-600 hover:text-[#007a4d] transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-[#007a4d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-numeric">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
