import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  User as UserIcon,
  LogOut,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Edit2
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { StorageService } from '../services/storage';
import { XivaLogo } from './XivaLogo';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  products: Product[];
  onRefreshProducts: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLoginSuccess,
  onLogout,
  products,
  onRefreshProducts
}) => {
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Product management state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<ProductCategory | 'all'>('all');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // New crop form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newCropCategory, setNewCropCategory] = useState<ProductCategory>('vegetables');
  const [newCropPrice, setNewCropPrice] = useState(50);
  const [newCropStock, setNewCropStock] = useState(200);
  const [newCropUnit, setNewCropUnit] = useState('kg');
  const [newCropDesc, setNewCropDesc] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const success = StorageService.loginAdmin(username, password);
    if (success) {
      onLoginSuccess();
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid administrator credentials. Access denied.');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    StorageService.updateProduct(editingProduct);
    onRefreshProducts();
    setSaveNotice(`"${editingProduct.name}" successfully updated in live catalog.`);
    setEditingProduct(null);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      StorageService.deleteProduct(id);
      onRefreshProducts();
      setSaveNotice(`"${name}" removed from catalog.`);
      setTimeout(() => setSaveNotice(null), 3000);
    }
  };

  const handleAddNewCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const newProd: Product = {
      id: `crop_${Date.now()}`,
      farmerId: 'farm_01',
      farmerName: 'Verified Organic Producer',
      farmerVillage: 'Mandya Valley',
      farmerVerified: true,
      name: newCropName.trim(),
      category: newCropCategory,
      price: Number(newCropPrice),
      unit: newCropUnit,
      stock: Number(newCropStock),
      harvestTime: 'Fresh harvest',
      harvestDate: new Date().toISOString().split('T')[0],
      farmDistanceKm: 20,
      organicCertification: 'NPOP Certified Organic',
      image: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg',
      description: newCropDesc.trim() || 'Organically cultivated without synthetic pesticides.',
      nutrition: 'Rich in natural macro and micro nutrients.',
      rating: 5.0,
      reviewCount: 0
    };

    StorageService.addProduct(newProd);
    onRefreshProducts();
    setShowAddForm(false);
    setNewCropName('');
    setNewCropDesc('');
    setSaveNotice(`"${newProd.name}" added to ${newProd.category}.`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const filtered = products.filter(
    (p) => selectedFilterCategory === 'all' || p.category === selectedFilterCategory
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Not Authenticated: Administrator Login Screen */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <XivaLogo layout="vertical" size="md" showSubtitle={true} subtitleText="Administrator Gateway" />
              </div>
              <p className="text-xs text-stone-500">
                This area is restricted to authorized platform administrators. Please authenticate to manage products and store settings.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Administrator Username / Email
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin@xiva.org"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm text-xs cursor-pointer"
              >
                Authenticate & Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated: Protected Admin Product Management Portal */
          <div className="space-y-6">
            {/* Header with Logout Option */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                    Administrator Product Management
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                    Session Active
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update crop prices, available inventory stock, and catalog items derived from the official PDF table.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddForm ? 'Close New Form' : 'Add New Crop'}</span>
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Terminate Administrator Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {saveNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold">{saveNotice}</span>
              </div>
            )}

            {/* Add New Crop Form */}
            {showAddForm && (
              <form onSubmit={handleAddNewCrop} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Add Crop to PDF Catalog
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Crop Name</label>
                    <input
                      type="text"
                      required
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      placeholder="e.g. Saffron / Pearl Millet"
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Category (PDF)</label>
                    <select
                      value={newCropCategory}
                      onChange={(e) => setNewCropCategory(e.target.value as ProductCategory)}
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
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
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newCropPrice}
                      onChange={(e) => setNewCropPrice(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Available Stock</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newCropStock}
                      onChange={(e) => setNewCropStock(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Unit</label>
                    <input
                      type="text"
                      required
                      value={newCropUnit}
                      onChange={(e) => setNewCropUnit(e.target.value)}
                      placeholder="kg / dozen / g"
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-800 text-white font-bold text-xs rounded hover:bg-emerald-900"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            )}

            {/* Edit Single Product Modal Overlay */}
            {editingProduct && (
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-300 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Editing: {editingProduct.name}
                  </h4>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="text-stone-400 hover:text-stone-700 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Crop Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full text-xs p-2 rounded border border-stone-300 bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Price (₹)</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full text-xs p-2 rounded border border-stone-300 bg-white font-numeric"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Stock ({editingProduct.unit})</label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                        className="w-full text-xs p-2 rounded border border-stone-300 bg-white font-numeric"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-3 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-800 text-white font-bold text-xs rounded hover:bg-emerald-900 flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Filter by PDF Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-500 font-bold mr-1">Category:</span>
              {(['all', 'cereals', 'pulses', 'vegetables', 'fruits', 'spices', 'exotic'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    selectedFilterCategory === cat
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Table */}
            <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Crop Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">Stock</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filtered.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-stone-900">{prod.name}</td>
                      <td className="py-2.5 px-3 capitalize text-stone-600">{prod.category}</td>
                      <td className="py-2.5 px-3 font-numeric font-bold text-emerald-900">
                        ₹{prod.price} / {prod.unit}
                      </td>
                      <td className="py-2.5 px-3 font-numeric">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            prod.stock > 10 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                          }`}
                        >
                          {prod.stock} {prod.unit}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1 hover:bg-stone-100 text-stone-600 hover:text-emerald-800 rounded"
                            title="Edit Crop"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-1 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded"
                            title="Delete Crop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
