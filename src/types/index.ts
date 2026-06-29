export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  vendor: Vendor;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  description: string;
  verificationStatus: "verified" | "pending" | "unverified";
}

export interface Review {
  id: string;
  productId: string;
  vendorId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface AIRecommendation {
  productId: string;
  reason: string;
  confidence: number;
}
