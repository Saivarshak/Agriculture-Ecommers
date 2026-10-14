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
  Sliders
} from 'lucide-react';
import { User, LanguageCode, ProductCategory, SiteStructureConfig } from '../types';
import { translations } from '../data/translations';
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
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
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
  siteStructure
}) => {
  const t = translations[language];
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-xs">
              <path d="M20 20C20 10 12 4 4 6C3 14 9 21 20 20Z" fill="#007a4d" />
              <path d="M20 20C20 9 29 4 36 6C37 14 31 21 20 20Z" fill="#007a4d" opacity="0.9" />
              <path d="M20 20C13 25 8 32 8 38C17 38 22 31 20 20Z" fill="#059669" opacity="0.85" />
              <path d="M20 20C27 25 32 32 32 38C23 38 18 31 20 20Z" fill="#059669" opacity="0.85" />
            </svg>
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

        {/* Center: Search Bar with Pill Input & Integrated Green Search Button */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for products, seeds, fertilizers, tools..."
              className="w-full bg-white text-xs sm:text-sm text-stone-900 rounded-full pl-5 pr-14 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] focus:ring-2 focus:ring-[#007a4d]/20 transition-all placeholder:text-stone-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-12 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => {}}
              className="absolute right-1 w-9 h-8 sm:w-10 sm:h-8.5 bg-[#007a4d] hover:bg-[#006841] text-white rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Admin, Account, Wishlist, Cart */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-stone-700">
          {/* Admin Section Button */}
          <button
            onClick={() => {
              if (isAdmin) {
                onSelectTab('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`flex items-center gap-1.5 font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'admin'
                ? 'bg-[#007a4d] text-white shadow-xs'
                : isAdmin
                ? 'bg-emerald-50 text-[#007a4d] hover:bg-emerald-100 border border-emerald-200'
                : 'text-stone-700 hover:text-[#007a4d] hover:bg-stone-100'
            }`}
            title="Admin Section & Product Management"
          >
            <ShieldCheck className="w-4 h-4 text-[#007a4d]" />
            <span className="hidden sm:inline">Admin</span>
            {isAdmin && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {/* Account Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => {
                if (!user && !isAdmin) {
                  onOpenAuth();
                } else {
                  setShowProfileMenu(!showProfileMenu);
                }
              }}
              className="flex items-center gap-1.5 hover:text-[#007a4d] font-semibold text-sm cursor-pointer transition-colors"
              aria-expanded={showProfileMenu}
              aria-haspopup="true"
            >
              <UserIcon className="w-5 h-5 text-stone-600" />
              <span className="hidden sm:inline">
                {isAdmin ? 'Admin' : user ? user.name.split(' ')[0] : 'Account'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 text-sm animate-fadeIn">
                {isAdmin ? (
                  <>
                    <div className="px-5 py-3 border-b border-stone-100 bg-emerald-50/70 text-emerald-950">
                      <span className="font-bold flex items-center gap-2 text-emerald-900">
                        <ShieldCheck className="w-4.5 h-4.5 text-emerald-700" />
                        Administrator Access
                      </span>
                      <span className="text-xs text-emerald-700 block mt-0.5">
                        saivarshak14@gmail.com
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('admin');
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-stone-50 font-semibold text-stone-800 flex items-center gap-3 cursor-pointer"
                    >
                      <Sliders className="w-4.5 h-4.5 text-emerald-700" />
                      <span>Admin Management Studio</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('marketplace');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <ShoppingBag className="w-4.5 h-4.5 text-stone-500" />
                      <span>View Storefront</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogoutAdmin();
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2.5 border-t border-stone-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : user ? (
                  <>
                    <div className="px-5 py-3 border-b border-stone-100 bg-emerald-50/70 text-emerald-950">
                      <span className="font-bold text-emerald-900 block truncate">
                        {user.name}
                      </span>
                      <span className="text-xs text-emerald-700 block mt-0.5 truncate">
                        {user.email}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('orders');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <PackageCheck className="w-4.5 h-4.5 text-stone-500" />
                      <span>My Orders & Harvest Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('farmer');
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-stone-50 text-stone-700 flex items-center gap-3 cursor-pointer"
                    >
                      <Tractor className="w-4.5 h-4.5 text-stone-500" />
                      <span>Farmer Producer Hub</span>
                    </button>

                    {onLogoutUser && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogoutUser();
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2.5 border-t border-stone-100 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </>
                ) : null}
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
