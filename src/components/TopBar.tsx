import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  UserCheck,
  ShieldCheck,
  Globe,
  LogOut,
  X,
  ChevronDown
} from 'lucide-react';
import { User, LanguageCode, ProductCategory } from '../types';
import { translations } from '../data/translations';
import { XivaLogo } from './XivaLogo';

export interface TopBarProps {
  currentTab: 'marketplace' | 'farmer' | 'admin' | 'orders';
  onSelectTab: (tab: 'marketplace' | 'farmer' | 'admin' | 'orders') => void;
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  user: User;
  isAdmin: boolean;
  onOpenAuth: () => void;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
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
  language,
  onSelectLanguage,
  searchQuery,
  onSearchChange
}) => {
  const t = translations[language];
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* 1. Top Green Utility Header */}
      <div className="bg-[#064e3b] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#065f46]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand Trust Statement */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide flex items-center gap-1.5">
              <XivaLogo layout="emblem" size="xs" />
              <span>Xiva.Org</span>
            </span>
            <span className="text-emerald-500">·</span>
            <span className="text-emerald-200 text-[11px] hidden sm:inline">
              {t.topTrustBar}
            </span>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative inline-block text-left">
              <select
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                aria-label="Select Language"
                className="appearance-none bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 rounded px-2.5 py-0.5 pr-6 text-[11px] font-medium cursor-pointer focus:outline-none"
              >
                <option value="en">English (EN)</option>
                <option value="te">తెలుగు (TE)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="mr">मराठी (MR)</option>
                <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              </select>
              <Globe className="w-3 h-3 text-emerald-400 absolute right-1.5 top-1.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Brand Identity with Xiva.Org Logo */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onSelectTab('marketplace');
          }}
          className="group flex items-center text-left focus:outline-none shrink-0"
          title="Xiva.Org - Agriculture Platform"
        >
          <XivaLogo layout="horizontal" size="md" showSubtitle={true} subtitleText={t.tagline} />
        </button>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectTab('marketplace');
            }}
            className={`transition-colors hover:text-emerald-800 py-1 border-b-2 ${
              currentTab === 'marketplace'
                ? 'text-emerald-800 font-bold border-emerald-700'
                : 'border-transparent text-stone-600'
            }`}
          >
            {t.navMarketplace}
          </button>
          <button
            onClick={() => onSelectTab('farmer')}
            className={`transition-colors hover:text-emerald-800 py-1 border-b-2 ${
              currentTab === 'farmer'
                ? 'text-emerald-800 font-bold border-emerald-700'
                : 'border-transparent text-stone-600'
            }`}
          >
            {t.navFarmerDashboard}
          </button>
          <button
            onClick={() => {
              if (isAdmin) {
                onSelectTab('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`transition-colors hover:text-emerald-800 py-1 border-b-2 flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'text-emerald-800 font-bold border-emerald-700'
                : 'border-transparent text-stone-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{t.navAdminVerification}</span>
          </button>
          <button
            onClick={() => onSelectTab('orders')}
            className={`transition-colors hover:text-emerald-800 py-1 border-b-2 ${
              currentTab === 'orders'
                ? 'text-emerald-800 font-bold border-emerald-700'
                : 'border-transparent text-stone-600'
            }`}
          >
            {t.navOrders}
          </button>
        </nav>

        {/* Right: Search, Wishlist, Cart & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Search Input (Desktop) */}
          <div className="relative hidden md:block w-48 xl:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs rounded-full pl-8 pr-7 py-2 border border-stone-200 focus:outline-none focus:border-emerald-600 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors border border-stone-200/80 cursor-pointer"
            title={t.myWishlist}
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-numeric shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors border border-stone-200/80 cursor-pointer"
            title={t.shoppingBag}
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-numeric shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2 px-3.5 sm:px-4 rounded-full transition-all shadow-xs hover:shadow flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isAdmin
                  ? language === 'te'
                    ? 'అడ్మిన్'
                    : language === 'hi'
                    ? 'प्रशासक'
                    : language === 'ta'
                    ? 'நிர்வாகி'
                    : language === 'mr'
                    ? 'प्रशासक'
                    : language === 'pa'
                    ? 'ਪ੍ਰਸ਼ਾਸਕ'
                    : 'Admin'
                  : user.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-xs animate-fadeIn"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                {isAdmin ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100 bg-emerald-50 text-emerald-950">
                      <span className="font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        {t.adminAuthenticated}
                      </span>
                      <span className="text-[10px] text-emerald-700 block mt-0.5">
                        {t.adminDesc}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('admin');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-stone-50 font-semibold text-stone-800 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t.adminVerificationDesk}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogoutAdmin();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-700 font-bold flex items-center gap-2 border-t border-stone-100"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>{t.logoutAdmin}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100 text-stone-600">
                      <span className="font-bold block text-stone-900">{user.name}</span>
                      <span className="text-[10px] text-stone-400 block">{user.email}</span>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {user.role === 'consumer' ? t.authConsumer : user.role === 'farmer' ? t.authFarmer : 'Admin'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('orders');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      {t.trackMyOrders}
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      {t.myWishlist} ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab('farmer');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium"
                    >
                      {t.farmerDashboard}
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700 font-medium border-t border-stone-100"
                    >
                      {t.signInSwitchRole}
                    </button>
                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenAdminLogin();
                        }}
                        className="w-full text-left px-4 py-1.5 hover:bg-stone-50 text-stone-400 hover:text-emerald-800 text-[11px] flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.adminPortal}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Bar */}
      <div className="flex lg:hidden items-center justify-around border-t border-stone-100 bg-stone-50 px-2 py-2 text-xs font-semibold text-stone-600">
        <button
          onClick={() => {
            onSelectCategory('all');
            onSelectTab('marketplace');
          }}
          className={`py-1 px-2.5 rounded-lg transition-colors ${
            currentTab === 'marketplace'
              ? 'text-emerald-800 font-bold bg-emerald-100'
              : 'hover:bg-stone-100'
          }`}
        >
          {t.navMarketplace}
        </button>
        <button
          onClick={() => onSelectTab('farmer')}
          className={`py-1 px-2.5 rounded-lg transition-colors ${
            currentTab === 'farmer'
              ? 'text-emerald-800 font-bold bg-emerald-100'
              : 'hover:bg-stone-100'
          }`}
        >
          {t.navFarmerDashboard}
        </button>
        <button
          onClick={() => {
            if (isAdmin) {
              onSelectTab('admin');
            } else {
              onOpenAdminLogin();
            }
          }}
          className={`py-1 px-2.5 rounded-lg transition-colors ${
            currentTab === 'admin'
              ? 'text-emerald-800 font-bold bg-emerald-100'
              : 'hover:bg-stone-100'
          }`}
        >
          {t.navAdminVerification}
        </button>
        <button
          onClick={() => onSelectTab('orders')}
          className={`py-1 px-2.5 rounded-lg transition-colors ${
            currentTab === 'orders'
              ? 'text-emerald-800 font-bold bg-emerald-100'
              : 'hover:bg-stone-100'
          }`}
        >
          {t.navOrders}
        </button>
      </div>
    </header>
  );
};
