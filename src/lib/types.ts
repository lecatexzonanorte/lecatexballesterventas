export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  unit: string;
  weight: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  featured: boolean;
  inStock: boolean;
  stockQty: number;
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'pickup';
  cost: number;
  freeAbove: number | null;
  estimatedDays: string;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  shippingMethod: string;
  paymentMethod: 'credit_card' | 'mercadopago';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
}
