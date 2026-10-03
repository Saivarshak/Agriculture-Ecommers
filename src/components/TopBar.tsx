import React from 'react';
import {
  Phone,
  Mail,
  Search,
  ShoppingBag,
  Wifi,
  WifiOff,
  Globe,
  UserCheck,
  ShieldCheck,
  Sprout
} from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Top Green Utility Header (Exact Match to Reference UI) */}
      <div className="bg-[#0e3b1c] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#14532d]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <a
              href="tel:+919340074900"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-numeric tracking-wide">+91 93400 74900</span>
            </a>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <a
              href="mailto:office@nutrifyindiaorganics.in"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>office@nutrifyindiaorganics.in</span>
            </a>
          </div>

          {/* Right: Social & System Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Social Icons matching reference */}
            <div className="hidden md:flex items-center gap-2.5 text-stone-300">
              <span className="hover:text-emerald-300 cursor-pointer transition-colors text-xs font-bold">f</span>
              <span className="hover:text-emerald-300 cursor-pointer transition-colors text-xs font-bold">in</span>
              <span className="hover:text-emerald-300 cursor-pointer transition-colors text-xs font-bold">yt</span>
            </div>

            {/* Offline Simulation Button */}
            <button
              onClick={onToggleOffline}
              title={isOfflineSimulated ? 'Reconnect to Online Mode' : 'Simulate Rural Low-Network / Offline Mode'}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 border ${
                isOfflineSimulated
                  ? 'bg-amber-500 text-stone-900 border-amber-400 font-bold'
                  : 'bg-emerald-900/80 text-emerald-200 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              {isOfflineSimulated ? (
                <>
                  <WifiOff className="w-3 h-3 text-stone-950" />
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
                className="appearance-none bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 rounded px-2 py-0.5 pr-5 text-[11px] font-medium cursor-pointer focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="te">తెలుగు (TE)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="mr">मराठी (MR)</option>
                <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              </select>
              <Globe className="w-2.5 h-2.5 text-emerald-400 absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main White Navigation Bar with Center/Balanced Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => onSelectTab('marketplace')}
            className={`transition-colors hover:text-emerald-700 py-1 ${
              currentTab === 'marketplace' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('marketplace')}
            className="hover:text-emerald-700 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => onSelectTab('marketplace')}
            className="hover:text-emerald-700 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => onSelectTab('marketplace')}
            className="hover:text-emerald-700 transition-colors"
          >
            Products
          </button>
        </nav>

        {/* Center: Brand Logo with Leaf & Sun Sprout Accent */}
        <div className="flex items-center justify-center shrink-0">
          <button
            onClick={() => onSelectTab('marketplace')}
            className="group flex flex-col items-center text-center focus:outline-none"
          >
            <div className="flex items-center gap-1.5">
              {/* Organic Sprout emblem matching Nutrify style */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-800 via-emerald-600 to-amber-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-emerald-950 font-serif-display leading-none">
                Nutrify
              </span>
            </div>
            <span className="text-[10px] text-emerald-800 font-medium tracking-widest uppercase mt-0.5">
              India Organics · KisanSetu
            </span>
          </button>
        </div>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              onClick={() => onSelectTab('farmer')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'farmer' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''
              }`}
            >
              Crops & Farmer Hub
            </button>
            <button
              onClick={() => onSelectTab('admin')}
              className={`hover:text-emerald-700 transition-colors py-1 flex items-center gap-1 ${
                currentTab === 'admin' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Admin
            </button>
            <button
              onClick={() => onSelectTab('orders')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'orders' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''
              }`}
            >
              Track Orders
            </button>
            <button
              onClick={() => onSelectTab('aws')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'aws' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''
              }`}
            >
              AWS
            </button>
          </nav>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors border border-stone-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-numeric shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* "Get In Touch / User Login" Green Button matching reference */}
          <button
            onClick={onOpenAuth}
            className="bg-[#15803d] hover:bg-[#166534] text-white font-semibold text-xs py-2.5 px-5 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Get in Touch ({user.name.split(' ')[0]})</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex lg:hidden items-center justify-around border-t border-stone-100 bg-stone-50 px-2 py-2 text-xs font-medium text-stone-600">
        <button
          onClick={() => onSelectTab('marketplace')}
          className={`py-1 px-2 rounded ${currentTab === 'marketplace' ? 'text-emerald-800 font-bold bg-emerald-100/70' : ''}`}
        >
          {t.navMarketplace}
        </button>
        <button
          onClick={() => onSelectTab('farmer')}
          className={`py-1 px-2 rounded ${currentTab === 'farmer' ? 'text-emerald-800 font-bold bg-emerald-100/70' : ''}`}
        >
          {t.navFarmerDashboard}
        </button>
        <button
          onClick={() => onSelectTab('admin')}
          className={`py-1 px-2 rounded ${currentTab === 'admin' ? 'text-emerald-800 font-bold bg-emerald-100/70' : ''}`}
        >
          {t.navAdminVerification}
        </button>
        <button
          onClick={() => onSelectTab('orders')}
          className={`py-1 px-2 rounded ${currentTab === 'orders' ? 'text-emerald-800 font-bold bg-emerald-100/70' : ''}`}
        >
          {t.navOrders}
        </button>
        <button
          onClick={() => onSelectTab('aws')}
          className={`py-1 px-2 rounded ${currentTab === 'aws' ? 'text-emerald-800 font-bold bg-emerald-100/70' : ''}`}
        >
          AWS
        </button>
      </div>
    </header>
  );
};
