'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface WishlistItem {
    product: Product;
    addedAt: Date;
}

interface WishlistContextType {
    items: WishlistItem[];
    itemCount: number;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    toggleItem: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'neutral-palette-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setItems(parsed.map((item: any) => ({
                    ...item,
                    addedAt: new Date(item.addedAt),
                })));
            } catch (e) {
                console.error('Failed to parse wishlist from localStorage');
            }
        }
        setIsHydrated(true);
    }, []);

    // Save wishlist to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const itemCount = items.length;

    const addItem = (product: Product) => {
        setItems(prev => {
            if (prev.some(item => item.product.id === product.id)) {
                return prev;
            }
            return [...prev, { product, addedAt: new Date() }];
        });
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const toggleItem = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    const isInWishlist = (productId: string) => {
        return items.some(item => item.product.id === productId);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return (
        <WishlistContext.Provider value={{
            items,
            itemCount,
            addItem,
            removeItem,
            toggleItem,
            isInWishlist,
            clearWishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
