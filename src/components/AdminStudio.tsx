import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowLeft,
  Sparkles,
  Megaphone,
  LayoutGrid,
  FileText,
  Sliders,
  TrendingUp,
  Image as ImageIcon,
  Tag,
  RefreshCw,
  Copy,
  ExternalLink,
  Check,
  Star,
  FolderTree,
  Truck,
  PackageCheck
} from 'lucide-react';
import {
  Product,
  ProductCategory,
  FarmerProfile,
  LanguageCode,
  AdCard,
  SiteStructureConfig,
  MandiTickerItem,
  TrustStatItem,
  CategoryNode,
  Order
} from '../types';
import { StorageService } from '../services/storage';
import { translations } from '../data/translations';
import { XivaLogo } from './XivaLogo';
import { AdminMediaManagerView } from './AdminMediaManagerView';

export const IMAGE_PRESETS = [
  { label: 'Lush Farm Harvest Spread', url: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg' },
  { label: 'Organic Farmland Sunrise', url: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg' },
  { label: 'Tractor Agricultural Field', url: '/src/assets/images/hero_nutrify_tractor_field_1791023332618.jpg' },
  { label: 'Heirloom Organic Tomatoes', url: '/src/assets/images/product_heirloom_tomatoes_1791021824051.jpg' },
  { label: 'Ratnagiri Alphonso Mangoes', url: '/src/assets/images/product_orchard_alphonso_mangoes_1791021846830.jpg' },
  { label: 'Cold-Pressed Chekku Oils', url: '/src/assets/images/product_farm_coldpressed_oil_1791021836230.jpg' },
  { label: 'Farm Fresh Leafy Greens', url: '/src/assets/images/product_farm_greens_veg_1791169432396.jpg' },
  { label: 'Heritage Golden Spices', url: '/src/assets/images/product_heritage_spices_1791169443477.jpg' },
  { label: 'Pulses, Millets & Grains', url: '/src/assets/images/product_pulses_grains_1791169415931.jpg' }
];

interface AdminStudioProps {
  isAdmin: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  products: Product[];
  categories?: CategoryNode[];
  orders?: Order[];
  ads: AdCard[];
  siteStructure: SiteStructureConfig;
  farmers: FarmerProfile[];
  onRefreshData: () => void;
  onNavigateHome: () => void;
  language?: LanguageCode;
}

export const AdminStudio: React.FC<AdminStudioProps> = ({
  isAdmin,
  onLoginSuccess,
  onLogout,
  products,
  categories = [],
  orders = [],
  ads,
  siteStructure,
  farmers,
  onRefreshData,
  onNavigateHome,
  language = 'en'
}) => {
  const t = translations[language];

  // Admin login credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active studio tab
  const [activeTab, setActiveTab] = useState<'cards' | 'media' | 'categories' | 'ads' | 'structure' | 'orders' | 'farmers'>('cards');
  const [notification, setNotification] = useState<string | null>(null);

  // Categories Hierarchy management state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryNode | null>(null);
  const [categoryLevelFilter, setCategoryLevelFilter] = useState<'all' | 0 | 1 | 2>('all');
  const [newCategory, setNewCategory] = useState<Partial<CategoryNode>>({
    name: '',
    slug: '',
    level: 1,
    parentId: 'cereals',
    description: '',
    image: IMAGE_PRESETS[0].url
  });

  // Produce Cards filters & state
  const [cardSearch, setCardSearch] = useState('');
  const [cardCategoryFilter, setCardCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  // Form state for adding new card
  const [newCard, setNewCard] = useState<Partial<Product>>({
    name: '',
    category: 'vegetables',
    price: 60,
    unit: 'kg',
    stock: 150,
    harvestTime: 'Morning hand-picked',
    harvestDate: new Date().toISOString().split('T')[0],
    farmDistanceKm: 18,
    farmerName: 'Verified Organic Producer',
    farmerVillage: 'Mandya Valley',
    farmerVerified: true,
    organicCertification: 'NPOP & Jaivik Bharat Certified',
    image: IMAGE_PRESETS[0].url,
    description: 'Fresh organically grown crop harvested directly from certified family farm.',
    nutrition: '100% natural, chemical-free and nutrient dense.',
    rating: 5.0,
    reviewCount: 1,
    featured: false
  });

  // Ads state & editor
  const [editingAd, setEditingAd] = useState<AdCard | null>(null);
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [newAd, setNewAd] = useState<Partial<AdCard>>({
    title: '',
    subtitle: '',
    badge: 'SPECIAL AD · LIMITED DEAL',
    discountText: 'FLAT 25% OFF',
    code: 'FARMDIRECT25',
    ctaText: 'Claim Offer',
    ctaCategory: 'fruits',
    image: IMAGE_PRESETS[0].url,
    bgColor: 'emerald',
    active: true,
    placement: 'catalog_interstitial'
  });

  // Structure edit state
  const [structureForm, setStructureForm] = useState<SiteStructureConfig>(siteStructure);
  const [newTickerName, setNewTickerName] = useState('');
  const [newTickerPrice, setNewTickerPrice] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const ok = StorageService.loginAdmin(email, password, rememberMe);
    if (ok) {
      onLoginSuccess();
      showToast('Welcome to Xiva.Org /admin Command Studio!');
    } else {
      setLoginError('Invalid credentials. Use saivarshak14@gmail.com and password 1111.');
    }
  };

  const handleQuickAutofill = () => {
    setEmail('saivarshak14@gmail.com');
    setPassword('1111');
    setLoginError(null);
  };

  // Card Handlers
  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    StorageService.updateProduct(editingProduct);
    onRefreshData();
    showToast(`Updated "${editingProduct.name}" in store catalog.`);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      StorageService.deleteProduct(id);
      onRefreshData();
      showToast(`Removed "${name}" from store.`);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.name?.trim()) return;

    const prod: Product = {
      id: `crop_${Date.now()}`,
      farmerId: 'farm_01',
      farmerName: newCard.farmerName || 'Verified Organic Producer',
      farmerVillage: newCard.farmerVillage || 'Mandya Valley',
      farmerVerified: newCard.farmerVerified ?? true,
      name: newCard.name.trim(),
      category: newCard.category || 'vegetables',
      price: Number(newCard.price) || 50,
      unit: newCard.unit || 'kg',
      stock: Number(newCard.stock) || 100,
      harvestTime: newCard.harvestTime || 'Fresh harvest',
      harvestDate: newCard.harvestDate || new Date().toISOString().split('T')[0],
      farmDistanceKm: Number(newCard.farmDistanceKm) || 20,
      organicCertification: newCard.organicCertification || 'NPOP Certified Organic',
      image: newCard.image || IMAGE_PRESETS[0].url,
      description: newCard.description || 'Grown with natural bio-manures.',
      nutrition: newCard.nutrition || 'Rich in essential nutrients.',
      rating: Number(newCard.rating) || 5.0,
      reviewCount: Number(newCard.reviewCount) || 0,
      featured: Boolean(newCard.featured)
    };

    StorageService.addProduct(prod);
    onRefreshData();
    setShowAddCardModal(false);
    showToast(`Card "${prod.name}" successfully added to website!`);
    setNewCard({
      name: '',
      category: 'vegetables',
      price: 60,
      unit: 'kg',
      stock: 150,
      harvestTime: 'Morning hand-picked',
      harvestDate: new Date().toISOString().split('T')[0],
      farmDistanceKm: 18,
      farmerName: 'Verified Organic Producer',
      farmerVillage: 'Mandya Valley',
      farmerVerified: true,
      organicCertification: 'NPOP & Jaivik Bharat Certified',
      image: IMAGE_PRESETS[0].url,
      description: 'Fresh organically grown crop harvested directly from certified family farm.',
      nutrition: '100% natural, chemical-free and nutrient dense.',
      rating: 5.0,
      reviewCount: 1,
      featured: false
    });
  };

  const handleToggleCardFeatured = (prod: Product) => {
    const updated = { ...prod, featured: !prod.featured };
    StorageService.updateProduct(updated);
    onRefreshData();
    showToast(`${prod.name} ${updated.featured ? 'marked as Featured Card' : 'unmarked from Featured'}.`);
  };

  const handleResetProducts = () => {
    if (window.confirm('Reset all produce cards to original verified PDF default set?')) {
      StorageService.resetProductsToDefaults();
      onRefreshData();
      showToast('All produce cards reset to original defaults.');
    }
  };

  // Ads Handlers
  const handleSaveAdEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd) return;
    StorageService.updateAd(editingAd);
    onRefreshData();
    showToast(`Ad "${editingAd.title}" updated.`);
    setEditingAd(null);
  };

  const handleDeleteAd = (id: string, title: string) => {
    if (window.confirm(`Delete advertisement card "${title}"?`)) {
      StorageService.deleteAd(id);
      onRefreshData();
      showToast(`Ad "${title}" deleted.`);
    }
  };

  const handleToggleAdActive = (ad: AdCard) => {
    const updated = { ...ad, active: !ad.active };
    StorageService.updateAd(updated);
    onRefreshData();
    showToast(`Ad "${ad.title}" ${updated.active ? 'activated on website' : 'paused'}.`);
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAd.title?.trim()) return;

    const ad: AdCard = {
      id: `ad_${Date.now()}`,
      title: newAd.title.trim(),
      subtitle: newAd.subtitle?.trim() || 'Exclusive seasonal direct farm gate deal.',
      badge: newAd.badge?.trim() || 'SPECIAL AD',
      discountText: newAd.discountText?.trim() || 'LIMITED OFFER',
      code: newAd.code?.trim() || 'FARMDEAL',
      ctaText: newAd.ctaText?.trim() || 'Claim Deal',
      ctaCategory: newAd.ctaCategory || 'all',
      image: newAd.image || IMAGE_PRESETS[0].url,
      bgColor: newAd.bgColor || 'emerald',
      active: newAd.active ?? true,
      placement: newAd.placement || 'catalog_interstitial'
    };

    StorageService.addAd(ad);
    onRefreshData();
    setShowAddAdModal(false);
    showToast(`New Ad Card "${ad.title}" added to website!`);
    setNewAd({
      title: '',
      subtitle: '',
      badge: 'SPECIAL AD · LIMITED DEAL',
      discountText: 'FLAT 25% OFF',
      code: 'FARMDIRECT25',
      ctaText: 'Claim Offer',
      ctaCategory: 'fruits',
      image: IMAGE_PRESETS[0].url,
      bgColor: 'emerald',
      active: true,
      placement: 'catalog_interstitial'
    });
  };

  const handleResetAds = () => {
    if (window.confirm('Reset all advertising cards to default promotion banners?')) {
      StorageService.resetAdsToDefaults();
      onRefreshData();
      showToast('Ad cards reset to default presets.');
    }
  };

  // Structure Handlers
  const handleSaveStructure = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveSiteStructure(structureForm);
    onRefreshData();
    showToast('Web structure and Hero layout updated across website!');
  };

  const handleResetStructure = () => {
    if (window.confirm('Reset web structure and hero headlines to default?')) {
      const reset = StorageService.resetSiteStructure();
      setStructureForm(reset);
      onRefreshData();
      showToast('Web structure reset to factory defaults.');
    }
  };

  const handleAddTickerItem = () => {
    if (!newTickerName.trim() || !newTickerPrice.trim()) return;
    const newItem: MandiTickerItem = {
      id: `m_${Date.now()}`,
      name: newTickerName.trim(),
      price: newTickerPrice.trim(),
      trend: 'up'
    };
    setStructureForm((prev) => ({
      ...prev,
      mandiTickerItems: [...prev.mandiTickerItems, newItem]
    }));
    setNewTickerName('');
    setNewTickerPrice('');
  };

  const handleRemoveTickerItem = (id: string) => {
    setStructureForm((prev) => ({
      ...prev,
      mandiTickerItems: prev.mandiTickerItems.filter((i) => i.id !== id)
    }));
  };

  const handleUpdateStat = (id: string, value: string, label: string) => {
    setStructureForm((prev) => ({
      ...prev,
      trustStats: prev.trustStats.map((s) => (s.id === id ? { ...s, value, label } : s))
    }));
  };

  // Category Management Handlers
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name?.trim()) return;

    const id = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const slug = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cat: CategoryNode = {
      id: id,
      name: newCategory.name.trim(),
      slug: slug,
      level: newCategory.level ?? 1,
      parentId: newCategory.level === 0 ? null : (newCategory.parentId || null),
      description: newCategory.description?.trim(),
      image: newCategory.image || IMAGE_PRESETS[0].url
    };

    StorageService.addCategory(cat);
    onRefreshData();
    setShowAddCategoryModal(false);
    showToast(`Category "${cat.name}" added to database!`);
    setNewCategory({
      name: '',
      slug: '',
      level: 1,
      parentId: 'cereals',
      description: '',
      image: IMAGE_PRESETS[0].url
    });
  };

  const handleSaveCategoryEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    StorageService.updateCategory(editingCategory);
    onRefreshData();
    showToast(`Category "${editingCategory.name}" updated.`);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (cat: CategoryNode) => {
    if (window.confirm(`Delete category "${cat.name}"? Any subcategories under it will also be removed.`)) {
      StorageService.deleteCategory(cat.id);
      onRefreshData();
      showToast(`Category "${cat.name}" removed.`);
    }
  };

  const handleResetCategories = () => {
    if (window.confirm('Reset all categories to original verified agriculture hierarchy?')) {
      StorageService.resetCategoriesToDefaults();
      onRefreshData();
      showToast('Category hierarchy reset to defaults.');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    StorageService.updateOrderStatus(orderId, status);
    onRefreshData();
    showToast(`Order status updated to ${status}.`);
  };

  // Filtered produce cards
  const filteredProducts = products.filter((p) => {
    if (cardCategoryFilter !== 'all' && p.category !== cardCategoryFilter) return false;
    if (cardSearch.trim()) {
      const q = cardSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.farmerName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // -------------------------------------------------------------
  // VIEW 1: ADMIN LOGIN SCREEN (When not authenticated)
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] p-8 text-white text-center relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-emerald-300" />
            </div>
            <h1 className="text-2xl font-black font-serif-display tracking-tight text-white">
              Admin Command Portal
            </h1>
            <p className="text-xs text-emerald-200/90 mt-1">
              Route: <span className="font-mono bg-emerald-950/40 px-1.5 py-0.5 rounded text-emerald-300">/admin</span> · Web Structure & Card Studio
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick credentials banner as requested */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-700" />
                  Admin Credentials
                </span>
                <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                  Requested Access
                </span>
              </div>
              <div className="text-xs text-emerald-950 font-mono space-y-1 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-bold">saivarshak14@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Password:</span>
                  <span className="font-bold">1111</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickAutofill}
                className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                ⚡ 1-Click Auto-Fill Credentials
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Administrator Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@xiva.org"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-medium"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Log In to /admin Studio</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                onClick={onNavigateHome}
                className="text-xs text-stone-500 hover:text-stone-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN STUDIO
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn relative z-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064e3b] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/30 text-xs font-bold flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              /admin Studio
            </span>
            <span className="text-stone-400 text-xs">·</span>
            <span className="text-xs font-semibold text-stone-600">
              Logged in: <strong className="text-emerald-900">Platform Administrator</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif-display tracking-tight">
            Web Structure & Complete Card Management
          </h1>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Real-time control room to add, edit, or remove produce cards, promotional advertisement cards, and customize the website structure.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            <span>View Live Store</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Segmented Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'cards'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Produce Cards ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'media'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-emerald-500" />
          <span>Media & Images</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Category Hierarchy ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'ads'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Ad & Promo Cards ({ads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'structure'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Site Structure & Hero</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('farmers')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'farmers'
              ? 'bg-[#064e3b] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Farmer Dossiers ({farmers.length})</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB: MEDIA & WEBSITE IMAGE MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'media' && (
        <AdminMediaManagerView onRefreshParentData={onRefreshData} />
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: PRODUCE CARDS MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              <input
                type="text"
                placeholder="Search produce cards..."
                value={cardSearch}
                onChange={(e) => setCardSearch(e.target.value)}
                className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 min-w-[200px]"
              />

              <select
                value={cardCategoryFilter}
                onChange={(e) => setCardCategoryFilter(e.target.value as ProductCategory | 'all')}
                className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories ({products.length})</option>
                <option value="cereals">Cereals</option>
                <option value="pulses">Pulses</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="spices">Spices</option>
                <option value="exotic">Exotic</option>
              </select>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetProducts}
                className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                title="Reset to initial PDF product set"
              >
                <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                Reset Defaults
              </button>

              <button
                onClick={() => setShowAddCardModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Card</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {p.category}
                      </span>
                      {p.featured && (
                        <span className="bg-amber-500 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-amber-950" />
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                      ₹{p.price}/{p.unit}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-stone-900 text-sm">{p.name}</h3>
                      <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                        Stock: {p.stock} {p.unit}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="text-[11px] text-stone-600 flex items-center justify-between pt-1 border-t border-stone-100">
                      <span>Farmer: <strong>{p.farmerName}</strong></span>
                      <span className="text-stone-400">{p.farmDistanceKm} km</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleCardFeatured(p)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      p.featured ? 'text-amber-800 bg-amber-100' : 'text-stone-500 hover:text-amber-700'
                    }`}
                    title="Toggle Featured"
                  >
                    <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-amber-600' : ''}`} />
                    <span className="hidden sm:inline">{p.featured ? 'Featured' : 'Pin'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove card from website"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: HIERARCHICAL CATEGORIES MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              <span className="text-xs font-bold text-stone-700">Filter by Level:</span>
              <select
                value={categoryLevelFilter}
                onChange={(e) => setCategoryLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as 0 | 1 | 2)}
                className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Category Levels ({categories.length})</option>
                <option value={0}>Level 0: Main Top Categories</option>
                <option value={1}>Level 1: Subcategories</option>
                <option value={2}>Level 2: Sub-subcategories</option>
              </select>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetCategories}
                className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                title="Reset hierarchy to verified agriculture defaults"
              >
                Reset Hierarchy
              </button>

              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category Node</span>
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              .filter((c) => categoryLevelFilter === 'all' || c.level === categoryLevelFilter)
              .map((cat) => {
                const parentCat = cat.parentId ? categories.find((c) => c.id === cat.parentId) : null;
                const cropCount = products.filter(
                  (p) => p.category === cat.id || p.categoryId === cat.id || p.subcategoryId === cat.id || p.subSubcategoryId === cat.id
                ).length;
                const childCount = categories.filter((c) => c.parentId === cat.id).length;

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            cat.level === 0
                              ? 'bg-emerald-100 text-emerald-900'
                              : cat.level === 1
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          Level {cat.level} · {cat.level === 0 ? 'Main' : cat.level === 1 ? 'Sub' : 'Sub-sub'}
                        </span>

                        <span className="text-[10px] text-stone-400 font-mono">
                          ID: {cat.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {cat.image && (
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {cat.name}
                          </h4>
                          {parentCat && (
                            <p className="text-[11px] text-emerald-700 truncate">
                              Parent: <strong>{parentCat.name}</strong>
                            </p>
                          )}
                        </div>
                      </div>

                      {cat.description && (
                        <p className="text-xs text-stone-500 line-clamp-2">
                          {cat.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                        <span>Crops: <strong>{cropCount}</strong></span>
                        {childCount > 0 && <span>Child Categories: <strong>{childCount}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: AD CARDS & PROMOTIONAL BANNERS MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Promotional & Advertisement Cards
              </h2>
              <p className="text-xs text-stone-500">
                Add, update, or remove ad cards shown on the website (spotlight banners and cards inside the product grid).
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetAds}
                className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                Reset Default Ads
              </button>

              <button
                onClick={() => setShowAddAdModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Ad Card</span>
              </button>
            </div>
          </div>

          {/* Ad Cards Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
                  ad.active ? 'bg-white border-stone-200' : 'bg-stone-100/80 border-stone-300 opacity-60'
                }`}
              >
                <div>
                  {/* Ad Image & Header */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-amber-500 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {ad.badge}
                      </span>
                    </div>
                    {ad.discountText && (
                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                        {ad.discountText}
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="text-[10px] text-emerald-300 font-mono">
                        Placement: {ad.placement === 'hero_spotlight' ? 'Top Spotlight' : 'Catalog Card'}
                      </span>
                      <h3 className="text-sm font-bold leading-tight mt-0.5">{ad.title}</h3>
                    </div>
                  </div>

                  {/* Ad Body */}
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-stone-600">
                      {ad.subtitle}
                    </p>
                    {ad.code && (
                      <div className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-800 text-[11px] font-mono px-2 py-0.5 rounded border border-stone-200">
                        <span>Code:</span>
                        <strong className="text-emerald-800">{ad.code}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ad Actions */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleAdActive(ad)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      ad.active
                        ? 'text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200'
                        : 'text-stone-600 bg-stone-200 hover:bg-stone-300'
                    }`}
                  >
                    {ad.active ? 'Active on Web' : 'Paused'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingAd(ad)}
                      className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAd(ad.id, ad.title)}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete ad card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: COMPLETE WEB STRUCTURE & HERO STUDIO */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'structure' && (
        <form onSubmit={handleSaveStructure} className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  Website Hero & Presentation Structure
                </h2>
                <p className="text-xs text-stone-500">
                  Configure high-level headlines, trust badges, background imagery, and calls-to-action.
                </p>
              </div>

              <button
                onClick={handleResetStructure}
                type="button"
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 rounded-xl transition-colors cursor-pointer"
              >
                Reset Default Structure
              </button>
            </div>

            {/* Hero Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Hero Top Trust Badge
                </label>
                <input
                  type="text"
                  value={structureForm.heroBadge}
                  onChange={(e) =>
                    setStructureForm((prev) => ({ ...prev, heroBadge: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Hero Main Headline
                </label>
                <input
                  type="text"
                  value={structureForm.heroTitle}
                  onChange={(e) =>
                    setStructureForm((prev) => ({ ...prev, heroTitle: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={structureForm.heroSubtitle}
                  onChange={(e) =>
                    setStructureForm((prev) => ({ ...prev, heroSubtitle: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Hero Background Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={structureForm.heroBgImage}
                    onChange={(e) =>
                      setStructureForm((prev) => ({ ...prev, heroBgImage: e.target.value }))
                    }
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                  <select
                    onChange={(e) =>
                      setStructureForm((prev) => ({ ...prev, heroBgImage: e.target.value }))
                    }
                    className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                  >
                    <option value="">Preset</option>
                    {IMAGE_PRESETS.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Hero Detailed Description
                </label>
                <textarea
                  rows={2}
                  value={structureForm.heroDescription}
                  onChange={(e) =>
                    setStructureForm((prev) => ({ ...prev, heroDescription: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* 4 Trust Stats Cards Configuration */}
            <div className="border-t border-stone-100 pt-6 space-y-4">
              <h3 className="text-sm font-bold text-stone-900">
                Trust & Transparency Metric Cards (Hero Bar)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {structureForm.trustStats.map((stat, idx) => (
                  <div key={stat.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 block">
                      Card #{idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder="Value (e.g. 0%)"
                      value={stat.value}
                      onChange={(e) => handleUpdateStat(stat.id, e.target.value, stat.label)}
                      className="w-full px-2 py-1 text-sm font-bold bg-white border border-stone-200 rounded-lg text-emerald-800"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Commission)"
                      value={stat.label}
                      onChange={(e) => handleUpdateStat(stat.id, stat.value, e.target.value)}
                      className="w-full px-2 py-1 text-[11px] bg-white border border-stone-200 rounded-lg text-stone-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* APMC Mandi Ticker Configuration */}
            <div className="border-t border-stone-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Live APMC Mandi Benchmark Ticker
                  </h3>
                  <p className="text-xs text-stone-500">
                    Commodity rates displayed in the marquee ticker below the hero.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={structureForm.mandiTickerEnabled}
                    onChange={(e) =>
                      setStructureForm((prev) => ({
                        ...prev,
                        mandiTickerEnabled: e.target.checked
                      }))
                    }
                    className="rounded border-stone-300 text-emerald-600"
                  />
                  <span>Ticker Active</span>
                </label>
              </div>

              <div className="space-y-2">
                {structureForm.mandiTickerItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <strong className="text-stone-900">{item.name}:</strong>
                      <span className="text-emerald-800 font-mono">{item.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTickerItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Add new ticker commodity */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Commodity (e.g. Cotton Hybrid)"
                    value={newTickerName}
                    onChange={(e) => setNewTickerName(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Rate & Note (e.g. ₹6,200/qtl)"
                    value={newTickerPrice}
                    onChange={(e) => setNewTickerPrice(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddTickerItem}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Announcement Notice */}
            <div className="border-t border-stone-100 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  Top Utility Announcement Notice
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-600">
                  <input
                    type="checkbox"
                    checked={structureForm.topAnnouncementEnabled}
                    onChange={(e) =>
                      setStructureForm((prev) => ({
                        ...prev,
                        topAnnouncementEnabled: e.target.checked
                      }))
                    }
                    className="rounded border-stone-300 text-emerald-600"
                  />
                  <span>Show Top Notice</span>
                </label>
              </div>
              <input
                type="text"
                value={structureForm.topAnnouncementNotice}
                onChange={(e) =>
                  setStructureForm((prev) => ({
                    ...prev,
                    topAnnouncementNotice: e.target.value
                  }))
                }
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Web Structure Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: FARMER AUDIT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Registered Organic Farmer Dossiers
              </h2>
              <p className="text-xs text-stone-500">
                Audit documents, revenue land records, and NPOP organic certifications.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {farmers.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {f.farmerName} · {f.farmName}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {f.village}, {f.district}, {f.state} · {f.landAcreage} Acres ({f.soilType})
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      f.verificationStatus === 'verified'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {f.verificationBadge}
                  </span>
                </div>

                <div className="text-xs text-stone-600 flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                  <span className="font-bold">Verified Documents:</span>
                  {f.documents.map((d) => (
                    <span key={d.id} className="bg-white px-2 py-0.5 rounded border border-stone-200 text-[11px]">
                      📄 {d.title} ({d.documentNumber})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: CUSTOMER ORDERS MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Customer Orders & Real-time Delivery Status
              </h2>
              <p className="text-xs text-stone-500">
                Manage harvest stages, cold-chain dispatches, and delivery status updates.
              </p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
              {orders.length} Active Orders
            </span>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                No orders placed yet. Placed customer orders will appear here for fulfilment.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-stone-900">
                          Order #{order.id}
                        </span>
                        <span className="text-[10px] text-stone-400">·</span>
                        <span className="text-xs text-stone-600">{order.createdAt}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Customer: <strong className="text-stone-800">{order.consumerName}</strong> ({order.consumerEmail})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-stone-900 font-numeric">
                        ₹{order.total}
                      </span>
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full uppercase font-bold">
                        {order.paymentMethod} ({order.paymentStatus})
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="text-xs text-stone-600 space-y-1">
                    <span className="font-bold text-stone-700 block">Ordered Crops:</span>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] font-medium">
                          {item.product.name} × {item.quantity} {item.product.unit} (₹{item.product.price * item.quantity})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info & Status Updater */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200/80">
                    <div className="text-xs text-stone-500">
                      <span>Destination: <strong>{order.delivery.address}, {order.delivery.city}</strong> · Slot: {order.delivery.slot}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-700">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                      >
                        <option value="placed">Placed (Order Received)</option>
                        <option value="confirmed">Confirmed (Farm Approved)</option>
                        <option value="harvested">Harvested & Packed</option>
                        <option value="transit_cold">In Cold-Chain Transit</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered to Doorstep</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: ADD NEW PRODUCE CARD */}
      {/* ------------------------------------------------------------- */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                Add New Produce Card
              </h3>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Produce Name *</label>
                  <input
                    type="text"
                    required
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    placeholder="e.g. Sona Masoori Raw Rice"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newCard.category}
                    onChange={(e) => setNewCard({ ...newCard, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                  >
                    <option value="cereals">Cereals</option>
                    <option value="pulses">Pulses</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="spices">Spices</option>
                    <option value="exotic">Exotic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCard.price}
                    onChange={(e) => setNewCard({ ...newCard, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Unit (e.g. kg, box, bunch)</label>
                  <input
                    type="text"
                    value={newCard.unit}
                    onChange={(e) => setNewCard({ ...newCard, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Available Stock Quantity</label>
                  <input
                    type="number"
                    min={0}
                    value={newCard.stock}
                    onChange={(e) => setNewCard({ ...newCard, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Farmer / Producer Name</label>
                  <input
                    type="text"
                    value={newCard.farmerName}
                    onChange={(e) => setNewCard({ ...newCard, farmerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Farm Distance (km)</label>
                  <input
                    type="number"
                    value={newCard.farmDistanceKm}
                    onChange={(e) => setNewCard({ ...newCard, farmDistanceKm: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Organic Certification</label>
                  <input
                    type="text"
                    value={newCard.organicCertification}
                    onChange={(e) => setNewCard({ ...newCard, organicCertification: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Image Preset or Custom URL</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCard.image}
                      onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                      placeholder="/src/assets/images/..."
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                    />
                    <select
                      onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                      className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                    >
                      <option value="">Choose Library Photo</option>
                      {IMAGE_PRESETS.map((img) => (
                        <option key={img.url} value={img.url}>{img.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Thumbnail Preview */}
                  {newCard.image && (
                    <div className="w-24 h-16 rounded-xl overflow-hidden border border-stone-200">
                      <img src={newCard.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newCard.description}
                    onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={newCard.featured}
                    onChange={(e) => setNewCard({ ...newCard, featured: e.target.checked })}
                    className="rounded border-stone-300 text-emerald-600"
                  />
                  <span>Mark as Featured Card (Top Spotlight)</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCardModal(false)}
                    className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Add Card to Website
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: EDIT EXISTING PRODUCE CARD */}
      {/* ------------------------------------------------------------- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                  Edit Card: {editingProduct.name}
                </h3>
                <p className="text-xs text-stone-500">ID: {editingProduct.id}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Card Title / Produce Name</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                  >
                    <option value="cereals">Cereals</option>
                    <option value="pulses">Pulses</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="spices">Spices</option>
                    <option value="exotic">Exotic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Available Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={editingProduct.farmerName}
                    onChange={(e) => setEditingProduct({ ...editingProduct, farmerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Farm Distance (km)</label>
                  <input
                    type="number"
                    value={editingProduct.farmDistanceKm}
                    onChange={(e) => setEditingProduct({ ...editingProduct, farmDistanceKm: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Organic Certification</label>
                  <input
                    type="text"
                    value={editingProduct.organicCertification}
                    onChange={(e) => setEditingProduct({ ...editingProduct, organicCertification: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                    />
                    <select
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                    >
                      <option value="">Preset</option>
                      {IMAGE_PRESETS.map((img) => (
                        <option key={img.url} value={img.url}>{img.label}</option>
                      ))}
                    </select>
                  </div>
                  {editingProduct.image && (
                    <div className="w-24 h-16 rounded-xl overflow-hidden border border-stone-200">
                      <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="rounded border-stone-300 text-emerald-600"
                  />
                  <span>Featured Card</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Card Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: ADD NEW AD CARD */}
      {/* ------------------------------------------------------------- */}
      {showAddAdModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                Create New Advertisement Card
              </h3>
              <button
                onClick={() => setShowAddAdModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ad Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monsoon Organic Harvest Sale"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ad Subtitle / Message</label>
                <input
                  type="text"
                  placeholder="e.g. Direct gate pickup from 18 verified bio-orchards."
                  value={newAd.subtitle}
                  onChange={(e) => setNewAd({ ...newAd, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="SPECIAL AD · FLASH DEAL"
                    value={newAd.badge}
                    onChange={(e) => setNewAd({ ...newAd, badge: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Discount Callout</label>
                  <input
                    type="text"
                    placeholder="FLAT 30% OFF"
                    value={newAd.discountText}
                    onChange={(e) => setNewAd({ ...newAd, discountText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Promo Code</label>
                  <input
                    type="text"
                    placeholder="ORGANIC30"
                    value={newAd.code}
                    onChange={(e) => setNewAd({ ...newAd, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    placeholder="Claim Deal"
                    value={newAd.ctaText}
                    onChange={(e) => setNewAd({ ...newAd, ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Placement on Web</label>
                <select
                  value={newAd.placement}
                  onChange={(e) => setNewAd({ ...newAd, placement: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                >
                  <option value="catalog_interstitial">Inside Produce Grid (Interstitial Card)</option>
                  <option value="hero_spotlight">Top Spotlight Banner (Under Hero)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ad Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAd.image}
                    onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                  <select
                    onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                    className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                  >
                    <option value="">Preset</option>
                    {IMAGE_PRESETS.map((img) => (
                      <option key={img.url} value={img.url}>{img.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddAdModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Publish Ad Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: EDIT EXISTING AD CARD */}
      {/* ------------------------------------------------------------- */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                  Edit Ad Card: {editingAd.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingAd(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ad Headline</label>
                <input
                  type="text"
                  required
                  value={editingAd.title}
                  onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingAd.subtitle}
                  onChange={(e) => setEditingAd({ ...editingAd, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingAd.badge}
                    onChange={(e) => setEditingAd({ ...editingAd, badge: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Discount Tag</label>
                  <input
                    type="text"
                    value={editingAd.discountText}
                    onChange={(e) => setEditingAd({ ...editingAd, discountText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Promo Code</label>
                  <input
                    type="text"
                    value={editingAd.code}
                    onChange={(e) => setEditingAd({ ...editingAd, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">CTA Text</label>
                  <input
                    type="text"
                    value={editingAd.ctaText}
                    onChange={(e) => setEditingAd({ ...editingAd, ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Placement</label>
                <select
                  value={editingAd.placement}
                  onChange={(e) => setEditingAd({ ...editingAd, placement: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                >
                  <option value="catalog_interstitial">Inside Produce Grid (Interstitial Card)</option>
                  <option value="hero_spotlight">Top Spotlight Banner (Under Hero)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ad Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingAd.image}
                    onChange={(e) => setEditingAd({ ...editingAd, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                  <select
                    onChange={(e) => setEditingAd({ ...editingAd, image: e.target.value })}
                    className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                  >
                    <option value="">Preset</option>
                    {IMAGE_PRESETS.map((img) => (
                      <option key={img.url} value={img.url}>{img.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={editingAd.active}
                    onChange={(e) => setEditingAd({ ...editingAd, active: e.target.checked })}
                    className="rounded border-stone-300 text-emerald-600"
                  />
                  <span>Active on Website</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAd(null)}
                    className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Ad Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: ADD NEW CATEGORY NODE */}
      {/* ------------------------------------------------------------- */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                Add Hierarchical Category
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Level *</label>
                <select
                  value={newCategory.level}
                  onChange={(e) => {
                    const lvl = Number(e.target.value) as 0 | 1 | 2;
                    const defaultParent = lvl === 1 ? 'cereals' : lvl === 2 ? 'cereals_rice' : null;
                    setNewCategory({ ...newCategory, level: lvl, parentId: defaultParent });
                  }}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                >
                  <option value={0}>Level 0: Main Top Category</option>
                  <option value={1}>Level 1: Subcategory</option>
                  <option value={2}>Level 2: Sub-subcategory</option>
                </select>
              </div>

              {newCategory.level !== 0 && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Parent Category *</label>
                  <select
                    value={newCategory.parentId || ''}
                    onChange={(e) => setNewCategory({ ...newCategory, parentId: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                  >
                    {categories
                      .filter((c) => c.level === (newCategory.level! - 1))
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (Level {p.level})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sona Masoori Raw Rice"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Natural, direct farm crop category description..."
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory.image}
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                  <select
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                    className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                  >
                    <option value="">Preset</option>
                    {IMAGE_PRESETS.map((img) => (
                      <option key={img.url} value={img.url}>{img.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Create Category Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 6: EDIT CATEGORY NODE */}
      {/* ------------------------------------------------------------- */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif-display">
                  Edit Category: {editingCategory.name}
                </h3>
                <p className="text-xs text-stone-500">ID: {editingCategory.id} · Level {editingCategory.level}</p>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategoryEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingCategory.image || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                  <select
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                    className="text-xs bg-stone-100 border border-stone-200 rounded-xl px-2 cursor-pointer"
                  >
                    <option value="">Preset</option>
                    {IMAGE_PRESETS.map((img) => (
                      <option key={img.url} value={img.url}>{img.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Save Category Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
