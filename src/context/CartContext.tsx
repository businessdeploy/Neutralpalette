'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductColor } from '@/types';

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    addItem: (product: Product, quantity: number, color: ProductColor, size?: string) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'neutral-palette-cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse cart from localStorage');
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const addItem = (product: Product, quantity: number, color: ProductColor, size?: string) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.product.id === product.id &&
                    item.selectedColor.hex === color.hex &&
                    item.selectedSize === size
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }

            return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
        });
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const isInCart = (productId: string) => {
        return items.some(item => item.product.id === productId);
    };

    return (
        <CartContext.Provider value={{
            items,
            itemCount,
            subtotal,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            isInCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
