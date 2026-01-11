'use client';

import React from 'react';
import Link from 'next/link';
import { getBestsellers, formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import './BestSellers.css';

export default function BestSellers() {
    const products = getBestsellers();
    const { addItem } = useCart();
    const { toggleItem, isInWishlist } = useWishlist();

    return (
        <section className="bestsellers section">
            <div className="container">
                <div className="section-header">
                    <div className="section-title">
                        <h2>Bestsellers</h2>
                        <p>Our most loved pieces, chosen by you</p>
                    </div>
                    <Link href="/shop?sort=bestseller" className="btn btn-outline">
                        View All
                    </Link>
                </div>

                <div className="products-grid">
                    {products.slice(0, 4).map((product) => (
                        <article key={product.id} className="product-card">
                            <Link href={`/product/${product.slug}`} className="product-image-link">
                                <div className="product-image">
                                    <img src={product.images[0]} alt={product.name} />
                                    {product.images[1] && (
                                        <img src={product.images[1]} alt={product.name} className="product-image-hover" />
                                    )}
                                    <div className="product-overlay"></div>

                                    {/* Badges */}
                                    <div className="product-badges">
                                        {product.isNew && <span className="badge badge-new">New</span>}
                                        {product.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
                                        {product.originalPrice && (
                                            <span className="badge badge-sale">
                                                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                                            </span>
                                        )}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="product-actions">
                                        <button
                                            className={`action-btn-card ${isInWishlist(product.id) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleItem(product);
                                            }}
                                            aria-label="Add to wishlist"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="action-btn-card"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addItem(product, 1, product.colors[0], product.sizes?.[0]);
                                            }}
                                            aria-label="Add to cart"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                                <path d="M3 6h18" />
                                                <path d="M16 10a4 4 0 0 1-8 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>

                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <Link href={`/product/${product.slug}`}>
                                    <h3 className="product-name">{product.name}</h3>
                                </Link>
                                <div className="product-price">
                                    <span className="price-current">{formatPrice(product.price)}</span>
                                    {product.originalPrice && (
                                        <span className="price-original">{formatPrice(product.originalPrice)}</span>
                                    )}
                                </div>
                                <div className="product-colors">
                                    {product.colors.map((color) => (
                                        <span
                                            key={color.hex}
                                            className="color-swatch"
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
