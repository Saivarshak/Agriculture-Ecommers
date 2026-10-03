import React, { useState } from 'react';
import {
  ShieldCheck,
  UploadCloud,
  FileText,
  Plus,
  TrendingUp,
  Package,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { FarmerProfile, Product, User, LanguageCode, FarmerDoc } from '../types';
import { translations } from '../data/translations';
import { StorageService } from '../services/storage';

interface FarmerDashboardProps {
  user: User;
  farmer: FarmerProfile | undefined;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onRefreshData: () => void;
  language: LanguageCode;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  user,
  farmer,
  products,
  onAddProduct,
  onUpdateStock,
  onRefreshData,
  language
}) => {
  const t = translations[language];

  // Tab: 'inventory' | 'verification' | 'analytics'
  const [activeTab, setActiveTab] = useState<'inventory' | 'verification' | 'analytics'>('inventory');

  // New Harvest Form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('vegetables');
  const [newPrice, setNewPrice] = useState(40);
  const [newUnit, setNewUnit] = useState<Product['unit']>('kg');
  const [newStock, setNewStock] = useState(150);
  const [newDesc, setNewDesc] = useState('');
  const [newNutrition, setNewNutrition] = useState('');
  const [newMandiRate, setNewMandiRate] = useState(25);

  // Document Upload state
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [docType, setDocType] = useState<FarmerDoc['type']>('farm_registration');
  const [docTitle, setDocTitle] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [docFileSimulated, setDocFileSimulated] = useState<string>('pattadar_deed_varshak.pdf');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);

  // Filter products belonging to this farmer
  const farmerId = farmer?.id || 'farm_varshak_01';
  const myProducts = products.filter((p) => p.farmerId === farmerId);

  // Analytics calculation
  const totalStockKg = myProducts.reduce((acc, p) => acc + p.stock, 0);
  const estimatedHarvestValue = myProducts.reduce((acc, p) => acc + p.price * p.stock, 0);
  const totalReviews = myProducts.reduce((acc, p) => acc + p.reviewCount, 0);
  const averageRating =
    myProducts.length > 0
      ? (myProducts.reduce((acc, p) => acc + p.rating, 0) / myProducts.length).toFixed(1)
      : '5.0';

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProd: Product = {
      id: `prod_custom_${Date.now()}`,
      farmerId: farmer?.id || 'farm_varshak_01',
      farmerName: farmer?.farmerName || user.name,
      farmerVillage: farmer?.village || 'Aliabad, Telangana',
      farmerVerified: farmer?.verificationStatus === 'verified',
      name: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice),
      unit: newUnit,
      stock: Number(newStock),
      harvestTime: 'Just Harvested',
      harvestDate: new Date().toISOString().split('T')[0],
      farmDistanceKm: 18,
      organicCertification: 'Farm Inspected & Natural',
      image: '/src/assets/images/product_heirloom_tomatoes_1791021824051.jpg',
      description: newDesc.trim() || 'Directly grown and hand-picked by local farmer without middleman storage.',
      nutrition: newNutrition.trim() || 'Natural organic nutrition, zero pesticide residue.',
      mandiPriceBenchmark: Number(newMandiRate),
      rating: 5.0,
      reviewCount: 0
    };

    onAddProduct(newProd);
    setShowAddModal(false);
    // Reset form
    setNewTitle('');
    setNewPrice(40);
    setNewStock(150);
    setNewDesc('');
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docNumber.trim()) return;

    StorageService.submitFarmerDocument(farmerId, {
      type: docType,
      title: docTitle.trim(),
      fileName: docFileSimulated,
      fileSize: '2.1 MB',
      documentNumber: docNumber.trim(),
      status: 'pending'
    });

    setUploadSuccessMsg(true);
    setTimeout(() => {
      setUploadSuccessMsg(false);
      setShowUploadDocModal(false);
      setDocTitle('');
      setDocNumber('');
      onRefreshData();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Farmer Identity & Status */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative leaf background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center text-9xl">
          🌾
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Smallholder Rural Farmer Hub
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-xs text-stone-300">
                0% Platform Deductions Guaranteed
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-display leading-tight">
              {farmer?.farmName || `${user.name}'s Bio-Farm`}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Owner: <strong className="text-white">{farmer?.farmerName || user.name}</strong> ({farmer?.village}, {farmer?.district}) · Land: {farmer?.landAcreage || 14.5} Acres · Soil: {farmer?.soilType || 'Rich Loam'}
            </p>
          </div>

          {/* Verification Badge Status */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-3 shrink-0">
            {farmer?.verificationStatus === 'verified' ? (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                    {t.farmerBadge}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {farmer.verificationBadge}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    Verified by District Agri Office
                  </span>
                </div>
              </>
            ) : farmer?.verificationStatus === 'pending' ? (
              <>
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Verification In Progress
                  </span>
                  <span className="text-xs text-stone-200">
                    Documents under review by Admin Desk
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-stone-700 text-stone-300 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                    Not Yet Verified
                  </span>
                  <button
                    onClick={() => setActiveTab('verification')}
                    className="text-xs text-emerald-400 underline font-bold"
                  >
                    Upload Land & ID Documents
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 block">Total Harvest Value</span>
          <span className="text-xl font-bold text-stone-900 font-numeric mt-1 block">
            ₹{estimatedHarvestValue.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            100% directly payable to you
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 block">Active Produce Listed</span>
          <span className="text-xl font-bold text-stone-900 font-numeric mt-1 block">
            {myProducts.length} Crops
          </span>
          <span className="text-[10px] text-stone-500 mt-1 block">
            {totalStockKg} units ready in inventory
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 block">Customer Rating</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-stone-900 font-numeric">
              ★ {averageRating}
            </span>
            <span className="text-xs text-stone-500 font-numeric">({totalReviews} reviews)</span>
          </div>
          <span className="text-[10px] text-stone-500 mt-1 block">
            Verified consumer purchases
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 block">Platform Commission</span>
          <span className="text-xl font-bold text-emerald-800 font-numeric mt-1 block">
            0% (FREE)
          </span>
          <span className="text-[10px] text-stone-500 mt-1 block">
            Subsidized for smallholders
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Crop Inventory Management</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'verification'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Farmer Verification & Documents ({farmer?.documents.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'border-emerald-700 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Mandi vs Direct Sales Analytics</span>
        </button>
      </div>

      {/* Tab Content: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                Current Farm Produce & Live Stock
              </h3>
              <p className="text-xs text-stone-500">
                Update daily morning harvest quantities or add newly picked vegetables & fruits.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Harvest Crop</span>
            </button>
          </div>

          {/* Product Inventory Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Produce Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Consumer Price</th>
                    <th className="py-3 px-4">APMC Mandi Rate</th>
                    <th className="py-3 px-4">Available Stock</th>
                    <th className="py-3 px-4">Quick Adjust Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{p.name}</span>
                            <span className="text-[11px] text-stone-500">{p.harvestTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize text-stone-600">
                        {p.category.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-900 font-numeric">
                        ₹{p.price} / {p.unit}
                      </td>
                      <td className="py-3 px-4 text-stone-400 line-through font-numeric">
                        ₹{p.mandiPriceBenchmark} / {p.unit}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-numeric font-bold px-2 py-0.5 rounded text-xs ${
                            p.stock > 20
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-rose-50 text-rose-800'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 10))}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold"
                            title="Decrease 10 units"
                          >
                            -10
                          </button>
                          <button
                            onClick={() => onUpdateStock(p.id, p.stock + 10)}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold"
                            title="Add 10 units"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => onUpdateStock(p.id, p.stock + 50)}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-bold"
                            title="Harvest new batch +50"
                          >
                            +50 (New Batch)
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Verification & Document Manager */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif-display">
                  Official Farmer Verification Dossier
                </h3>
                <p className="text-xs text-stone-500">
                  Submit government land records, Kisan registration card, and organic test certificates to earn the trusted Verified Producer Badge.
                </p>
              </div>

              <button
                onClick={() => setShowUploadDocModal(true)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit Verification Document</span>
              </button>
            </div>

            {/* Verification Status Overview Box */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-emerald-950 block">
                  Status: {farmer?.verificationBadge || 'Documents Verified'}
                </span>
                <p className="text-emerald-800">
                  Your submitted Land Record (Dharani/Pattadar) and Kisan Credit ID have been verified by the District Agricultural Officer.
                  All your active product listings display the verified farmer emblem to urban consumers.
                </p>
              </div>
            </div>

            {/* Document List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Uploaded & Verified Documents ({farmer?.documents.length || 0})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farmer?.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-stone-900 text-xs block">{doc.title}</span>
                        <span className="text-[11px] text-stone-500 block font-mono">
                          Doc Ref: {doc.documentNumber}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          File: {doc.fileName} · {doc.fileSize} · Uploaded: {doc.uploadedAt}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        doc.status === 'valid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif-display">
              Fair-Trade Economic Realization Report
            </h3>
            <p className="text-xs text-stone-500">
              Comparative analysis showing traditional APMC Mandi middleman price vs. Direct Consumer Platform Earnings.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 block">Conventional Mandi Middleman Take</span>
                <span className="text-2xl font-bold text-stone-800 font-numeric mt-1 block">
                  35% - 42%
                </span>
                <p className="text-[11px] text-stone-500 mt-1">
                  Commission agents, auction brokers, and wholesalers absorb almost half of consumer spend.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold block">KisanSetu Direct Platform</span>
                <span className="text-2xl font-bold text-emerald-950 font-numeric mt-1 block">
                  100% Direct Payout
                </span>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Transferred via DBT or UPI instant settlement. Free for small-scale rural farms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 block">Linked Bank Account / UPI</span>
                <span className="text-sm font-bold text-stone-900 font-mono mt-1 block">
                  {farmer?.bankAccount.upiId || 'saivarshak14@oksbi'}
                </span>
                <p className="text-[11px] text-stone-500 mt-1">
                  Direct settlement enabled after each daily delivery slot completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Harvest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                List Fresh Harvest Crop
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Desi Cherry Tomatoes / Organic Ladyfinger"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Product['category'])}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="vegetables">Farm Vegetables</option>
                    <option value="fruits">Orchard Fruits</option>
                    <option value="grains_pulses">Grains & Pulses</option>
                    <option value="cold_pressed_oils">Cold-Pressed Oils</option>
                    <option value="dairy_honey">Dairy & Honey</option>
                    <option value="spices">Spices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Selling Unit</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value as Product['unit'])}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="bunch">Bunch</option>
                    <option value="dozen">Dozen</option>
                    <option value="liter">Liter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mandi MSP Rate (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newMandiRate}
                    onChange={(e) => setNewMandiRate(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Available Stock
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Description & Soil Care
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Grown with vermicompost and well water..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Publish Harvest Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadDocModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="text-base font-bold text-stone-900 font-serif-display">
                Upload Verification Document
              </h4>
              <button
                onClick={() => setShowUploadDocModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {uploadSuccessMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Document successfully transmitted to Admin Review Desk!</span>
              </div>
            )}

            <form onSubmit={handleDocumentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as FarmerDoc['type'])}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                >
                  <option value="farm_registration">
                    Land Pattadar Passbook / Dharani / 7/12 Extract
                  </option>
                  <option value="kisan_id">Govt Kisan Credit / National Farmer ID</option>
                  <option value="organic_cert">NPOP / PGS Organic Accreditation</option>
                  <option value="soil_health_card">ICAR Govt Soil Health Card</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Telangana Land Revenue Passbook Khata #4920"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Official Registration / Khata Number
                </label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="e.g. DH-TEL-2024-99201"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-dashed border-stone-300 text-center space-y-1">
                <UploadCloud className="w-6 h-6 text-stone-400 mx-auto" />
                <span className="text-xs text-stone-700 font-medium block">
                  Selected File: {docFileSimulated}
                </span>
                <span className="text-[10px] text-stone-400 block">
                  Scanned PDF or High-res JPG (Max 10 MB)
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadDocModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
