import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  History,
  ArrowRight,
  ArrowLeftRight,
  Check,
  AlertCircle,
  Eye,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Tag,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { ManagedImage, ImageVersionHistory } from '../types';
import { ImageRegistryService, AGRICULTURAL_IMAGE_PRESETS, DEFAULT_FALLBACK_IMAGE } from '../services/imageRegistry';

export interface AdminImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetImageId?: string | null;
  targetProduct?: { id: string; name: string; image: string; images?: string[] } | null;
  onImageSaved?: () => void;
}

export const AdminImageManagerModal: React.FC<AdminImageManagerModalProps> = ({
  isOpen,
  onClose,
  targetImageId,
  targetProduct,
  onImageSaved
}) => {
  const [images, setImages] = useState<ManagedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ManagedImage | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'exchange' | 'history'>('upload');

  // New image staging & preview state
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [fileMetadata, setFileMetadata] = useState<{
    fileName?: string;
    fileSize?: string;
    fileType?: string;
    dimensions?: string;
  } | null>(null);

  // Exchange state
  const [exchangeTargetId, setExchangeTargetId] = useState<string>('');

  // Status & feedback
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load all images and identify selected image
  const reloadImages = () => {
    const all = ImageRegistryService.getAllImages();
    setImages(all);

    let active: ManagedImage | undefined;
    if (targetProduct) {
      active = all.find((img) => img.section === 'product' && img.targetId === targetProduct.id);
      if (!active) {
        active = all.find((img) => img.id === `img_prod_${targetProduct.id}`);
      }
    } else if (targetImageId) {
      active = all.find((img) => img.id === targetImageId);
    }

    if (active) {
      setSelectedImage(active);
      setPreviewUrl(active.url);
    } else if (all.length > 0) {
      setSelectedImage(all[0]);
      setPreviewUrl(all[0].url);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reloadImages();
      setErrorMessage(null);
      setSuccessMessage(null);
      setUrlInput('');
    }
  }, [isOpen, targetImageId, targetProduct]);

  if (!isOpen || !selectedImage) return null;

  // Handle local file selection with client & server validation
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const validation = await ImageRegistryService.validateFile(file);
      if (!validation.valid) {
        setErrorMessage(validation.error || 'Invalid file format or size exceeds 10 MB.');
        setIsProcessing(false);
        return;
      }

      const dataUrl = await ImageRegistryService.fileToDataUrl(file);
      setPreviewUrl(dataUrl);
      setFileMetadata({
        fileName: file.name,
        fileSize: validation.fileSize,
        fileType: validation.fileType,
        dimensions: validation.dimensions
      });
      setSuccessMessage(`Valid file "${file.name}" ready to save.`);
    } catch {
      setErrorMessage('Failed to read and process image file.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle URL input preview
  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setFileMetadata({
      fileName: 'External Web URL',
      fileType: 'image/url',
      fileSize: 'Remote Stream'
    });
    setSuccessMessage('Previewing external image URL.');
  };

  // Select from preset library
  const handleSelectPreset = (presetUrl: string, label: string) => {
    setPreviewUrl(presetUrl);
    setFileMetadata({
      fileName: label,
      fileType: 'image/jpeg',
      fileSize: 'Optimized Preset'
    });
    setSuccessMessage(`Selected preset: "${label}".`);
  };

  // Save updated image
  const handleSaveUpdate = () => {
    if (!previewUrl || previewUrl === selectedImage.url) {
      setErrorMessage('Please select or upload a different image before saving.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      ImageRegistryService.updateImage(
        selectedImage.id,
        previewUrl,
        {
          fileName: fileMetadata?.fileName,
          fileSize: fileMetadata?.fileSize,
          fileType: fileMetadata?.fileType,
          dimensions: fileMetadata?.dimensions,
          note: `Updated via Admin Image Manager`
        },
        'Admin'
      );

      setSuccessMessage(`Successfully updated image for "${selectedImage.title}"!`);
      reloadImages();
      if (onImageSaved) onImageSaved();

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update image.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove image (resets to fallback)
  const handleRemoveImage = () => {
    if (window.confirm(`Are you sure you want to remove the image for "${selectedImage.title}"? A verified placeholder will be displayed.`)) {
      setIsProcessing(true);
      try {
        const updated = ImageRegistryService.removeImage(selectedImage.id, 'Admin');
        setSuccessMessage('Image removed and reset to safe fallback.');
        setPreviewUrl(updated.url);
        reloadImages();
        if (onImageSaved) onImageSaved();
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to remove image.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Exchange images
  const handleExecuteExchange = () => {
    if (!exchangeTargetId) {
      setErrorMessage('Please select a target image to exchange with.');
      return;
    }

    setIsProcessing(true);
    try {
      ImageRegistryService.exchangeImages(selectedImage.id, exchangeTargetId, 'Admin');
      setSuccessMessage('Successfully exchanged images!');
      reloadImages();
      if (onImageSaved) onImageSaved();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to exchange images.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Restore previous version from history
  const handleRestoreVersion = (historyItem: ImageVersionHistory) => {
    if (window.confirm(`Restore image version from ${new Date(historyItem.updatedAt).toLocaleDateString()}?`)) {
      setIsProcessing(true);
      try {
        const restored = ImageRegistryService.restoreImage(selectedImage.id, historyItem.id, 'Admin');
        setPreviewUrl(restored.url);
        setSuccessMessage('Successfully restored prior image version!');
        reloadImages();
        if (onImageSaved) onImageSaved();
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to restore image.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-4xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Admin Image Manager
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {selectedImage.section}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 truncate max-w-md">
                Managing: <span className="font-semibold text-white">{selectedImage.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Notices */}
        {errorMessage && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-xs font-bold text-rose-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-rose-800 font-bold">×</button>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs font-bold text-[#007a4d] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#007a4d]" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">×</button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Side-by-Side Comparison: Current vs New Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Current Active Image */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-stone-500 tracking-wider">
                    Current Active Image
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                    {selectedImage.dimensions || 'Standard'}
                  </span>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-white border border-stone-200 flex items-center justify-center relative shadow-inner">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span className="truncate max-w-[200px]">Target: {selectedImage.targetName}</span>
                <button
                  onClick={handleRemoveImage}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove to Fallback</span>
                </button>
              </div>
            </div>

            {/* Right: New Image Preview */}
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-[#007a4d] tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>New Image Preview</span>
                  </span>
                  {previewUrl !== selectedImage.url && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white animate-pulse">
                      Staged for Save
                    </span>
                  )}
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-white border border-emerald-300 flex items-center justify-center relative shadow-inner">
                  <img
                    src={previewUrl || selectedImage.url}
                    alt="Replacement Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-800 font-medium">
                  {fileMetadata?.fileName || 'Ready to commit'}
                </span>
                <button
                  onClick={handleSaveUpdate}
                  disabled={isProcessing || previewUrl === selectedImage.url}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    previewUrl !== selectedImage.url
                      ? 'bg-[#007a4d] hover:bg-[#006841] text-white shadow-md'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>
          </div>

          {/* Operation Tabs: Upload, Presets, Exchange, History */}
          <div className="border-b border-stone-200 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-emerald-50 text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload / File</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'presets'
                  ? 'bg-emerald-50 text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Agricultural Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'exchange'
                  ? 'bg-emerald-50 text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Exchange / Swap</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-emerald-50 text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Version History ({selectedImage.history.length})</span>
            </button>
          </div>

          {/* TAB 1: Upload & URL */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {/* Drag & Drop File Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-emerald-50/20 hover:bg-emerald-50/50"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#007a4d] flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  Click to Browse or Drag Image Here
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Supports JPG, PNG, WebP, SVG up to 10 MB. Server-grade validation and instant persistence.
                </p>
              </div>

              {/* Direct Image URL input */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  Or specify Web Image URL / Path:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/farm-image.jpg or /src/assets/images/..."
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#007a4d]"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="bg-[#007a4d] hover:bg-[#006841] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Preview URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Verified Agricultural Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                Select from verified agricultural photography already packed within the application:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1">
                {AGRICULTURAL_IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset.url, preset.label)}
                    className={`text-left rounded-xl p-2 border transition-all cursor-pointer group flex flex-col justify-between ${
                      previewUrl === preset.url
                        ? 'border-[#007a4d] bg-emerald-50 ring-2 ring-[#007a4d]/20'
                        : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100 mb-1.5 flex items-center justify-center">
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#007a4d] block">
                        {preset.category}
                      </span>
                      <span className="text-xs font-semibold text-stone-800 line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Exchange / Swap with another image */}
          {activeTab === 'exchange' && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold">Image Exchange:</span> Swap the active image of "
                <span className="font-black">{selectedImage.title}</span>" with another image in the website registry. Both products/sections will swap their respective images cleanly.
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  Select Target Image to Exchange with:
                </label>
                <select
                  value={exchangeTargetId}
                  onChange={(e) => setExchangeTargetId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#007a4d]"
                >
                  <option value="">-- Choose target image from catalog --</option>
                  {images
                    .filter((img) => img.id !== selectedImage.id)
                    .map((img) => (
                      <option key={img.id} value={img.id}>
                        [{img.section.toUpperCase()}] {img.title}
                      </option>
                    ))}
                </select>
              </div>

              <button
                onClick={handleExecuteExchange}
                disabled={!exchangeTargetId || isProcessing}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  exchangeTargetId
                    ? 'bg-[#007a4d] hover:bg-[#006841] text-white shadow-sm'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Execute Exchange Now</span>
              </button>
            </div>
          )}

          {/* TAB 4: Version History & One-Click Restore */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">
                  Previous image versions for this item. Click "Restore" to revert back to any prior snapshot.
                </p>
              </div>

              {selectedImage.history.length === 0 ? (
                <div className="p-8 text-center text-stone-400 space-y-1">
                  <History className="w-8 h-8 mx-auto opacity-50" />
                  <p className="text-xs font-bold">No version history yet.</p>
                  <p className="text-[11px]">When you update or exchange this image, previous backups will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto">
                  {selectedImage.history.map((hist, idx) => (
                    <div
                      key={hist.id || idx}
                      className="py-3 px-2 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-xl"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                          <img
                            src={hist.url}
                            alt="Historical version"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-stone-900 truncate">
                            {hist.note || `Version #${selectedImage.history.length - idx}`}
                          </h5>
                          <p className="text-[11px] text-stone-500">
                            Saved on {new Date(hist.updatedAt).toLocaleString()} by {hist.updatedBy}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRestoreVersion(hist)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#007a4d] border border-emerald-300 text-xs font-bold cursor-pointer transition-colors shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore This</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Registry ID: <code className="bg-stone-200 px-1.5 py-0.5 rounded text-[11px]">{selectedImage.id}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
