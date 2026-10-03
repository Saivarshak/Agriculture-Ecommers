import {
  FarmerProfile,
  Product,
  Review,
  Order,
  User,
  FarmerDoc,
  VerificationStatus,
  LanguageCode
} from '../types';
import {
  DEFAULT_USER,
  INITIAL_FARMERS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'kisansetu_user',
  PRODUCTS: 'kisansetu_products',
  FARMERS: 'kisansetu_farmers',
  REVIEWS: 'kisansetu_reviews',
  ORDERS: 'kisansetu_orders',
  LANGUAGE: 'kisansetu_language',
  OFFLINE_MODE: 'kisansetu_offline_mode',
  OFFLINE_QUEUE: 'kisansetu_offline_queue'
};

export class StorageService {
  // User Management
  static getUser(): User {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  }

  static setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  // Language Preference
  static getLanguage(): LanguageCode {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode) || 'en';
  }

  static setLanguage(lang: LanguageCode): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }

  // Offline Simulation
  static getOfflineSimulated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE) === 'true';
  }

  static setOfflineSimulated(val: boolean): void {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE, val ? 'true' : 'false');
  }

  // Products
  static getProducts(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }

  static addProduct(product: Product): void {
    const products = this.getProducts();
    products.unshift(product);
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
      // Set to pending review
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
      farmer.verificationBadge = isApproved ? 'Govt & Land Verified Producer' : 'Verification Denied';
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

  // Check if a user has a verified purchase of a product
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
      return JSON.parse(raw);
    } catch {
      return INITIAL_ORDERS;
    }
  }

  static saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  static createOrder(order: Order, isOffline = false): Order {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);

    // Also deduct stock for purchased items
    const products = this.getProducts();
    order.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.product.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    });
    this.saveProducts(products);

    if (isOffline) {
      this.queueOfflineOrder(order);
    }

    return order;
  }

  // Offline Order Queue
  static getOfflineQueue(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static queueOfflineOrder(order: Order): void {
    const q = this.getOfflineQueue();
    q.push(order);
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(q));
  }

  static clearOfflineQueue(): number {
    const count = this.getOfflineQueue().length;
    localStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
    return count;
  }
}
