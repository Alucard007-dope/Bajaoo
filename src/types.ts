export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isTopSeller?: boolean;
  description?: string;
  specs?: Record<string, string>;
}

export type View = 'home' | 'listing' | 'detail' | 'cart';
