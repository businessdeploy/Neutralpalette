'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, formatPrice, getStyleMatches } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductColor } from '@/types';
import './product.css';

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showStickyBar, setShowStickyBar] = useState(false);

    const { addItem } = useCart();
    const { toggleItem, isInWishlist } = useWishlist();

    // Show sticky bar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyBar(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product) {
        return (
            <div className="product-not-found">
                <h1>Product Not Found</h1>
                <p>The product you're looking for doesn't exist.</p>
                <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
        );
    }

    const styleMatch = product.category === 'dresses' ? getStyleMatches(product) : null;
    const activeColor = selectedColor || product.colors[0];
    const activeSize = selectedSize || product.sizes?.[0];

    const handleAddToCart = () => {
        addItem(product, quantity, activeColor, activeSize);
    };

    return (
        <div className="product-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/shop">Shop</Link>
                    <span>/</span>
                    <Link href={`/shop/${product.category}`}>{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-layout">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="gallery-main">
                            <img src={product.images[selectedImage]} alt={product.name} />

                            <div className="gallery-badges">
                                {product.isNew && <span className="badge badge-new">New</span>}
                                {product.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
                            </div>

                            <button
                                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={() => toggleItem(product)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                            </button>

                            {/* Image Navigation Arrows for Mobile */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        className="gallery-nav gallery-nav-prev"
                                        onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                                        aria-label="Previous image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button
                                        className="gallery-nav gallery-nav-next"
                                        onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                                        aria-label="Next image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Dots for Mobile */}
                            <div className="gallery-dots">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`gallery-dot ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="gallery-thumbs">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="product-details">
                        <span className="product-category-label">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-pricing">
                            <span className="current-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                    <span className="discount-badge">
                                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Color Selection */}
                        <div className="option-group">
                            <label>Color: <span>{activeColor.name}</span></label>
                            <div className="color-options">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.hex}
                                        className={`color-option ${activeColor.hex === color.hex ? 'active' : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes && (
                            <div className="option-group">
                                <label>Size: <span>{activeSize}</span></label>
                                <div className="size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-option ${activeSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <Link href="/size-guide" className="size-guide-link">Size Guide</Link>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="option-group">
                            <label>Quantity</label>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart - Desktop */}
                        <div className="product-actions-main">
                            <button className="btn btn-primary btn-lg add-to-cart-btn" onClick={handleAddToCart}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                Add to Cart
                            </button>
                            <button className="btn btn-outline btn-lg buy-now-btn">
                                Buy Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="trust-badges">
                            <div className="trust-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                            <div className="trust-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                </svg>
                                <span>Free Shipping ₹2,999+</span>
                            </div>
                            <div className="trust-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                    <path d="M21 3v5h-5" />
                                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                    <path d="M8 16H3v5" />
                                </svg>
                                <span>Easy Returns</span>
                            </div>
                        </div>

                        {/* Style Studio CTA for dresses */}
                        {product.category === 'dresses' && styleMatch && (
                            <div className="style-studio-cta">
                                <div className="cta-content">
                                    <h3>Complete Your Look</h3>
                                    <p>Visit our Style Studio to find matching accessories for this dress</p>
                                </div>
                                <Link href="/studio" className="btn btn-secondary">
                                    Open Style Studio
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products Placeholder */}
                <section className="related-section">
                    <h2>You May Also Like</h2>
                    <p>Explore similar products from our collection</p>
                </section>
            </div>

            {/* Mobile Sticky Add to Cart Bar */}
            <div className={`sticky-add-to-cart ${showStickyBar ? 'visible' : ''}`}>
                <div className="sticky-product-info">
                    <span className="sticky-price">{formatPrice(product.price)}</span>
                    <span className="sticky-name">{product.name}</span>
                </div>
                <button className="btn btn-primary sticky-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

