'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { products, categories, formatPrice } from '@/lib/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { ProductCategory, StyleType, SortOption } from '@/types';
import './shop.css';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
    const [selectedStyles, setSelectedStyles] = useState<StyleType[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { toggleItem, isInWishlist } = useWishlist();
    const { addItem } = useCart();

    const styles: StyleType[] = ['casual', 'formal', 'party', 'ethnic', 'bohemian', 'minimalist', 'romantic'];

    // Lock body scroll when filter is open on mobile
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFilterOpen]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedStyles.length > 0) {
            result = result.filter(p =>
                p.styleProfile.style.some(s => selectedStyles.includes(s))
            );
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'bestseller':
                result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
                break;
            default:
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        }

        return result;
    }, [selectedCategory, selectedStyles, priceRange, sortBy]);

    const toggleStyle = (style: StyleType) => {
        setSelectedStyles(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
        );
    };

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedStyles([]);
        setPriceRange([0, 20000]);
        setIsFilterOpen(false);
    };

    return (
        <div className="shop-page">
            {/* Hero */}
            <section className="shop-hero">
                <div className="container">
                    <h1>Shop All</h1>
                    <p>Discover our complete collection of premium fashion and accessories</p>
                </div>
            </section>

            {/* Toolbar */}
            <div className="shop-toolbar">
                <div className="toolbar-left">
                    <button className="filter-toggle" onClick={() => setIsFilterOpen(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="21" y1="4" x2="14" y2="4" />
                            <line x1="10" y1="4" x2="3" y2="4" />
                            <line x1="21" y1="12" x2="12" y2="12" />
                            <line x1="8" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="20" x2="16" y2="20" />
                            <line x1="12" y1="20" x2="3" y2="20" />
                        </svg>
                        Filters
                    </button>
                    <span className="results-count">{filteredProducts.length} products</span>
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="sort-select"
                >
                    <option value="newest">Newest</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                </select>
            </div>

            {/* Filter Overlay */}
            <div
                className={`filter-overlay ${isFilterOpen ? 'open' : ''}`}
                onClick={() => setIsFilterOpen(false)}
            />

            <div className="shop-main">
                {/* Sidebar Filters */}
                <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h2>Filters</h2>
                        <button className="sidebar-close" onClick={() => setIsFilterOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" x2="6" y1="6" y2="18" />
                                <line x1="6" x2="18" y1="6" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="filter-section">
                        <h3>Category</h3>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                <span className="filter-checkbox">
                                    {selectedCategory === 'all' && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    )}
                                </span>
                                All Products
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                                >
                                    <span className="filter-checkbox">
                                        {selectedCategory === cat.id && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="m9 12 2 2 4-4" />
                                            </svg>
                                        )}
                                    </span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Filter */}
                    <div className="filter-section">
                        <h3>Style</h3>
                        <div className="filter-options">
                            {styles.map(style => (
                                <button
                                    key={style}
                                    className={`filter-option ${selectedStyles.includes(style) ? 'active' : ''}`}
                                    onClick={() => toggleStyle(style)}
                                >
                                    <span className="filter-checkbox">
                                        {selectedStyles.includes(style) && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="m9 12 2 2 4-4" />
                                            </svg>
                                        )}
                                    </span>
                                    {style.charAt(0).toUpperCase() + style.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-outline clear-filters" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </aside>

                {/* Products Grid */}
                <div className="shop-products">
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <article key={product.id} className="product-card">
                                <Link href={`/product/${product.slug}`} className="product-image-link">
                                    <div className="product-image">
                                        <img src={product.images[0]} alt={product.name} />
                                        {product.images[1] && (
                                            <img src={product.images[1]} alt={product.name} className="product-image-hover" />
                                        )}
                                        <div className="product-overlay"></div>

                                        <div className="product-badges">
                                            {product.isNew && <span className="badge badge-new">New</span>}
                                            {product.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
                                            {product.originalPrice && (
                                                <span className="badge badge-sale">
                                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                                                </span>
                                            )}
                                        </div>

                                        <div className="product-actions">
                                            <button
                                                className={`action-btn-card ${isInWishlist(product.id) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleItem(product);
                                                }}
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

                    {filteredProducts.length === 0 && (
                        <div className="no-products">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <h3>No products found</h3>
                            <p>Try adjusting your filters to find what you're looking for.</p>
                            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
