// Product Types
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: ProductCategory;
    subcategory?: string;
    colors: ProductColor[];
    sizes?: string[];
    tags: string[];
    styleProfile: StyleProfile;
    stock: number;
    isNew?: boolean;
    isBestseller?: boolean;
    isPreorder?: boolean;
    preorderDate?: string;
}

export type ProductCategory = 'dresses' | 'handbags' | 'jewelry' | 'accessories' | 'shoes';

export interface ProductColor {
    name: string;
    hex: string;
    image?: string;
}

export interface StyleProfile {
    style: StyleType[];
    occasion: OccasionType[];
    colorFamily: ColorFamily[];
    priceRange: PriceRange;
}

export type StyleType = 'casual' | 'formal' | 'party' | 'ethnic' | 'bohemian' | 'minimalist' | 'romantic' | 'edgy';
export type OccasionType = 'office' | 'date-night' | 'wedding' | 'festival' | 'brunch' | 'evening' | 'everyday' | 'vacation';
export type ColorFamily = 'neutral' | 'warm' | 'cool' | 'jewel' | 'pastel' | 'bold' | 'metallic';
export type PriceRange = 'budget' | 'mid' | 'premium' | 'luxury';

// Cart Types
export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: ProductColor;
    selectedSize?: string;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}

// Wishlist Types
export interface WishlistItem {
    product: Product;
    addedAt: Date;
}

// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    addresses: Address[];
    orders: Order[];
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

// Order Types
export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    shippingAddress: Address;
    createdAt: Date;
    estimatedDelivery?: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'online' | 'cod' | 'preorder';

// Style Match Types
export interface StyleMatch {
    dress: Product;
    recommendations: {
        handbags: Product[];
        jewelry: Product[];
        accessories: Product[];
        shoes: Product[];
    };
    totalBundlePrice: number;
    savedAmount: number;
}

// Filter Types
export interface ProductFilters {
    categories: ProductCategory[];
    priceRange: [number, number];
    colors: string[];
    sizes: string[];
    styles: StyleType[];
    occasions: OccasionType[];
    sortBy: SortOption;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'bestseller' | 'name';
