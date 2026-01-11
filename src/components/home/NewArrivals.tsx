'use client';

import React from 'react';
import Link from 'next/link';
import { getNewArrivals, formatPrice } from '@/lib/products';
import { useWishlist } from '@/context/WishlistContext';
import '../home/BestSellers.css';

export default function NewArrivals() {
    const products = getNewArrivals();
    const { toggleItem, isInWishlist } = useWishlist();

    return (
        <section className="bestsellers section" style={{ background: 'var(--color-background)' }}>
            <div className="container">
                <div className="section-header">
                    <div className="section-title">
                        <h2>New Arrivals</h2>
                        <p>Just landed — the latest additions to our collection</p>
                    </div>
                    <Link href="/shop?sort=newest" className="btn btn-outline">
                        View All New
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

                                    <div className="product-badges">
                                        <span className="badge badge-new">New</span>
                                    </div>

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
