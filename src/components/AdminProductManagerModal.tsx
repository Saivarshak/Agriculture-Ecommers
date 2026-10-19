import React, { useState } from 'react';
import {
  X,
  Search,
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
  Package,
  Sparkles,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { AdminImageManagerModal } from './AdminImageManagerModal';

interface AdminProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onEditProduct: (product: Product) => void;
  onAddNewProduct: () => void;
  onDeleteProduct: (productId: string, productName: string) => void;
  onNavigateToAdminStudio: () => void;
}

export const AdminProductManagerModal: React.FC<AdminProductManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onEditProduct,
  onAddNewProduct,
  onDeleteProduct,
  onNavigateToAdminStudio
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedImageProduct, setSelectedImageProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-5 relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                Admin Product Catalog & Editor
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Select any existing product to update its pricing, stock, name, image, or badge
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAddNewProduct();
              }}
              className="inline-flex items-center gap-1.5 bg-[#007a4d] hover:bg-[#006841] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Crop</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-stone-50 text-xs text-stone-900 pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#007a4d] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'cereals', 'pulses', 'vegetables', 'fruits', 'spices', 'exotic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-[#007a4d] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product List Table / Grid */}
        <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 max-h-[50vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              No products match your search or filter.
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 sm:p-4 hover:bg-stone-50/80 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900 truncate">
                        {prod.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 capitalize shrink-0">
                        {prod.category}
                      </span>
                      {prod.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#007a4d] border border-emerald-200 shrink-0">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                      <span className="font-numeric font-bold text-stone-900">
                        ₹{prod.price} / {prod.unit}
                      </span>
                      <span>•</span>
                      <span>Stock: <strong className="text-stone-700">{prod.stock} {prod.unit}</strong></span>
                      {prod.discountPercent ? (
                        <>
                          <span>•</span>
                          <span className="text-[#007a4d] font-bold">{prod.discountPercent}% OFF</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onEditProduct(prod)}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-[#007a4d] text-[#007a4d] hover:text-white font-bold text-xs px-3 py-2 rounded-xl border border-emerald-200 hover:border-[#007a4d] transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setSelectedImageProduct(prod)}
                    className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-[#007a4d] font-bold text-xs px-2.5 py-2 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer"
                    title="Change / Manage Crop Image"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Image</span>
                  </button>

                  <button
                    onClick={() => onDeleteProduct(prod.id, prod.name)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info & Go to Admin Studio */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
          <span className="text-stone-500">
            Showing <strong>{filtered.length}</strong> of {products.length} total products
          </span>

          <button
            onClick={() => {
              onClose();
              onNavigateToAdminStudio();
            }}
            className="inline-flex items-center gap-1 text-[#007a4d] hover:text-[#005c3a] font-bold cursor-pointer transition-colors"
          >
            <span>Open Full Admin Studio Section</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Direct Image Manager for selected product */}
      {selectedImageProduct && (
        <AdminImageManagerModal
          isOpen={Boolean(selectedImageProduct)}
          targetProduct={selectedImageProduct}
          targetImageId={`img_prod_${selectedImageProduct.id}`}
          onClose={() => setSelectedImageProduct(null)}
          onImageSaved={() => {
            // Updated
          }}
        />
      )}
    </div>
  );
};
