/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Marketplace } from './components/Marketplace';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AdminVerification } from './components/AdminVerification';
import { OrderTracking } from './components/OrderTracking';
import { AwsDeploymentView } from './components/AwsDeploymentView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { LeafyBackground } from './components/LeafyBackground';
import { StorageService } from './services/storage';
import { User, Product, CartItem, Order, LanguageCode, FarmerProfile } from './types';
import { translations } from './data/translations';
import { Wifi, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'marketplace' | 'farmer' | 'admin' | 'orders' | 'aws'>('marketplace');
  const [user, setUser] = useState<User>(() => StorageService.getUser());
  const [language, setLanguage] = useState<LanguageCode>(() => StorageService.getLanguage());
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => StorageService.getFarmers());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      // Reconnected online: sync any queued offline orders
      const count = StorageService.clearOfflineQueue();
      if (count > 0) {
        setSyncNotice(`Reconnected online! ${count} offline farm orders synchronized with dispatch cloud.`);
        setTimeout(() => setSyncNotice(null), 5000);
      }
    }
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
    // Switch to tracking view so user immediately sees their live automated dispatch
    setCurrentTab('orders');
  };

  const currentFarmerProfile = farmers.find(
    (f) => f.id === user.farmId || f.email.toLowerCase() === user.email.toLowerCase()
  ) || farmers[0];

  const pendingSyncCount = StorageService.getOfflineQueue().length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f6] font-sans text-stone-900 relative">
      {/* Botanical Leafy Background Layer & Ambient Sunlight Animation */}
      <LeafyBackground />

      {/* Top Bar with Strict 3-zone contract */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        language={language}
        onSelectLanguage={handleLanguageChange}
        isOfflineSimulated={isOfflineSimulated}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Online Sync Notification Toast */}
      {syncNotice && (
        <div className="bg-emerald-800 text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-md">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span className="font-semibold">{syncNotice}</span>
          </div>
        </div>
      )}

      {/* Main Tab Routing */}
      <main className="flex-1">
        {currentTab === 'marketplace' && (
          <Marketplace
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            language={language}
            onNavigateToFarmer={() => setCurrentTab('farmer')}
          />
        )}

        {currentTab === 'farmer' && (
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

        {currentTab === 'admin' && (
          <AdminVerification
            user={user}
            farmers={farmers}
            onRefreshData={refreshData}
            language={language}
          />
        )}

        {currentTab === 'orders' && (
          <OrderTracking
            orders={orders}
            language={language}
            onSelectProduct={(id) => {
              const p = products.find((prod) => prod.id === id);
              if (p) setSelectedProduct(p);
            }}
          />
        )}

        {currentTab === 'aws' && (
          <AwsDeploymentView language={language} />
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
          setCurrentTab('orders');
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

      {/* Authentication Modal with saivarshak14@gmail.com / 1111 */}
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

      {/* Sophisticated Natural Agriculture Footer */}
      <footer className="border-t border-stone-200/80 bg-white/90 backdrop-blur-xs py-8 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-emerald-950 font-serif-display text-sm">Nutrify India Organics · {t.brandName}</span>
            <span className="hidden sm:inline">·</span>
            <span>+91 93400 74900 · office@nutrifyindiaorganics.in</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-stone-600">
            <button onClick={() => setCurrentTab('marketplace')} className="hover:text-emerald-800 transition-colors">
              {t.navMarketplace}
            </button>
            <button onClick={() => setCurrentTab('farmer')} className="hover:text-emerald-800 transition-colors">
              {t.navFarmerDashboard}
            </button>
            <button onClick={() => setCurrentTab('admin')} className="hover:text-emerald-800 transition-colors">
              {t.navAdminVerification}
            </button>
            <button onClick={() => setCurrentTab('orders')} className="hover:text-emerald-800 transition-colors">
              {t.navOrders}
            </button>
            <button onClick={() => setCurrentTab('aws')} className="hover:text-emerald-800 transition-colors">
              AWS Cloud & CI/CD
            </button>
            <span>·</span>
            <span className="text-emerald-800 font-semibold">100% Direct Farmer Remittance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
