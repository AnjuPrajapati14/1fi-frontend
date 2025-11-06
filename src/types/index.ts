export interface ProductVariant {
  id: string;
  name: string;
  storage?: string;
  color: string;
  colorCode: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
}

export interface EMIPlan {
  id: string;
  monthlyAmount: number;
  tenure: number;
  interestRate: number;
  cashback?: number;
  processingFee?: number;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  specifications: Record<string, string>;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}