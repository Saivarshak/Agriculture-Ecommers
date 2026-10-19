import React, { useState, useEffect, useMemo } from 'react';
import {
  Image as ImageIcon,
  Search,
  Filter,
  Upload,
  RefreshCw,
  Trash2,
  History,
  ArrowLeftRight,
  Eye,
  RotateCcw,
  Sparkles,
  Grid,
  List,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Tag,
  ExternalLink,
  Plus
} from 'lucide-react';
import { ManagedImage, ImageSection } from '../types';
import { ImageRegistryService } from '../services/imageRegistry';
import { AdminImageManagerModal } from './AdminImageManagerModal';

export interface AdminMediaManagerViewProps {
  onRefreshParentData?: () => void;
}

export const AdminMediaManagerView: React.FC<AdminMediaManagerViewProps> = ({
  onRefreshParentData
}) => {
  const [images, setImages] = useState<ManagedImage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<'all' | ImageSection>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal controls
  const [activeModalImageId, setActiveModalImageId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status banners
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadRegistry = () => {
    const list = ImageRegistryService.getAllImages();
    setImages(list);
  };

  useEffect(() => {
    loadRegistry();
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  // Filtered images
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      if (sectionFilter !== 'all' && img.section !== sectionFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          img.title.toLowerCase().includes(q) ||
          img.targetName.toLowerCase().includes(q) ||
          img.id.toLowerCase().includes(q) ||
          img.section.toLowerCase().includes(q) ||
          (img.tags && img.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [images, sectionFilter, searchQuery]);

  // Summary counts
  const stats = useMemo(() => {
    return {
      total: images.length,
      products: images.filter((i) => i.section === 'product').length,
      categories: images.filter((i) => i.section === 'category').length,
      banners: images.filter((i) => i.section === 'banner_hero' || i.section === 'banner_promo').length,
      ads: images.filter((i) => i.section === 'ad').length,
      customUploads: images.filter((i) => i.isCustomUploaded || i.history.length > 0).length
    };
  }, [images]);

  // Open modal for specific image
  const handleOpenEdit = (imageId: string) => {
    setActiveModalImageId(imageId);
    setIsModalOpen(true);
  };

  // Quick remove
  const handleQuickRemove = (img: ManagedImage) => {
    if (window.confirm(`Are you sure you want to remove the image for "${img.title}"? A verified fallback placeholder will be set.`)) {
      try {
        ImageRegistryService.removeImage(img.id, 'Admin');
        loadRegistry();
        if (onRefreshParentData) onRefreshParentData();
        showNotification(`Image for "${img.title}" reset to fallback.`);
      } catch (err: any) {
        showNotification(err.message || 'Failed to remove image', 'error');
      }
    }
  };

  // Global reset
  const handleResetAllDefaults = () => {
    if (window.confirm('Reset ALL website images back to initial agricultural defaults? Any custom uploaded images will be replaced.')) {
      const fresh = ImageRegistryService.resetAllToDefaults();
      setImages(fresh);
      if (onRefreshParentData) onRefreshParentData();
      showNotification('All website images have been reset to verified agricultural presets.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Notice */}
      {notice && (
        <div
          className={`px-5 py-3 rounded-2xl flex items-center justify-between text-xs font-bold border shadow-xs animate-fadeIn ${
            notice.type === 'success'
              ? 'bg-emerald-50 text-[#007a4d] border-emerald-300'
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {notice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#007a4d]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-stone-400 hover:text-stone-700 font-black">
            ×
          </button>
        </div>
      )}

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Total Images
          </span>
          <span className="text-xl sm:text-2xl font-black text-stone-900 font-numeric">
            {stats.total}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Centralized Assets</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Product Cards
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#007a4d] font-numeric">
            {stats.products}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Catalog Cards</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Categories
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-700 font-numeric">
            {stats.categories}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Hierarchy Banners</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Banners & Hero
          </span>
          <span className="text-xl sm:text-2xl font-black text-sky-700 font-numeric">
            {stats.banners}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Hero & Sidebars</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Ad Cards
          </span>
          <span className="text-xl sm:text-2xl font-black text-indigo-700 font-numeric">
            {stats.ads}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Promos & Offers</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Custom Uploads
          </span>
          <span className="text-xl sm:text-2xl font-black text-teal-700 font-numeric">
            {stats.customUploads}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">With Version History</span>
        </div>
      </div>

      {/* Main Control Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#007a4d]" />
                <span>Website Image Management Registry</span>
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#007a4d]">
                Live Sync Active
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Update, exchange, remove, or restore any image displayed across the entire website. All changes propagate immediately.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                if (images.length > 0) handleOpenEdit(images[0].id);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#007a4d] hover:bg-[#006841] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Media</span>
            </button>

            <button
              onClick={() => {
                loadRegistry();
                if (onRefreshParentData) onRefreshParentData();
                showNotification('Image registry synchronized with database models.');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-300 cursor-pointer transition-colors"
              title="Rescan database models and synchronize"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Registry</span>
            </button>

            <button
              onClick={handleResetAllDefaults}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold cursor-pointer transition-colors"
              title="Reset all images to default agricultural photography"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Search & Section Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by name, product, or section..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#007a4d] transition-all"
            />
          </div>

          {/* Section Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Images' },
              { id: 'product', label: `Products (${stats.products})` },
              { id: 'category', label: `Categories (${stats.categories})` },
              { id: 'banner_hero', label: 'Hero Banners' },
              { id: 'banner_promo', label: 'Promo Cards' },
              { id: 'ad', label: `Ads (${stats.ads})` },
              { id: 'brand_logo', label: 'Brand Logo' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSectionFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  sectionFilter === tab.id
                    ? 'bg-[#007a4d] text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* View Mode Switcher */}
            <div className="border-l border-stone-200 pl-2 ml-1 flex items-center gap-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'table' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Images Display */}
        {filteredImages.length === 0 ? (
          <div className="py-16 text-center text-stone-400 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-stone-700">No images match your filter</h4>
            <p className="text-xs text-stone-500">Try clearing the search box or selecting another section.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group bg-stone-50/80 hover:bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-400/60 p-3.5 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 uppercase tracking-wider">
                      {img.section.replace('_', ' ')}
                    </span>
                    {img.history.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                        <History className="w-2.5 h-2.5" />
                        <span>{img.history.length} rev</span>
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div
                    onClick={() => handleOpenEdit(img.id)}
                    className="aspect-square w-full rounded-xl bg-white border border-stone-200 overflow-hidden flex items-center justify-center relative cursor-pointer group-hover:border-emerald-300 transition-colors shadow-2xs"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-2xs">
                      <Eye className="w-4 h-4" />
                      <span>Manage Image</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-2.5 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-[#007a4d] transition-colors" title={img.title}>
                      {img.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      Target: <strong className="text-stone-700">{img.targetName}</strong>
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span>{img.dimensions || 'Dynamic'}</span>
                      <span>·</span>
                      <span>{img.fileSize || 'Standard'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-3 pt-3 border-t border-stone-200/80 grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => handleOpenEdit(img.id)}
                    className="py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#007a4d] font-bold text-[11px] flex items-center justify-center gap-1 border border-emerald-200/80 cursor-pointer transition-colors"
                    title="Upload or update this image"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Update</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(img.id)}
                    className="py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] flex items-center justify-center gap-1 border border-stone-200 cursor-pointer transition-colors"
                    title="Exchange / Swap with another image"
                  >
                    <ArrowLeftRight className="w-3 h-3" />
                    <span>Swap</span>
                  </button>

                  <button
                    onClick={() => handleQuickRemove(img)}
                    className="py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] flex items-center justify-center gap-1 border border-rose-200 cursor-pointer transition-colors"
                    title="Remove to fallback"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Title & Target</th>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Resolution / Size</th>
                  <th className="py-3 px-4">History</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredImages.map((img) => (
                  <tr key={img.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-2.5 px-4">
                      <div
                        onClick={() => handleOpenEdit(img.id)}
                        className="w-12 h-12 rounded-xl bg-white border border-stone-200 overflow-hidden flex items-center justify-center cursor-pointer hover:border-emerald-400 shrink-0"
                      >
                        <img src={img.url} alt={img.title} className="max-h-full max-w-full object-contain" />
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-stone-900">{img.title}</div>
                      <div className="text-[11px] text-stone-500">Target: {img.targetName}</div>
                      <div className="text-[10px] font-mono text-stone-400">{img.id}</div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200 uppercase">
                        {img.section.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-stone-600">
                      <div>{img.dimensions || 'Standard'}</div>
                      <div className="text-[11px] text-stone-400">{img.fileSize || 'Optimized'}</div>
                    </td>
                    <td className="py-2.5 px-4">
                      {img.history.length > 0 ? (
                        <span className="text-xs font-bold text-amber-700">
                          {img.history.length} previous
                        </span>
                      ) : (
                        <span className="text-stone-400 text-xs">Default</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(img.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#007a4d] font-bold text-xs border border-emerald-300 cursor-pointer"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => handleQuickRemove(img)}
                          className="p-1 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 cursor-pointer"
                          title="Reset to fallback"
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
        )}
      </div>

      {/* Integrated Admin Image Manager Modal */}
      {isModalOpen && (
        <AdminImageManagerModal
          isOpen={isModalOpen}
          targetImageId={activeModalImageId}
          onClose={() => {
            setIsModalOpen(false);
            setActiveModalImageId(null);
            loadRegistry();
          }}
          onImageSaved={() => {
            loadRegistry();
            if (onRefreshParentData) onRefreshParentData();
            showNotification('Image saved and synchronized with website successfully!');
          }}
        />
      )}
    </div>
  );
};
