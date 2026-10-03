import React from 'react';
import { ShoppingBag, Wifi, WifiOff, Globe, UserCheck, ShieldCheck } from 'lucide-react';
import { User, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface TopBarProps {
  currentTab: 'marketplace' | 'farmer' | 'admin' | 'orders' | 'aws';
  onSelectTab: (tab: 'marketplace' | 'farmer' | 'admin' | 'orders' | 'aws') => void;
  cartCount: number;
  onOpenCart: () => void;
  user: User;
  onOpenAuth: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  isOfflineSimulated: boolean;
  onToggleOffline: () => void;
  pendingSyncCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  user,
  onOpenAuth,
  language,
  onSelectLanguage,
  isOfflineSimulated,
  onToggleOffline,
  pendingSyncCount
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Offline Alert Strip if simulated or pending sync */}
      {isOfflineSimulated && (
        <div className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">
              {t.offlineMode}: Operating on local cache. {pendingSyncCount > 0 ? `${pendingSyncCount} ${t.syncPending}.` : 'All changes saved locally.'}
            </span>
          </div>
        </div>
      )}

      {/* Strict One-Row Three-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('marketplace')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
              🌱
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif-display block leading-none">
                {t.brandName}
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase">
                Farm to Table
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('marketplace')}
            className={`transition-colors pb-1 border-b-2 ${
              currentTab === 'marketplace'
                ? 'border-emerald-700 text-emerald-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            {t.navMarketplace}
          </button>
          <button
            onClick={() => onSelectTab('farmer')}
            className={`transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              currentTab === 'farmer'
                ? 'border-emerald-700 text-emerald-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            {t.navFarmerDashboard}
          </button>
          <button
            onClick={() => onSelectTab('admin')}
            className={`transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'border-emerald-700 text-emerald-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            {t.navAdminVerification}
          </button>
          <button
            onClick={() => onSelectTab('orders')}
            className={`transition-colors pb-1 border-b-2 ${
              currentTab === 'orders'
                ? 'border-emerald-700 text-emerald-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            {t.navOrders}
          </button>
          <button
            onClick={() => onSelectTab('aws')}
            className={`transition-colors pb-1 border-b-2 ${
              currentTab === 'aws'
                ? 'border-emerald-700 text-emerald-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            {t.navAwsCloud}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Rural Offline Simulation Switch */}
          <button
            onClick={onToggleOffline}
            title={isOfflineSimulated ? 'Reconnect to Online Mode' : 'Simulate Rural Low-Network / Offline Mode'}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
              isOfflineSimulated
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isOfflineSimulated ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden lg:inline text-xs font-medium">Offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden lg:inline text-xs">Online</span>
              </>
            )}
          </button>

          {/* Multilingual Selector */}
          <div className="relative inline-block text-left">
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
              aria-label="Select Language"
              className="appearance-none bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg px-2.5 py-1.5 pr-6 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="en">English (EN)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
            <Globe className="w-3 h-3 text-stone-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors border border-stone-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-numeric shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden items-center justify-around border-t border-stone-100 bg-stone-50 px-2 py-2 text-xs font-medium text-stone-600">
        <button
          onClick={() => onSelectTab('marketplace')}
          className={`py-1 px-2 rounded ${currentTab === 'marketplace' ? 'text-emerald-800 font-bold bg-emerald-100/60' : ''}`}
        >
          {t.navMarketplace}
        </button>
        <button
          onClick={() => onSelectTab('farmer')}
          className={`py-1 px-2 rounded ${currentTab === 'farmer' ? 'text-emerald-800 font-bold bg-emerald-100/60' : ''}`}
        >
          {t.navFarmerDashboard}
        </button>
        <button
          onClick={() => onSelectTab('admin')}
          className={`py-1 px-2 rounded ${currentTab === 'admin' ? 'text-emerald-800 font-bold bg-emerald-100/60' : ''}`}
        >
          {t.navAdminVerification}
        </button>
        <button
          onClick={() => onSelectTab('orders')}
          className={`py-1 px-2 rounded ${currentTab === 'orders' ? 'text-emerald-800 font-bold bg-emerald-100/60' : ''}`}
        >
          {t.navOrders}
        </button>
        <button
          onClick={() => onSelectTab('aws')}
          className={`py-1 px-2 rounded ${currentTab === 'aws' ? 'text-emerald-800 font-bold bg-emerald-100/60' : ''}`}
        >
          AWS
        </button>
      </div>
    </header>
  );
};
