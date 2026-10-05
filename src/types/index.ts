export type UserRole = 'consumer' | 'farmer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  farmId?: string;
}

export type ProductCategory = 'cereals' | 'pulses' | 'vegetables' | 'fruits' | 'spices' | 'exotic';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'unsubmitted';

export interface FarmerDoc {
  id: string;
  type: 'farm_registration' | 'kisan_id' | 'organic_cert' | 'soil_health_card';
  title: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  documentNumber: string;
  status: 'valid' | 'expired' | 'pending';
}

export interface FarmerProfile {
  id: string;
  farmerName: string;
  email: string;
  phone?: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
  landAcreage: number;
  soilType: string;
  primaryCrops: string[];
  verificationStatus: VerificationStatus;
  verificationBadge: string;
  verifiedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  documents: FarmerDoc[];
  bankAccount: {
    accountNumber: string;
    ifsc: string;
    holderName: string;
    upiId: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  farmFeedback?: string;
  helpfulVotes: number;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerVillage: string;
  farmerVerified: boolean;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  stock: number;
  harvestTime: string;
  harvestDate: string;
  farmDistanceKm: number;
  organicCertification: string;
  image: string;
  description: string;
  nutrition: string;
  mandiPriceBenchmark?: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliverySlot = 'early_morning' | 'evening_fresh' | 'bulk_weekend';

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  slot: DeliverySlot;
  deliveryDate: string;
  specialInstructions?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export interface Order {
  id: string;
  consumerEmail: string;
  consumerName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'placed' | 'confirmed' | 'harvested' | 'transit_cold' | 'out_for_delivery' | 'delivered';
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_cod';
  delivery: DeliveryDetails;
  createdAt: string;
  estimatedDeliveryTime: string;
  liveStage: number; // 0 to 4
  currentLocationDesc: string;
  driverName?: string;
  driverPhone?: string;
  tempCelsius?: number;
}

export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'mr' | 'pa';
