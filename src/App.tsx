import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Marketplace } from './components/Marketplace';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AdminVerification } from './components/AdminVerification';
import { OrderTracking } from './components/OrderTracking';
import { AuthModal } from './components/AuthModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LeafyBackground } from './components/LeafyBackground';
import { XivaLogo } from './components/XivaLogo';
import { StorageService } from './services/storage';
import { translations } from './data/translations';
import {
  Product,
  ProductCategory,
  FarmerProfile,
  Order,
  CartItem,
  LanguageCode,
  User
} from './types';
import { ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Category filter state
  const [currentTab, setCurrentTab] = useState<'marketplace' | 'farmer' | 'admin' | 'orders'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<LanguageCode>(() => StorageService.getLanguage());

  // Data state
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => StorageService.getFarmers());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());

  // User & Admin session state (user is null if not explicitly logged in)
  const [user, setUser] = useState<User | null>(() => StorageService.getUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => StorageService.isAdminAuthenticated());

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => StorageService.getWishlist());

  // Modal / Drawer visibility
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const t = translations[language];

  // Sync language changes
  const handleSelectLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    StorageService.setLanguage(lang);
  };

  // Reload data from StorageService
  const handleRefreshData = () => {
    setProducts(StorageService.getProducts());
    setFarmers(StorageService.getFarmers());
    setOrders(StorageService.getOrders());
  };

  // Handle Tab navigation
  const handleSelectTab = (tab: 'marketplace' | 'farmer' | 'admin' | 'orders') => {
    if (tab === 'admin' && !isAdmin) {
      setIsAdminPortalOpen(true);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuickReorder = (items: CartItem[]) => {
    setCart((prev) => {
      const updated = [...prev];
      items.forEach((newItem) => {
        const idx = updated.findIndex((i) => i.product.id === newItem.product.id);
        if (idx !== -1) {
          updated[idx].quantity += newItem.quantity;
        } else {
          updated.push(newItem);
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  // Wishlist actions
  const handleToggleWishlist = (productId: string) => {
    StorageService.toggleWishlist(productId);
    setWishlistIds(StorageService.getWishlist());
  };

  // Auth actions
  const handleLoginSuccess = (loggedInUser: User) => {
    StorageService.setUser(loggedInUser);
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
  };

  const handleLogoutUser = () => {
    StorageService.logoutUser();
    setUser(null);
  };

  // Admin actions
  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminPortalOpen(false);
    setCurrentTab('admin');
  };

  const handleLogoutAdmin = () => {
    StorageService.logoutAdmin();
    setIsAdmin(false);
    if (currentTab === 'admin') {
      setCurrentTab('marketplace');
    }
  };

  // Order Placement
  const handleOrderSuccess = (order: Order) => {
    setOrders(StorageService.getOrders());
    setProducts(StorageService.getProducts());
    setCart([]);
    setIsCartOpen(false);
    setCurrentTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Farmer specific actions
  const currentFarmer = farmers.find((f) => f.id === user?.farmId) || farmers[0];

  const handleFarmerAddProduct = (newProduct: Product) => {
    StorageService.addProduct(newProduct);
    handleRefreshData();
  };

  const handleFarmerUpdateStock = (productId: string, newStock: number) => {
    StorageService.updateProductStock(productId, newStock);
    handleRefreshData();
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 relative selection:bg-emerald-200 selection:text-emerald-900">
      {/* Botanical Background Animations */}
      <LeafyBackground />

      {/* Main Top Navigation Header */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        user={user}
        isAdmin={isAdmin}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminLogin={() => setIsAdminPortalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
        onLogoutUser={handleLogoutUser}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Primary Main Content View */}
      <main className="flex-1 relative z-10">
        {currentTab === 'marketplace' && (
          <Marketplace
            products={products}
            currentCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            language={language}
            onNavigateToFarmer={() => handleSelectTab('farmer')}
          />
        )}

        {currentTab === 'farmer' && (
          <FarmerDashboard
            user={user}
            farmer={currentFarmer}
            products={products}
            onAddProduct={handleFarmerAddProduct}
            onUpdateStock={handleFarmerUpdateStock}
            onRefreshData={handleRefreshData}
            language={language}
          />
        )}

        {currentTab === 'admin' && (
          <AdminVerification
            user={user}
            farmers={farmers}
            onRefreshData={handleRefreshData}
            language={language}
          />
        )}

        {currentTab === 'orders' && (
          <OrderTracking
            orders={orders}
            language={language}
            onSelectProduct={(prodId) => {
              const p = products.find((prod) => prod.id === prodId);
              if (p) setSelectedProduct(p);
            }}
            onQuickReorder={handleQuickReorder}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#064e3b] text-emerald-100 border-t border-emerald-800/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <XivaLogo layout="horizontal" size="md" />
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed max-w-md">
                {t.footerSubtitle}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.footerDirect}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                {language === 'te' ? 'వేదిక విభాగాలు' : language === 'hi' ? 'नेविगेशन' : 'Platform'}
              </h4>
              <ul className="space-y-2 text-xs text-emerald-200">
                <li>
                  <button
                    onClick={() => handleSelectTab('marketplace')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {t.navMarketplace}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSelectTab('farmer')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {t.navFarmerDashboard}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSelectTab('orders')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {t.navOrders}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                {language === 'te' ? 'అధికారిక లాగిన్' : language === 'hi' ? 'प्रशासनिक लॉगिन' : 'Admin & Security'}
              </h4>
              <ul className="space-y-2 text-xs text-emerald-200">
                <li>
                  <button
                    onClick={() => setIsAdminPortalOpen(true)}
                    className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.adminPortalTitle}</span>
                  </button>
                </li>
                <li className="text-[11px] text-emerald-300/80">
                  {t.adminPortalDesc}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/80 gap-3">
            <div>
              © 2026 Xiva.Org / KisanSetu Platform. {t.topTrustBar}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>NPOP / APEDA Organic Grounding</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        isAdmin={isAdmin}
        onLoginSuccess={handleAdminLoginSuccess}
        onLogout={handleLogoutAdmin}
        products={products}
        onRefreshProducts={handleRefreshData}
        language={language}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        user={user}
        language={language}
        onOrderSuccess={handleOrderSuccess}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(prod) => {
          setIsWishlistOpen(false);
          setSelectedProduct(prod);
        }}
        language={language}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        user={user}
        language={language}
        onOpenOrders={() => {
          setSelectedProduct(null);
          handleSelectTab('orders');
        }}
      />
    </div>
  );
}
