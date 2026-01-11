'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import './wishlist.css';

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (item: typeof items[0]) => {
        addItem(item.product, 1, item.product.colors[0], item.product.sizes?.[0]);
        removeItem(item.product.id);
    };

    if (items.length === 0) {
        return (
            <div className="wishlist-page">
                <div className="container">
                    <div className="wishlist-empty">
                        <div className="empty-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </div>
                        <h1>Your Wishlist is Empty</h1>
                        <p>Save items you love to your wishlist and find them here anytime.</p>
                        <Link href="/shop" className="btn btn-primary btn-lg">
                            Start Exploring
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="container">
                <div className="wishlist-header">
                    <h1>My Wishlist</h1>
                    <span className="item-count">{items.length} items</span>
                </div>

                <div className="wishlist-grid">
                    {items.map((item) => (
                        <article key={item.product.id} className="wishlist-card">
                            <Link href={`/product/${item.product.slug}`} className="wishlist-image">
                                <img src={item.product.images[0]} alt={item.product.name} />
                                {item.product.isNew && <span className="badge badge-new">New</span>}
                            </Link>

                            <div className="wishlist-info">
                                <span className="wishlist-category">{item.product.category}</span>
                                <Link href={`/product/${item.product.slug}`}>
                                    <h3 className="wishlist-name">{item.product.name}</h3>
                                </Link>
                                <div className="wishlist-price">
                                    <span className="price-current">{formatPrice(item.product.price)}</span>
                                    {item.product.originalPrice && (
                                        <span className="price-original">{formatPrice(item.product.originalPrice)}</span>
                                    )}
                                </div>
                            </div>

                            <div className="wishlist-actions">
                                <button
                                    className="btn btn-primary add-cart-btn"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.product.id)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" x2="6" y1="6" y2="18" />
                                        <line x1="6" x2="18" y1="6" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
