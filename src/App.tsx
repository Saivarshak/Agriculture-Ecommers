/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Marketplace } from './components/Marketplace';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AdminVerification } from './components/AdminVerification';
import { OrderTracking } from './components/OrderTracking';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { LeafyBackground } from './components/LeafyBackground';
import { XivaLogo } from './components/XivaLogo';
import { StorageService } from './services/storage';
import { User, Product, CartItem, Order, LanguageCode, FarmerProfile, ProductCategory } from './types';
import { translations } from './data/translations';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | 'all'>('all');
  const [currentView, setCurrentView] = useState<'store' | 'farmer' | 'admin_verification' | 'orders'>('store');
  const [user, setUser] = useState<User>(() => StorageService.getUser());
  const [language, setLanguage] = useState<LanguageCode>(() => StorageService.getLanguage());
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => StorageService.getFarmers());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => StorageService.getWishlist());
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Session State (Strictly protected behind authentication)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => StorageService.isAdminAuthenticated());
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Cart & Drawers
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Offline simulation
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(() => StorageService.getOfflineSimulated());
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const t = translations[language];

  // Refresh all state from localStorage
  const refreshData = () => {
    setProducts(StorageService.getProducts());
    setFarmers(StorageService.getFarmers());
    setOrders(StorageService.getOrders());
    setUser(StorageService.getUser());
    setWishlistIds(StorageService.getWishlist());
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    StorageService.setLanguage(lang);
  };

  const handleToggleOffline = () => {
    const nextState = !isOfflineSimulated;
    setIsOfflineSimulated(nextState);
    StorageService.setOfflineSimulated(nextState);

    if (!nextState) {
      const count = StorageService.clearOfflineQueue();
      if (count > 0) {
        setSyncNotice(`Reconnected online! ${count} offline farm orders synchronized with dispatch cloud.`);
        setTimeout(() => setSyncNotice(null), 5000);
      }
    }
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    StorageService.toggleWishlist(productId);
    setWishlistIds(StorageService.getWishlist());
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Admin session operations
  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminModalOpen(true);
  };

  const handleAdminLogout = () => {
    StorageService.logoutAdmin();
    setIsAdmin(false);
    setIsAdminModalOpen(false);
    if (currentView === 'admin_verification') {
      setCurrentView('store');
    }
  };

  // Farmer operations
  const handleAddProduct = (newProduct: Product) => {
    StorageService.addProduct(newProduct);
    refreshData();
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    StorageService.updateProductStock(productId, newStock);
    refreshData();
  };

  const handleOrderSuccess = (order: Order) => {
    refreshData();
    setCurrentView('orders');
  };

  const currentFarmerProfile = farmers.find(
    (f) => f.id === user.farmId || f.email.toLowerCase() === user.email.toLowerCase()
  ) || farmers[0];

  const pendingSyncCount = StorageService.getOfflineQueue().length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f6] font-sans text-stone-900 relative">
      {/* Botanical Leafy Background Layer & Ambient Sunlight Animation */}
      <LeafyBackground />

      {/* Top Bar (LOGO — Home - Cereals - Pulses - Vegetables - Fruits - Spices - Exotic - Search Box - Profile - Wishlist - Bag) */}
      <TopBar
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setCurrentView('store');
        }}
        onGoHome={() => {
          setCurrentCategory('all');
          setCurrentView('store');
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        user={user}
        isAdmin={isAdmin}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        onLogoutAdmin={handleAdminLogout}
        onOpenAdminPortal={() => setIsAdminModalOpen(true)}
        onOpenOrders={() => setCurrentView('orders')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        language={language}
        onSelectLanguage={handleLanguageChange}
        isOfflineSimulated={isOfflineSimulated}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Online Sync Notification Toast */}
      {syncNotice && (
        <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-md relative z-30">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span className="font-semibold">{syncNotice}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'store' && (
          <Marketplace
            products={products}
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentView === 'farmer' && (
          <FarmerDashboard
            user={user}
            farmer={currentFarmerProfile}
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateStock={handleUpdateStock}
            onRefreshData={refreshData}
            language={language}
          />
        )}

        {currentView === 'admin_verification' && isAdmin && (
          <AdminVerification
            user={user}
            farmers={farmers}
            onRefreshData={refreshData}
            language={language}
          />
        )}

        {currentView === 'orders' && (
          <OrderTracking
            orders={orders}
            language={language}
            onSelectProduct={(id) => {
              const p = products.find((prod) => prod.id === id);
              if (p) setSelectedProduct(p);
            }}
          />
        )}
      </main>

      {/* Product Detail Modal & Verified Reviews */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        user={user}
        language={language}
        onOpenOrders={() => {
          setSelectedProduct(null);
          setCurrentView('orders');
        }}
      />

      {/* Cart Drawer & Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
        language={language}
        isOffline={isOfflineSimulated}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Protected Admin Portal / Login Modal */}
      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLoginSuccess={handleAdminLoginSuccess}
        onLogout={handleAdminLogout}
        products={products}
        onRefreshProducts={refreshData}
      />

      {/* Customer Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onLoginSuccess={(u) => {
          setUser(u);
          StorageService.setUser(u);
        }}
        language={language}
      />

      {/* Sophisticated Clean Footer (No fabricated mobile/phone or email fields) */}
      <footer className="border-t border-stone-200/80 bg-white/95 backdrop-blur-xs py-8 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
            <XivaLogo layout="horizontal" size="sm" showSubtitle={false} />
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="text-stone-600 font-medium">
              Organic vegetables, fresh fruits, quality pulses, grains, and aromatic spices
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-stone-600 font-medium">
            <button
              onClick={() => {
                setCurrentCategory('all');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentCategory('cereals');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Cereals
            </button>
            <button
              onClick={() => {
                setCurrentCategory('pulses');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Pulses
            </button>
            <button
              onClick={() => {
                setCurrentCategory('vegetables');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Vegetables
            </button>
            <button
              onClick={() => {
                setCurrentCategory('fruits');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Fruits
            </button>
            <button
              onClick={() => {
                setCurrentCategory('spices');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Spices
            </button>
            <button
              onClick={() => {
                setCurrentCategory('exotic');
                setCurrentView('store');
              }}
              className="hover:text-emerald-800 transition-colors"
            >
              Exotic
            </button>
            <button
              onClick={() => setCurrentView('orders')}
              className="hover:text-emerald-800 transition-colors"
            >
              Track Orders
            </button>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-emerald-800 font-bold">100% Direct Farmer Remittance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
