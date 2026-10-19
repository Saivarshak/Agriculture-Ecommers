import {
  FarmerProfile,
  Product,
  Review,
  Order,
  User,
  FarmerDoc,
  LanguageCode,
  AdCard,
  SiteStructureConfig,
  CategoryNode,
  ManagedImage
} from '../types';
import {
  DEFAULT_USER,
  INITIAL_FARMERS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_ADS,
  INITIAL_SITE_STRUCTURE,
  INITIAL_CATEGORIES
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'xiva_user',
  ADMIN_AUTH: 'xiva_admin_authenticated',
  PRODUCTS: 'xiva_products_v3', // bumped so users immediately receive new attractive images
  FARMERS: 'xiva_farmers',
  REVIEWS: 'xiva_reviews',
  ORDERS: 'xiva_orders',
  WISHLIST: 'xiva_wishlist',
  LANGUAGE: 'xiva_language',
  ADS: 'xiva_ads_v2',
  SITE_STRUCTURE: 'xiva_site_structure_v2',
  CATEGORIES: 'xiva_categories_v2',
  IMAGES: 'xiva_managed_images_v2'
};

export class StorageService {
  // User Management
  static getUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static setUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  static logoutUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Admin Session Management (Proper Login -> Authenticated Session -> Logout)
  static isAdminAuthenticated(): boolean {
    return (
      sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true' ||
      localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true'
    );
  }

