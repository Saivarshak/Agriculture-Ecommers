import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Globe,
  Wifi,
  WifiOff,
  ChevronDown
} from 'lucide-react';
import { User, LanguageCode, ProductCategory } from '../types';
import { translations } from '../data/translations';
import { XivaLogo } from './XivaLogo';

interface TopBarProps {
  currentCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onGoHome: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  user: User;
  isAdmin: boolean;
  onOpenAuth: () => void;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenAdminPortal: () => void;
  onOpenOrders: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  isOfflineSimulated: boolean;
  onToggleOffline: () => void;
  pendingSyncCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentCategory,
  onSelectCategory,
  onGoHome,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  user,
  isAdmin,
  onOpenAuth,
  onOpenAdminLogin,
  onLogoutAdmin,
  onOpenAdminPortal,
  onOpenOrders,
  searchQuery,
  onSearchChange,
  language,
  onSelectLanguage,
  isOfflineSimulated,
  onToggleOffline,
  pendingSyncCount
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Exact categories from the PDF table:
  // LOGO — Home - Cereals - Pulses - Vegetables - Fruits - Spices - Exotic - Search Box - Profile - Wishlist - Bag
  const navCategories: { id: ProductCategory; label: string }[] = [
    { id: 'cereals', label: 'Cereals' },
    { id: 'pulses', label: 'Pulses' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'spices', label: 'Spices' },
    { id: 'exotic', label: 'Exotic' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* Top Quiet Utility Strip for Offline/Sync & Language only (No old fake phone/email) */}
      <div className="bg-[#14532d] text-white text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="font-semibold text-white">Xiva.Org</span>
            <span className="text-emerald-500">·</span>
            <span>Farm Fresh Produce Direct to Your Doorstep</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Offline Simulation Control */}
            <button
              onClick={onToggleOffline}
              className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 border transition-colors ${
                isOfflineSimulated
                  ? 'bg-amber-400 text-stone-900 border-amber-300 font-bold'
                  : 'bg-emerald-900/60 text-emerald-200 border-emerald-700/60 hover:bg-emerald-800'
              }`}
            >
              {isOfflineSimulated ? (
                <>
                  <WifiOff className="w-3 h-3 text-stone-900" />
                  <span>Offline ({pendingSyncCount})</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>Online</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative inline-block text-left">
              <select
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                aria-label="Select Language"
                className="appearance-none bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 rounded px-2 py-0.5 pr-4 text-[10px] font-medium cursor-pointer focus:outline-none"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="mr">मराठी</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
              <Globe className="w-2.5 h-2.5 text-emerald-400 absolute right-1 top-1.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (LOGO — Home - Cereals - Pulses - Vegetables - Fruits - Spices - Exotic - Search Box - Profile - Wishlist - Bag) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* 1. LOGO (Xiva.Org 4-Leaf Botanical Emblem) */}
        <button
          onClick={onGoHome}
          className="group flex items-center gap-2 focus:outline-none shrink-0"
          title="Xiva.Org Homepage"
        >
          <XivaLogo layout="horizontal" size="md" showSubtitle={true} />
        </button>

        {/* 2. CATEGORY NAVIGATION LINKS (from PDF: Home, Cereals, Pulses, Vegetables, Fruits, Spices, Exotic) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-stone-700">
          <button
            onClick={onGoHome}
            className={`transition-colors hover:text-emerald-800 py-1 border-b-2 ${
              currentCategory === 'all'
                ? 'border-emerald-700 text-emerald-900 font-bold'
                : 'border-transparent text-stone-700'
            }`}
          >
            Home
          </button>

          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`transition-colors hover:text-emerald-800 py-1 border-b-2 capitalize ${
                currentCategory === cat.id
                  ? 'border-emerald-700 text-emerald-900 font-bold'
                  : 'border-transparent text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* 3. RIGHT CONTROLS: Search Box, Profile, Wishlist, Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Box Trigger & Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-stone-100 rounded-full px-3 py-1.5 border border-stone-300 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-stone-500 shrink-0 mr-2" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search PDF crops..."
                  className="bg-transparent border-none text-xs text-stone-900 w-full focus:outline-none"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors"
                title="Search Box"
                aria-label="Search crops"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Link */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-numeric shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag / Cart Link */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors"
            title="Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#16a34a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-numeric shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown (Customer Auth & Protected Admin Gateway) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                isAdmin
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
              title="Profile & Account"
              aria-label="User Profile"
            >
              <UserIcon className="w-5 h-5" />
              {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />}
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-xs animate-fadeIn"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                {isAdmin ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100 bg-emerald-50/70">
                      <span className="font-bold text-emerald-950 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        Administrator Active
                      </span>
                      <span className="text-[10px] text-stone-500">Authenticated Session</span>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenAdminPortal();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 font-semibold text-stone-800 flex items-center justify-between"
                    >
                      <span>Admin Management Portal</span>
                      <span className="text-[10px] text-emerald-700 font-bold">Edit Crops</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogoutAdmin();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-1.5 border-t border-stone-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out Administrator</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100 text-stone-600">
                      <span className="font-semibold block text-stone-900">{user.name}</span>
                      <span className="text-[10px] text-stone-400">Customer Account</span>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenOrders();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      Track My Orders
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      My Wishlist ({wishlistCount})
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      Customer Sign In / Switch
                    </button>

                    {/* Secure Admin Access Trigger (Requirement: Protected, not permanently exposed) */}
                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenAdminLogin();
                        }}
                        className="w-full text-left px-4 py-1.5 hover:bg-stone-50 text-stone-400 hover:text-emerald-800 text-[11px] flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>Administrator Access</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Category Strip */}
      <div className="flex lg:hidden items-center gap-1 overflow-x-auto px-4 py-2 border-t border-stone-100 bg-stone-50 text-xs font-semibold">
        <button
          onClick={onGoHome}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
            currentCategory === 'all'
              ? 'bg-emerald-800 text-white font-bold'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
        >
          Home
        </button>
        {navCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors capitalize ${
              currentCategory === cat.id
                ? 'bg-emerald-800 text-white font-bold'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </header>
  );
};
