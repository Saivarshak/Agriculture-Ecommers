import { ManagedImage, ImageSection, ImageVersionHistory, ImageValidationResult, Product, CategoryNode, AdCard, SiteStructureConfig } from '../types';
import { StorageService } from './storage';
import { INITIAL_SITE_STRUCTURE, INITIAL_ADS, INITIAL_CATEGORIES } from '../data/mockData';

export const DEFAULT_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%23f4fbf7"/><circle cx="200" cy="200" r="120" fill="%23e1f5eb"/><path d="M200 130C200 130 160 170 160 210C160 232.091 177.909 250 200 250C222.091 250 240 232.091 240 210C240 170 200 130 200 130Z" fill="%23007a4d"/><path d="M200 250V280" stroke="%23007a4d" stroke-width="8" stroke-linecap="round"/><text x="200" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="%23064e3b" text-anchor="middle">AgriShop Verified Produce</text></svg>`;

export const AGRICULTURAL_IMAGE_PRESETS = [
  { label: 'Lush Farm Harvest Spread', url: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg', category: 'General Produce' },
  { label: 'Organic Farmland Sunrise', url: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg', category: 'Landscape & Farmland' },
  { label: 'Tractor Agricultural Field', url: '/src/assets/images/hero_nutrify_tractor_field_1791023332618.jpg', category: 'Farm Equipment' },
  { label: 'Xiva Farm Poster Banner', url: '/src/assets/images/xiva_farm_poster_1791974208276.jpg', category: 'Banners' },
  { label: 'Sustainable Farming Promo', url: '/src/assets/images/sustainable_farming_promo_1791974229133.jpg', category: 'Banners' },
  { label: 'Hybrid Maize & Corn Seeds', url: '/src/assets/images/hybrid_maize_seeds_1791974350656.jpg', category: 'Seeds' },
  { label: 'Organic Urea Fertilizer Sack', url: '/src/assets/images/urea_fertilizer_sack_1791974374444.jpg', category: 'Fertilizers' },
  { label: 'Pure Cold-Pressed Neem Oil', url: '/src/assets/images/neem_oil_pesticide_1791974400785.jpg', category: 'Pesticides' },
  { label: 'Agricultural Power Tiller', url: '/src/assets/images/power_tiller_farm_1791974429189.jpg', category: 'Farm Equipment' },
  { label: 'Enriched Organic Compost', url: '/src/assets/images/organic_compost_sack_1791974460377.jpg', category: 'Fertilizers' },
  { label: 'Submersible Water Pump', url: '/src/assets/images/water_pump_farm_1791974494066.jpg', category: 'Irrigation' },
  { label: 'Heirloom Organic Tomatoes', url: '/src/assets/images/product_heirloom_tomatoes_1791021824051.jpg', category: 'Vegetables' },
  { label: 'Ratnagiri Alphonso Mangoes', url: '/src/assets/images/product_orchard_alphonso_mangoes_1791021846830.jpg', category: 'Fruits' },
  { label: 'Cold-Pressed Chekku Oils', url: '/src/assets/images/product_farm_coldpressed_oil_1791021836230.jpg', category: 'Exotic & Oils' },
  { label: 'Farm Fresh Leafy Greens', url: '/src/assets/images/product_farm_greens_veg_1791169432396.jpg', category: 'Vegetables' },
  { label: 'Heritage Golden Spices', url: '/src/assets/images/product_heritage_spices_1791169443477.jpg', category: 'Spices' },
  { label: 'Pulses, Millets & Grains', url: '/src/assets/images/product_pulses_grains_1791169415931.jpg', category: 'Cereals & Pulses' },
  { label: 'AgriShop Official Emblem', url: '/src/assets/images/xiva_logo.svg', category: 'Brand & Logo' }
];

export class ImageRegistryService {
  /**
   * Initializes or fetches all managed images from localStorage
   */
  static getAllImages(): ManagedImage[] {
    const stored = StorageService.getManagedImages();
    if (stored && stored.length > 0) {
      return this.syncAndAuditRegistry(stored);
    }
    const bootstrapped = this.bootstrapDefaultRegistry();
    StorageService.saveManagedImages(bootstrapped);
    return bootstrapped;
  }

  /**
   * Builds the comprehensive initial image registry covering all products, categories, banners, ads, and logos
   */
  static bootstrapDefaultRegistry(): ManagedImage[] {
    const list: ManagedImage[] = [];
    const now = new Date().toISOString();

    // 1. Site-wide Banners & Promos
    const siteStructure = StorageService.getSiteStructure();
    list.push({
      id: 'img_hero_main',
      title: 'Storefront Center Hero Banner Poster',
      section: 'banner_hero',
      targetId: 'site_hero_bg',
      targetName: 'Marketplace Hero Section',
      url: siteStructure.heroBgImage || '/src/assets/images/xiva_farm_poster_1791974208276.jpg',
      fallbackUrl: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg',
      history: [
        {
          id: `hist_${Date.now()}_1`,
          url: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg',
          updatedAt: '2026-08-01T00:00:00Z',
          updatedBy: 'System Default',
          note: 'Original Scenic Farmland'
        }
      ],
      updatedAt: now,
      updatedBy: 'Admin',
      fileType: 'image/jpeg',
      dimensions: '1920x1080',
      fileSize: '480 KB',
      tags: ['hero', 'banner', 'poster', 'storefront']
    });

    list.push({
      id: 'img_promo_sustainable',
      title: 'Column 3 Sustainable Farming Promo Card',
      section: 'banner_promo',
      targetId: 'site_promo_card',
      targetName: 'Marketplace Column 3 Card 5',
      url: siteStructure.promoCardImage || '/src/assets/images/sustainable_farming_promo_1791974229133.jpg',
      fallbackUrl: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg',
      history: [],
      updatedAt: now,
      updatedBy: 'Admin',
      fileType: 'image/jpeg',
      dimensions: '800x600',
      fileSize: '240 KB',
      tags: ['promo', 'sustainable', 'sidebar']
    });

    list.push({
      id: 'img_brand_logo',
      title: 'AgriShop / Xiva Brand Emblem & Logo',
      section: 'brand_logo',
      targetId: 'site_logo',
      targetName: 'Top Navigation Brand Logo',
      url: siteStructure.logoImage || '/src/assets/images/xiva_logo.svg',
      fallbackUrl: '/src/assets/images/xiva_logo.svg',
      history: [],
      updatedAt: now,
      updatedBy: 'Admin',
      fileType: 'image/svg+xml',
      dimensions: '512x512',
      fileSize: '12 KB',
      tags: ['logo', 'brand', 'emblem', 'header']
    });

    // 2. All Products
    const products = StorageService.getProducts();
    products.forEach((p) => {
      list.push({
        id: `img_prod_${p.id}`,
        title: `${p.name} Card Image`,
        section: 'product',
        targetId: p.id,
        targetName: p.name,
        url: p.image || DEFAULT_FALLBACK_IMAGE,
        fallbackUrl: DEFAULT_FALLBACK_IMAGE,
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/jpeg',
        dimensions: '600x600',
        fileSize: '180 KB',
        tags: ['product', p.category, p.farmerVillage || '']
      });
    });

    // 3. All Hierarchical Categories
    const categories = StorageService.getCategories();
    categories.forEach((cat) => {
      list.push({
        id: `img_cat_${cat.id}`,
        title: `${cat.name} Category Card / Banner`,
        section: 'category',
        targetId: cat.id,
        targetName: cat.name,
        url: cat.image || DEFAULT_FALLBACK_IMAGE,
        fallbackUrl: DEFAULT_FALLBACK_IMAGE,
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/jpeg',
        dimensions: '800x500',
        fileSize: '220 KB',
        tags: ['category', `level_${cat.level}`, cat.slug]
      });
    });

    // 4. Promotional Ad Cards
    const ads = StorageService.getAds();
    ads.forEach((ad) => {
      list.push({
        id: `img_ad_${ad.id}`,
        title: `${ad.title} Ad Banner`,
        section: 'ad',
        targetId: ad.id,
        targetName: ad.title,
        url: ad.image || DEFAULT_FALLBACK_IMAGE,
        fallbackUrl: DEFAULT_FALLBACK_IMAGE,
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/jpeg',
        dimensions: '1200x400',
        fileSize: '310 KB',
        tags: ['ad', 'promotional', ad.placement]
      });
    });

    return list;
  }

  /**
   * Synchronizes registry with any newly added products, categories, or ads
   */
  private static syncAndAuditRegistry(existing: ManagedImage[]): ManagedImage[] {
    const existingTargetIds = new Set(existing.map((item) => `${item.section}:${item.targetId}`));
    const now = new Date().toISOString();
    let hasChanges = false;
    const updatedList = [...existing];

    // Ensure hero banner, promo, and logo entries exist
    const siteStructure = StorageService.getSiteStructure();
    if (!existingTargetIds.has('banner_hero:site_hero_bg')) {
      updatedList.unshift({
        id: 'img_hero_main',
        title: 'Storefront Center Hero Banner Poster',
        section: 'banner_hero',
        targetId: 'site_hero_bg',
        targetName: 'Marketplace Hero Section',
        url: siteStructure.heroBgImage || '/src/assets/images/xiva_farm_poster_1791974208276.jpg',
        fallbackUrl: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg',
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/jpeg',
        dimensions: '1920x1080',
        fileSize: '480 KB',
        tags: ['hero', 'banner', 'poster']
      });
      hasChanges = true;
    }

    if (!existingTargetIds.has('banner_promo:site_promo_card')) {
      updatedList.push({
        id: 'img_promo_sustainable',
        title: 'Column 3 Sustainable Farming Promo Card',
        section: 'banner_promo',
        targetId: 'site_promo_card',
        targetName: 'Marketplace Column 3 Card 5',
        url: siteStructure.promoCardImage || '/src/assets/images/sustainable_farming_promo_1791974229133.jpg',
        fallbackUrl: '/src/assets/images/hero_farm_produce_spread_1791160693688.jpg',
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/jpeg',
        dimensions: '800x600',
        fileSize: '240 KB',
        tags: ['promo', 'sustainable', 'sidebar']
      });
      hasChanges = true;
    }

    if (!existingTargetIds.has('brand_logo:site_logo')) {
      updatedList.push({
        id: 'img_brand_logo',
        title: 'AgriShop / Xiva Brand Emblem & Logo',
        section: 'brand_logo',
        targetId: 'site_logo',
        targetName: 'Top Navigation Brand Logo',
        url: siteStructure.logoImage || '/src/assets/images/xiva_logo.svg',
        fallbackUrl: '/src/assets/images/xiva_logo.svg',
        history: [],
        updatedAt: now,
        updatedBy: 'Admin',
        fileType: 'image/svg+xml',
        dimensions: '512x512',
        fileSize: '12 KB',
        tags: ['logo', 'brand']
      });
      hasChanges = true;
    }

    // Check products
    const products = StorageService.getProducts();
    products.forEach((p) => {
      const key = `product:${p.id}`;
      if (!existingTargetIds.has(key)) {
        updatedList.push({
          id: `img_prod_${p.id}`,
          title: `${p.name} Card Image`,
          section: 'product',
          targetId: p.id,
          targetName: p.name,
          url: p.image || DEFAULT_FALLBACK_IMAGE,
          fallbackUrl: DEFAULT_FALLBACK_IMAGE,
          history: [],
          updatedAt: now,
          updatedBy: 'Admin',
          fileType: 'image/jpeg',
          dimensions: '600x600',
          fileSize: '180 KB',
          tags: ['product', p.category]
        });
        hasChanges = true;
      }
    });

    if (hasChanges) {
      StorageService.saveManagedImages(updatedList);
    }
    return updatedList;
  }

  /**
   * Updates an image and synchronizes with the associated product, category, banner, or ad
   */
  static updateImage(
    id: string,
    newUrl: string,
    metadata?: {
      fileName?: string;
      fileSize?: string;
      fileType?: string;
      dimensions?: string;
      note?: string;
    },
    updatedBy = 'Admin'
  ): ManagedImage {
    const list = this.getAllImages();
    const idx = list.findIndex((img) => img.id === id);
    if (idx === -1) {
      throw new Error(`Managed image "${id}" not found in registry.`);
    }

    const current = list[idx];
    const previousHistoryItem: ImageVersionHistory = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      url: current.url,
      updatedAt: current.updatedAt,
      updatedBy: current.updatedBy,
      note: metadata?.note || 'Previous Version',
      fileName: current.title,
      fileSize: current.fileSize
    };

    const updatedHistory = [previousHistoryItem, ...current.history].slice(0, 15); // keep up to 15 versions

    const updatedImage: ManagedImage = {
      ...current,
      url: newUrl,
      history: updatedHistory,
      updatedAt: new Date().toISOString(),
      updatedBy,
      fileType: metadata?.fileType || current.fileType || 'image/jpeg',
      dimensions: metadata?.dimensions || current.dimensions || 'Dynamic',
      fileSize: metadata?.fileSize || current.fileSize || 'Optimized',
      isCustomUploaded: true
    };

    list[idx] = updatedImage;
    StorageService.saveManagedImages(list);

    // Synchronize with target entity
    this.syncTargetEntity(updatedImage);

    return updatedImage;
  }

  /**
   * Removes an image association and resets to fallback image
   */
  static removeImage(id: string, updatedBy = 'Admin'): ManagedImage {
    const list = this.getAllImages();
    const idx = list.findIndex((img) => img.id === id);
    if (idx === -1) {
      throw new Error(`Managed image "${id}" not found.`);
    }

    const current = list[idx];
    const previousHistoryItem: ImageVersionHistory = {
      id: `hist_rm_${Date.now()}`,
      url: current.url,
      updatedAt: current.updatedAt,
      updatedBy: current.updatedBy,
      note: 'Version before removal',
      fileSize: current.fileSize
    };

    const updatedImage: ManagedImage = {
      ...current,
      url: current.fallbackUrl || DEFAULT_FALLBACK_IMAGE,
      history: [previousHistoryItem, ...current.history].slice(0, 15),
      updatedAt: new Date().toISOString(),
      updatedBy,
      isCustomUploaded: false
    };

    list[idx] = updatedImage;
    StorageService.saveManagedImages(list);

    this.syncTargetEntity(updatedImage);

    return updatedImage;
  }

  /**
   * Exchanges (swaps) two images while preserving their correct entity mappings
   */
  static exchangeImages(
    sourceId: string,
    targetId: string,
    updatedBy = 'Admin'
  ): { source: ManagedImage; target: ManagedImage } {
    const list = this.getAllImages();
    const srcIdx = list.findIndex((img) => img.id === sourceId);
    const tgtIdx = list.findIndex((img) => img.id === targetId);

    if (srcIdx === -1 || tgtIdx === -1) {
      throw new Error('Both source and target images must exist to perform an exchange.');
    }

    const src = list[srcIdx];
    const tgt = list[tgtIdx];
    const now = new Date().toISOString();

    const newSrcHistory = [
      {
        id: `hist_swap_${Date.now()}_1`,
        url: src.url,
        updatedAt: src.updatedAt,
        updatedBy: src.updatedBy,
        note: `Exchanged with ${tgt.title}`
      },
      ...src.history
    ].slice(0, 15);

    const newTgtHistory = [
      {
        id: `hist_swap_${Date.now()}_2`,
        url: tgt.url,
        updatedAt: tgt.updatedAt,
        updatedBy: tgt.updatedBy,
        note: `Exchanged with ${src.title}`
      },
      ...tgt.history
    ].slice(0, 15);

    const updatedSrc: ManagedImage = {
      ...src,
      url: tgt.url,
      history: newSrcHistory,
      updatedAt: now,
      updatedBy
    };

    const updatedTgt: ManagedImage = {
      ...tgt,
      url: src.url,
      history: newTgtHistory,
      updatedAt: now,
      updatedBy
    };

    list[srcIdx] = updatedSrc;
    list[tgtIdx] = updatedTgt;
    StorageService.saveManagedImages(list);

    this.syncTargetEntity(updatedSrc);
    this.syncTargetEntity(updatedTgt);

    return { source: updatedSrc, target: updatedTgt };
  }

  /**
   * Restores a previously saved version from image history
   */
  static restoreImage(id: string, historyId: string, updatedBy = 'Admin'): ManagedImage {
    const list = this.getAllImages();
    const idx = list.findIndex((img) => img.id === id);
    if (idx === -1) {
      throw new Error(`Managed image "${id}" not found.`);
    }

    const current = list[idx];
    const targetVersion = current.history.find((h) => h.id === historyId);
    if (!targetVersion) {
      throw new Error(`History version "${historyId}" not found for image "${id}".`);
    }

    const currentAsHistory: ImageVersionHistory = {
      id: `hist_pre_restore_${Date.now()}`,
      url: current.url,
      updatedAt: current.updatedAt,
      updatedBy: current.updatedBy,
      note: 'State before restore'
    };

    const remainingHistory = current.history.filter((h) => h.id !== historyId);
    const updatedHistory = [currentAsHistory, ...remainingHistory].slice(0, 15);

    const restoredImage: ManagedImage = {
      ...current,
      url: targetVersion.url,
      history: updatedHistory,
      updatedAt: new Date().toISOString(),
      updatedBy: `${updatedBy} (Restored)`
    };

    list[idx] = restoredImage;
    StorageService.saveManagedImages(list);

    this.syncTargetEntity(restoredImage);

    return restoredImage;
  }

  /**
   * Direct updater for product images from Product Editor modals
   */
  static updateProductImageDirect(
    productId: string,
    newUrl: string,
    additionalImages?: string[],
    updatedBy = 'Admin'
  ): void {
    // 1. Update product in StorageService
    const products = StorageService.getProducts();
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      prod.image = newUrl;
      if (additionalImages) {
        prod.images = additionalImages;
      }
      StorageService.updateProduct(prod);
    }

    // 2. Sync to Image Registry
    const list = this.getAllImages();
    const registryId = `img_prod_${productId}`;
    const item = list.find((img) => img.id === registryId || (img.section === 'product' && img.targetId === productId));

    if (item) {
      this.updateImage(item.id, newUrl, { note: 'Updated from Product Catalog Editor' }, updatedBy);
    } else {
      // Add new registry entry
      const newEntry: ManagedImage = {
        id: registryId,
        title: `${prod?.name || 'Product'} Card Image`,
        section: 'product',
        targetId: productId,
        targetName: prod?.name || 'Product',
        url: newUrl,
        fallbackUrl: DEFAULT_FALLBACK_IMAGE,
        history: [],
        updatedAt: new Date().toISOString(),
        updatedBy
      };
      list.push(newEntry);
      StorageService.saveManagedImages(list);
    }
  }

  /**
   * Synchronizes changes to the underlying storage models (Products, Categories, Ads, SiteStructure)
   */
  static syncTargetEntity(image: ManagedImage): void {
    const { section, targetId, url } = image;

    switch (section) {
      case 'product': {
        const products = StorageService.getProducts();
        const p = products.find((prod) => prod.id === targetId);
        if (p) {
          p.image = url;
          StorageService.updateProduct(p);
        }
        break;
      }

      case 'category': {
        const categories = StorageService.getCategories();
        const cat = categories.find((c) => c.id === targetId);
        if (cat) {
          cat.image = url;
          StorageService.updateCategory(cat);
        }
        break;
      }

      case 'banner_hero': {
        const structure = StorageService.getSiteStructure();
        structure.heroBgImage = url;
        StorageService.saveSiteStructure(structure);
        break;
      }

      case 'banner_promo': {
        const structure = StorageService.getSiteStructure();
        structure.promoCardImage = url;
        StorageService.saveSiteStructure(structure);
        break;
      }

      case 'brand_logo': {
        const structure = StorageService.getSiteStructure();
        structure.logoImage = url;
        StorageService.saveSiteStructure(structure);
        break;
      }

      case 'ad': {
        const ads = StorageService.getAds();
        const ad = ads.find((a) => a.id === targetId);
        if (ad) {
          ad.image = url;
          StorageService.updateAd(ad);
        }
        break;
      }

      default:
        break;
    }
  }

  /**
   * Client-side & server-grade file validation for uploaded images
   */
  static async validateFile(file: File): Promise<ImageValidationResult> {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB

    if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: `Invalid file format "${file.type}". Allowed formats: JPG, PNG, WebP, SVG.`
      };
    }

    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed limit of 10 MB.`
      };
    }

    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    // Extract image dimensions
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            valid: true,
            fileType: file.type,
            fileSize: fileSizeFormatted,
            dimensions: `${img.naturalWidth}x${img.naturalHeight}`
          });
        };
        img.onerror = () => {
          resolve({
            valid: false,
            error: 'Corrupted image file or unreadable binary stream.'
          });
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        resolve({
          valid: false,
          error: 'Failed to read file from disk.'
        });
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Converts a File object into a persistent Data URL string
   */
  static async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Bulk resets all website images back to initial verified agricultural presets
   */
  static resetAllToDefaults(): ManagedImage[] {
    StorageService.resetManagedImages();
    // Also reset siteStructure hero/promo images
    const structure = StorageService.getSiteStructure();
    structure.heroBgImage = '/src/assets/images/xiva_farm_poster_1791974208276.jpg';
    structure.promoCardImage = '/src/assets/images/sustainable_farming_promo_1791974229133.jpg';
    structure.logoImage = '/src/assets/images/xiva_logo.svg';
    StorageService.saveSiteStructure(structure);

    const fresh = this.bootstrapDefaultRegistry();
    StorageService.saveManagedImages(fresh);
    return fresh;
  }
}