  static loginAdmin(username: string, pass: string, keepLoggedIn = true): boolean {
    const u = username.trim().toLowerCase();
    const validUser = u === 'saivarshak14@gmail.com' || u === 'admin' || u === 'admin@xiva.org';
    const validPass = pass === '1111' || pass === 'admin123';
    
    if (validUser && validPass) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      if (keepLoggedIn) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
      return true;
    }
    return false;
  }

  static logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }

  // Wishlist
  static getWishlist(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static toggleWishlist(productId: string): boolean {
    const list = this.getWishlist();
    const idx = list.indexOf(productId);
    let isAdded = false;
    if (idx !== -1) {
      list.splice(idx, 1);
    } else {
      list.push(productId);
      isAdded = true;
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    return isAdded;
  }

  static isInWishlist(productId: string): boolean {
    return this.getWishlist().includes(productId);
  }

  // Language Preference
  static getLanguage(): LanguageCode {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode) || 'en';
  }

  static setLanguage(lang: LanguageCode): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }

  // Products (Derived exclusively from PDF table)
  static getProducts(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      // Ensure only valid PDF categories exist
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].category) {
        const existingIds = new Set(parsed.map((p: Product) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        if (missing.length > 0) {
          const merged = [...missing, ...parsed];
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }

  static updateProduct(updated: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === updated.id);
    if (idx !== -1) {
      products[idx] = updated;
      this.saveProducts(products);
    }
  }

  static addProduct(product: Product): void {
    const products = this.getProducts();
    products.unshift(product);
    this.saveProducts(products);
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.saveProducts(products);
  }

  static updateProductStock(id: string, newStock: number): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products[idx].stock = Math.max(0, newStock);
      this.saveProducts(products);
    }
  }

  // Farmers
  static getFarmers(): FarmerProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FARMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(INITIAL_FARMERS));
      return INITIAL_FARMERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_FARMERS;
    }
  }

  static saveFarmers(farmers: FarmerProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(farmers));
  }

  static getFarmerById(id: string): FarmerProfile | undefined {
    return this.getFarmers().find((f) => f.id === id);
  }

  static submitFarmerDocument(farmerId: string, doc: Omit<FarmerDoc, 'id' | 'uploadedAt'>): FarmerProfile | undefined {
    const farmers = this.getFarmers();
    const farmer = farmers.find((f) => f.id === farmerId);
    if (farmer) {
      const newDoc: FarmerDoc = {
        ...doc,
        id: `doc_${Date.now()}`,
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      farmer.documents.push(newDoc);
      farmer.verificationStatus = 'pending';
      farmer.verificationBadge = 'Documents Under Review';
      this.saveFarmers(farmers);
      return farmer;
    }
    return undefined;
  }

  static reviewFarmerApplication(farmerId: string, decision: 'approved' | 'rejected', reviewerName: string, reason?: string): void {
    const farmers = this.getFarmers();
    const farmer = farmers.find((f) => f.id === farmerId);
    if (farmer) {
      const isApproved = decision === 'approved';
      farmer.verificationStatus = isApproved ? 'verified' : 'rejected';
      farmer.verificationBadge = isApproved ? 'Govt Certified Organic Producer' : 'Verification Denied';
      farmer.verifiedAt = isApproved ? new Date().toISOString().split('T')[0] : undefined;
      farmer.reviewedBy = reviewerName;
      farmer.rejectionReason = isApproved ? undefined : (reason || 'Incomplete documentation');

      this.saveFarmers(farmers);

      // Sync product farmerVerified flag across all products by this farmer
      const products = this.getProducts();
      let changed = false;
      products.forEach((p) => {
        if (p.farmerId === farmerId) {
          p.farmerVerified = isApproved;
          changed = true;
        }
      });
      if (changed) {
        this.saveProducts(products);
      }
    }
  }

  // Reviews
  static getReviews(): Review[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  static saveReviews(reviews: Review[]): void {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }

  static addReview(review: Omit<Review, 'id' | 'createdAt' | 'helpfulVotes'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      helpfulVotes: 0
    };
    reviews.unshift(newRev);
    this.saveReviews(reviews);

    // Recalculate product rating & reviewCount
    const products = this.getProducts();
    const prod = products.find((p) => p.id === review.productId);
    if (prod) {
      const prodReviews = reviews.filter((r) => r.productId === review.productId);
      const avg = prodReviews.reduce((acc, r) => acc + r.rating, 0) / prodReviews.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewCount = prodReviews.length;
      this.saveProducts(products);
    }

    return newRev;
  }

  static hasVerifiedPurchase(userEmail: string, productId: string): boolean {
    const orders = this.getOrders();
    return orders.some((ord) => 
      ord.consumerEmail.toLowerCase() === userEmail.toLowerCase() &&
      ord.items.some((item) => item.product.id === productId)
    );
  }

  // Orders
  static getOrders(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      const parsed: Order[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map((o) => o.id));
        let merged = false;
        INITIAL_ORDERS.forEach((initOrder) => {
          if (!existingIds.has(initOrder.id)) {
            parsed.push(initOrder);
            merged = true;
          }
        });
        if (merged) {
          localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(parsed));
        }
        return parsed;
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  static saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  static createOrder(order: Order): Order {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);

    // Deduct stock
    const products = this.getProducts();
    order.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.product.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    });
    this.saveProducts(products);

    return order;
  }

  static updateOrderStatus(orderId: string, status: Order['status'], liveStage?: number): Order[] {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      if (liveStage !== undefined) {
        order.liveStage = liveStage;
      } else {
        const stageMap: Record<Order['status'], number> = {
          placed: 0,
          confirmed: 1,
          harvested: 2,
          transit_cold: 3,
          out_for_delivery: 4,
          delivered: 5
        };
        order.liveStage = stageMap[status] ?? order.liveStage;
      }
      this.saveOrders(orders);
    }
    return orders;
  }

  // Ad Cards & Promotional Banners Management
  static getAds(): AdCard[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(INITIAL_ADS));
      return INITIAL_ADS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_ADS;
    } catch {
      return INITIAL_ADS;
    }
  }

  static saveAds(ads: AdCard[]): void {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
  }

  static addAd(ad: AdCard): void {
    const ads = this.getAds();
    ads.unshift(ad);
    this.saveAds(ads);
  }

  static updateAd(updated: AdCard): void {
    const ads = this.getAds();
    const idx = ads.findIndex((a) => a.id === updated.id);
    if (idx !== -1) {
      ads[idx] = updated;
      this.saveAds(ads);
    }
  }

  static deleteAd(id: string): void {
    const ads = this.getAds().filter((a) => a.id !== id);
    this.saveAds(ads);
  }

  // Web Structure & Hero Configuration
  static getSiteStructure(): SiteStructureConfig {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_STRUCTURE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SITE_STRUCTURE, JSON.stringify(INITIAL_SITE_STRUCTURE));
      return INITIAL_SITE_STRUCTURE;
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.heroTitle) {
        return parsed;
      }
      return INITIAL_SITE_STRUCTURE;
    } catch {
      return INITIAL_SITE_STRUCTURE;
    }
  }

  static saveSiteStructure(config: SiteStructureConfig): void {
    localStorage.setItem(STORAGE_KEYS.SITE_STRUCTURE, JSON.stringify(config));
  }

  static resetSiteStructure(): SiteStructureConfig {
    localStorage.setItem(STORAGE_KEYS.SITE_STRUCTURE, JSON.stringify(INITIAL_SITE_STRUCTURE));
    return INITIAL_SITE_STRUCTURE;
  }

  static resetProductsToDefaults(): Product[] {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }

  static resetAdsToDefaults(): AdCard[] {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(INITIAL_ADS));
    return INITIAL_ADS;
  }

  // Dynamic Hierarchical Categories
  static getCategories(): CategoryNode[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    } catch {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
  }

  static saveCategories(categories: CategoryNode[]): void {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  static addCategory(category: CategoryNode): CategoryNode[] {
    const categories = this.getCategories();
    // Check if ID already exists
    const exists = categories.some((c) => c.id === category.id);
    if (exists) {
      category.id = `${category.id}_${Date.now()}`;
    }
    categories.push(category);
    this.saveCategories(categories);
    return categories;
  }

  static updateCategory(updated: CategoryNode): CategoryNode[] {
    const categories = this.getCategories();
    const idx = categories.findIndex((c) => c.id === updated.id);
    if (idx !== -1) {
      categories[idx] = updated;
      this.saveCategories(categories);
    }
    return categories;
  }

  static deleteCategory(categoryId: string): CategoryNode[] {
    let categories = this.getCategories();
    // Recursively collect all descendant IDs to prevent orphaned categories
    const idsToDelete = new Set<string>([categoryId]);
    let addedNew = true;
    while (addedNew) {
      addedNew = false;
      categories.forEach((cat) => {
        if (cat.parentId && idsToDelete.has(cat.parentId) && !idsToDelete.has(cat.id)) {
          idsToDelete.add(cat.id);
          addedNew = true;
        }
      });
    }
    categories = categories.filter((c) => !idsToDelete.has(c.id));
    this.saveCategories(categories);
    return categories;
  }

  static resetCategoriesToDefaults(): CategoryNode[] {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }

  // Centralized Website Images Storage
  static getManagedImages(): ManagedImage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  static saveManagedImages(images: ManagedImage[]): void {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  }

  static resetManagedImages(): void {
    localStorage.removeItem(STORAGE_KEYS.IMAGES);
  }
}


