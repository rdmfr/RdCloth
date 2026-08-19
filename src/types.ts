export type ProductCategory = 
  | 'tees'
  | 'oversized'
  | 'hoodies'
  | 'accessories'
  | 'custom'
  | 'outerwear';

export type ProductBadge = 'NEW' | 'BEST SELLER' | 'LIMITED' | 'SALE' | '';

export type OrderStatus = 
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'PRODUCTION'
  | 'QC'
  | 'READY_TO_SHIP'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type CustomOrderStatus = 
  | 'NEW'
  | 'REVIEWING'
  | 'QUOTED'
  | 'APPROVED'
  | 'PRODUCTION'
  | 'QC'
  | 'COMPLETED'
  | 'REJECTED';

export interface ProductVariant {
  id: string;
  size: string; // S, M, L, XL, XXL
  colorName: string; // Black, Off-White, Charcoal, Vintage Washed Grey
  colorHex: string; // #121212, #f5f5f0, etc.
  stock: number;
  sku: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  angle?: 'front' | 'back' | 'detail' | 'model';
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  artifactCode?: string; // e.g. "RDC / 001"
  chapter?: string; // e.g. "CHAPTER I"
  name: string;
  tagline?: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  collectionId?: string;
  badge?: ProductBadge;
  description: string;
  storyDescription?: string; // Mythological / human story narrative
  symbolism?: { label: string; meaning: string }[];
  details: string[];
  material: string;
  fit: string; // 'Boxy Streetwear Fit' | 'Relaxed Fit' | 'Standard Fit'
  care: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isFeatured?: boolean;
  isNewDrop?: boolean;
  isCustomizable?: boolean;
  isPublished: boolean;
  createdAt: string;
  rating: number;
  reviewCount: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string; // e.g. "DROP 001"
  subtitle: string; // e.g. "START SOMEWHERE."
  description: string;
  bannerImage: string;
  productIds: string[];
  isFeatured?: boolean;
  status: 'ACTIVE' | 'ARCHIVED' | 'UPCOMING';
  releaseDate?: string;
}

export interface CartItem {
  id: string; // generated unique cart row id
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  image: string;
  size: string;
  colorName: string;
  colorHex: string;
  quantity: number;
  isCustom?: boolean;
  customDetails?: {
    apparelType: string;
    printPlacement: string;
    designUrl?: string;
    designFileName?: string;
    printTechnique?: string;
    notes?: string;
  };
}

export interface ShippingAddress {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface ShippingMethod {
  id: string;
  name: string; // 'JNE REG' | 'SICEPAT BEST' | 'J&T EXPRESS' | 'GOSEND'
  description: string;
  cost: number;
  estimatedDays: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  sku: string;
  size: string;
  colorName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  image: string;
  isCustom?: boolean;
  customDetails?: {
    apparelType: string;
    printPlacement: string;
    designUrl?: string;
    notes?: string;
  };
}

export interface Order {
  id: string; // e.g. "RDC-90412"
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingMethod: ShippingMethod;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: 'BANK_TRANSFER' | 'QRIS' | 'EWALLET' | 'COD';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  orderStatus?: OrderStatus;
  status?: OrderStatus;
  trackingNumber?: string; // Resi number
  courier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

export interface CustomOrder {
  id: string; // e.g. "CUST-38291"
  customerName: string;
  whatsapp: string;
  email: string;
  apparelType: string; // T-Shirt Heavyweight, Oversized, Hoodie, Totebag, Cap, Jersey
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
  placement: string; // Front Chest, Back Center, Pocket, Sleeve, Full Front & Back
  printTechnique: string; // DTF, Plastisol, Embroidery
  designFileUrl?: string;
  designFileName?: string;
  notes?: string;
  estimatedPrice: number;
  status: CustomOrderStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  fitFeedback?: 'Runs Small' | 'True to Size' | 'Runs Large';
  sizePurchased?: string;
  image?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface HomepageCMS {
  heroTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroSecondaryImage: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  marqueeText: string;
  featuredDropSubtitle: string;
  brandStoryTitle: string;
  brandStoryText1: string;
  brandStoryText2: string;
  visualBreakQuote: string;
  instagramHandle: string;
  instagramImages: string[];
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  adminWhatsapp: string;
  contactEmail: string;
  instagramUrl: string;
  tiktokUrl: string;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  freeShippingThreshold: number;
  address: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  role?: 'CUSTOMER' | 'ADMIN';
  addresses?: ShippingAddress[];
  createdAt?: string;
}
