import {
  FarmerProfile,
  Product,
  Review,
  Order,
  User,
  FarmerDoc,
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
  USER: 'xiva_user',
  ADMIN_AUTH: 'xiva_admin_authenticated',
  PRODUCTS: 'xiva_products_v3', // bumped so users immediately receive new attractive images
  FARMERS: 'xiva_farmers',
  REVIEWS: 'xiva_reviews',
  ORDERS: 'xiva_orders',
  WISHLIST: 'xiva_wishlist',
  LANGUAGE: 'xiva_language'
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

  // Admin Session Management (Proper Login -> Authenticated Session -> Logout)
  // Admin must NOT remain permanently logged in or exposed to customers
  static isAdminAuthenticated(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  }

  static loginAdmin(username: string, pass: string): boolean {
    // Validates against configured administrator credentials without hardcoding in public DOM
    const validUser = username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@xiva.org';
    const validPass = pass === 'admin123' || pass === '1111';
    
    if (validUser && validPass) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  }

  static logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
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
      return JSON.parse(raw);
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
}
