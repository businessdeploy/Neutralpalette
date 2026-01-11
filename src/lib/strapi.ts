/**
 * Strapi API Utility Functions
 * Handles all communication with the Strapi CMS backend
 */

import { Product, ProductCategory, StyleProfile } from '@/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Base fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${STRAPI_URL}/api${endpoint}`;

    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Type for Strapi response wrapper
interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

interface StrapiProduct {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice: number | null;
    colors: Array<{ name: string; hex: string }>;
    sizes: string[] | null;
    isNew: boolean;
    isBestseller: boolean;
    stock: number;
    styleProfile: StyleProfile;
    images: Array<{
        id: number;
        url: string;
        formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    }>;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    image: {
        id: number;
        url: string;
    } | null;
}

// Transform Strapi product to frontend Product type
function transformProduct(strapiProduct: StrapiProduct): Product {
    const getImageUrl = (img: { url: string }) => {
        if (img.url.startsWith('http')) return img.url;
        return `${STRAPI_URL}${img.url}`;
    };

    return {
        id: strapiProduct.documentId,
        name: strapiProduct.name,
        slug: strapiProduct.slug,
        description: strapiProduct.description || '',
        price: strapiProduct.price,
        originalPrice: strapiProduct.originalPrice || undefined,
        images: strapiProduct.images?.map(img => getImageUrl(img)) || [],
        category: (strapiProduct.category?.slug || 'accessories') as ProductCategory,
        colors: strapiProduct.colors || [{ name: 'Default', hex: '#000000' }],
        sizes: strapiProduct.sizes || undefined,
        isNew: strapiProduct.isNew || false,
        isBestseller: strapiProduct.isBestseller || false,
        stock: strapiProduct.stock || 0,
        styleProfile: strapiProduct.styleProfile || {
            style: ['casual'],
            occasion: ['everyday'],
            colorFamily: ['neutral'],
            priceRange: 'mid',
        },
    };
}

// ===========================================
// PUBLIC API FUNCTIONS
// ===========================================

/**
 * Fetch all products from Strapi
 */
export async function getStrapiProducts(): Promise<Product[]> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            '/products?populate=*&pagination[pageSize]=100'
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching products from Strapi:', error);
        return [];
    }
}

/**
 * Fetch a single product by slug
 */
export async function getStrapiProductBySlug(slug: string): Promise<Product | null> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            `/products?filters[slug][$eq]=${slug}&populate=*`
        );
        if (response.data.length === 0) return null;
        return transformProduct(response.data[0]);
    } catch (error) {
        console.error('Error fetching product from Strapi:', error);
        return null;
    }
}

/**
 * Fetch products by category
 */
export async function getStrapiProductsByCategory(category: string): Promise<Product[]> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            `/products?filters[category][slug][$eq]=${category}&populate=*`
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
}

/**
 * Fetch all categories from Strapi
 */
export async function getStrapiCategories(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
}>> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
            '/categories?populate=*'
        );
        return response.data.map(cat => ({
            id: cat.documentId,
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            image: cat.image ? `${STRAPI_URL}${cat.image.url}` : '',
        }));
    } catch (error) {
        console.error('Error fetching categories from Strapi:', error);
        return [];
    }
}

/**
 * Fetch bestseller products
 */
export async function getStrapiBestsellers(): Promise<Product[]> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            '/products?filters[isBestseller][$eq]=true&populate=*&pagination[pageSize]=8'
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching bestsellers:', error);
        return [];
    }
}

/**
 * Fetch new arrival products
 */
export async function getStrapiNewArrivals(): Promise<Product[]> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            '/products?filters[isNew][$eq]=true&populate=*&pagination[pageSize]=8'
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        return [];
    }
}

/**
 * Fetch dresses for Style Studio
 */
export async function getStrapiDressesForStudio(): Promise<Product[]> {
    try {
        const response = await fetchAPI<StrapiResponse<StrapiProduct[]>>(
            '/products?filters[category][slug][$eq]=dresses&filters[stock][$gt]=0&populate=*'
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching dresses for studio:', error);
        return [];
    }
}

/**
 * Check if Strapi is available
 */
export async function isStrapiAvailable(): Promise<boolean> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products?pagination[pageSize]=1`);
        return response.ok;
    } catch {
        return false;
    }
}
