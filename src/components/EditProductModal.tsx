import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  DollarSign,
  Package,
  Sparkles,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ImageRegistryService } from '../services/imageRegistry';

export const PRODUCT_IMAGE_PRESETS = [
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

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Product) => void;
  onDelete?: (productId: string, productName: string) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handlePriceChange = (newPrice: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      const original = prev.originalPrice || Math.round(newPrice * 1.15);
      const discount = original > newPrice ? Math.round(((original - newPrice) / original) * 100) : 0;
      return {
        ...prev,
        price: newPrice,
        discountPercent: discount
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    ImageRegistryService.updateProductImageDirect(formData.id, formData.image, formData.images);
    onSave(formData);
    setSuccessMessage('Product updated successfully!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                Edit Product
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Admin updates will sync immediately with the live storefront
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-emerald-800 text-sm font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Product Title / Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-white text-sm text-stone-900 rounded-xl px-4 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] focus:ring-2 focus:ring-[#007a4d]/20 transition-all font-semibold"
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value as ProductCategory)}
                className="w-full bg-white text-sm text-stone-900 rounded-xl px-4 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] transition-all font-semibold"
              >
                <option value="cereals">Cereals & Grains</option>
                <option value="pulses">Pulses & Lentils</option>
                <option value="vegetables">Farm Fresh Vegetables</option>
                <option value="fruits">Orchard Fruits</option>
                <option value="spices">Aromatic Spices</option>
                <option value="exotic">Exotic & Cold-Pressed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Product Badge / Pill
              </label>
              <select
                value={formData.badge || 'Organic'}
                onChange={(e) => handleChange('badge', e.target.value)}
                className="w-full bg-white text-sm text-stone-900 rounded-xl px-4 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] transition-all font-semibold"
              >
                <option value="Organic">Organic</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Popular">Popular</option>
                <option value="Heavy Duty">Heavy Duty</option>
                <option value="Eco Friendly">Eco Friendly</option>
              </select>
            </div>
          </div>

          {/* Pricing Row: Current Price, Original Price, Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Current Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.price}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full bg-white text-sm text-stone-900 rounded-xl pl-8 pr-3 py-2 border border-stone-300 focus:outline-none focus:border-[#007a4d] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Original Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice || Math.round(formData.price * 1.15)}
                  onChange={(e) => {
                    const orig = Number(e.target.value);
                    const disc = orig > formData.price ? Math.round(((orig - formData.price) / orig) * 100) : 0;
                    setFormData((prev) => prev ? { ...prev, originalPrice: orig, discountPercent: disc } : null);
                  }}
                  className="w-full bg-white text-sm text-stone-900 rounded-xl pl-8 pr-3 py-2 border border-stone-300 focus:outline-none focus:border-[#007a4d] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Discount Tag
              </label>
              <div className="h-9.5 flex items-center px-3 bg-emerald-100/70 border border-emerald-300 text-[#007a4d] font-bold text-xs rounded-xl">
                {formData.discountPercent ? `${formData.discountPercent}% OFF` : 'No Discount'}
              </div>
            </div>
          </div>

          {/* Stock & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Available Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => handleChange('stock', Number(e.target.value))}
                className="w-full bg-white text-sm text-stone-900 rounded-xl px-4 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Unit of Measure *
              </label>
              <input
                type="text"
                required
                placeholder="kg, 500g, packet, litre"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full bg-white text-sm text-stone-900 rounded-xl px-4 py-2.5 border border-stone-300 focus:outline-none focus:border-[#007a4d] transition-all font-semibold"
              />
            </div>
          </div>

          {/* Image Selection with Upload, Presets, and URL */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Primary Product Image
              </label>
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('edit-product-file-input');
                  if (input) input.click();
                }}
                className="text-xs font-bold text-[#007a4d] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Upload from Device</span>
              </button>
              <input
                id="edit-product-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const validation = await ImageRegistryService.validateFile(file);
                    if (!validation.valid) {
                      alert(validation.error || 'Invalid image file.');
                      return;
                    }
                    const dataUrl = await ImageRegistryService.fileToDataUrl(file);
                    handleChange('image', dataUrl);
                  } catch {
                    alert('Failed to upload image file.');
                  }
                }}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 rounded-xl border border-stone-200 overflow-hidden bg-stone-100 shrink-0 flex items-center justify-center p-1">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Image URL, upload file, or choose preset below"
                className="flex-1 bg-white text-xs text-stone-800 rounded-xl px-3 py-2 border border-stone-300 focus:outline-none focus:border-[#007a4d]"
              />
            </div>

            {/* Presets Grid */}
            <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
              {PRODUCT_IMAGE_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleChange('image', preset.url)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                    formData.image === preset.url
                      ? 'border-[#007a4d] ring-2 ring-[#007a4d]/20 scale-105'
                      : 'border-stone-200 hover:border-stone-400 opacity-75 hover:opacity-100'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Description & Harvest Details
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full bg-white text-xs text-stone-900 rounded-xl px-4 py-2 border border-stone-300 focus:outline-none focus:border-[#007a4d] transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 gap-3">
            {onDelete ? (
              <button
                type="button"
                onClick={() => onDelete(formData.id, formData.name)}
                className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#007a4d] hover:bg-[#006841] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Update & Save Product</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
