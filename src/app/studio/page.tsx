'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { getDressesForStudio, getStyleMatches, formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import './studio.css';

export default function StudioPage() {
    const dresses = getDressesForStudio();
    const [selectedDress, setSelectedDress] = useState<Product | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const { addItem } = useCart();

    const styleMatch = selectedDress ? getStyleMatches(selectedDress) : null;

    const handleDressSelect = (dress: Product) => {
        setSelectedDress(dress);
        setSelectedItems(new Set());
    };

    const toggleItemSelection = (productId: string) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    const selectAllRecommended = () => {
        if (!styleMatch) return;
        const allIds = [
            ...styleMatch.recommendations.handbags.map(p => p.id),
            ...styleMatch.recommendations.jewelry.map(p => p.id),
            ...styleMatch.recommendations.accessories.map(p => p.id),
            ...styleMatch.recommendations.shoes.map(p => p.id),
        ];
        setSelectedItems(new Set(allIds));
    };

    const getSelectedTotal = () => {
        if (!styleMatch) return 0;
        let total = selectedDress?.price || 0;
        const allProducts = [
            ...styleMatch.recommendations.handbags,
            ...styleMatch.recommendations.jewelry,
            ...styleMatch.recommendations.accessories,
            ...styleMatch.recommendations.shoes,
        ];
        allProducts.forEach(product => {
            if (selectedItems.has(product.id)) {
                total += product.price;
            }
        });
        return total;
    };

    const handleAddToCart = () => {
        if (!selectedDress || !styleMatch) return;

        // Add dress
        addItem(selectedDress, 1, selectedDress.colors[0], selectedDress.sizes?.[0]);

        // Add selected items
        const allProducts = [
            ...styleMatch.recommendations.handbags,
            ...styleMatch.recommendations.jewelry,
            ...styleMatch.recommendations.accessories,
            ...styleMatch.recommendations.shoes,
        ];
        allProducts.forEach(product => {
            if (selectedItems.has(product.id)) {
                addItem(product, 1, product.colors[0], product.sizes?.[0]);
            }
        });
    };

    return (
        <div className="studio-page">
            {/* Hero Section */}
            <section className="studio-hero">
                <div className="container">
                    <div className="studio-hero-content">
                        <span className="studio-label">Style Studio</span>
                        <h1>Create Your Perfect Look</h1>
                        <p>
                            Select a dress and let our intelligent styling algorithm find you the perfect
                            matching handbag, jewelry, and accessories. Build your complete outfit in one go!
                        </p>
                    </div>
                </div>
            </section>

            <div className="studio-main container">
                {/* Step 1: Select a Dress */}
                <section className="studio-section">
                    <div className="studio-step">
                        <span className="step-number">1</span>
                        <div>
                            <h2>Choose Your Dress</h2>
                            <p>Start by selecting a dress that catches your eye</p>
                        </div>
                    </div>

                    <div className="dress-grid">
                        {dresses.map((dress) => (
                            <button
                                key={dress.id}
                                className={`dress-card ${selectedDress?.id === dress.id ? 'selected' : ''}`}
                                onClick={() => handleDressSelect(dress)}
                            >
                                <div className="dress-image">
                                    <img src={dress.images[0]} alt={dress.name} />
                                    {selectedDress?.id === dress.id && (
                                        <div className="dress-selected-badge">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="m9 12 2 2 4-4" />
                                                <circle cx="12" cy="12" r="10" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="dress-info">
                                    <h3>{dress.name}</h3>
                                    <span className="dress-price">{formatPrice(dress.price)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Step 2: View Recommendations */}
                {styleMatch && selectedDress && (
                    <section className="studio-section recommendations-section">
                        <div className="studio-step">
                            <span className="step-number">2</span>
                            <div>
                                <h2>Complete Your Look</h2>
                                <p>We've matched the perfect accessories for your selected dress</p>
                            </div>
                            <button className="btn btn-outline select-all-btn" onClick={selectAllRecommended}>
                                Select All
                            </button>
                        </div>

                        {/* Selected Dress Preview */}
                        <div className="selected-dress-preview">
                            <div className="preview-image">
                                <img src={selectedDress.images[0]} alt={selectedDress.name} />
                            </div>
                            <div className="preview-info">
                                <span className="preview-label">Selected Dress</span>
                                <h3>{selectedDress.name}</h3>
                                <p>{selectedDress.description}</p>
                                <span className="preview-price">{formatPrice(selectedDress.price)}</span>
                            </div>
                        </div>

                        {/* Recommendations Grid */}
                        <div className="recommendations-container">
                            {/* Handbags */}
                            <div className="recommendation-category">
                                <h3 className="category-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                        <path d="M3 6h18" />
                                    </svg>
                                    Matching Handbags
                                </h3>
                                <div className="recommendation-items">
                                    {styleMatch.recommendations.handbags.map((item) => (
                                        <button
                                            key={item.id}
                                            className={`recommendation-card ${selectedItems.has(item.id) ? 'selected' : ''}`}
                                            onClick={() => toggleItemSelection(item.id)}
                                        >
                                            <div className="rec-image">
                                                <img src={item.images[0]} alt={item.name} />
                                                <div className="rec-checkbox">
                                                    {selectedItems.has(item.id) ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4" />
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rec-info">
                                                <h4>{item.name}</h4>
                                                <span className="rec-price">{formatPrice(item.price)}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Jewelry */}
                            <div className="recommendation-category">
                                <h3 className="category-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                    </svg>
                                    Matching Jewelry
                                </h3>
                                <div className="recommendation-items">
                                    {styleMatch.recommendations.jewelry.map((item) => (
                                        <button
                                            key={item.id}
                                            className={`recommendation-card ${selectedItems.has(item.id) ? 'selected' : ''}`}
                                            onClick={() => toggleItemSelection(item.id)}
                                        >
                                            <div className="rec-image">
                                                <img src={item.images[0]} alt={item.name} />
                                                <div className="rec-checkbox">
                                                    {selectedItems.has(item.id) ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4" />
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rec-info">
                                                <h4>{item.name}</h4>
                                                <span className="rec-price">{formatPrice(item.price)}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accessories */}
                            <div className="recommendation-category">
                                <h3 className="category-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2v20" />
                                        <path d="M2 12h20" />
                                    </svg>
                                    Matching Accessories
                                </h3>
                                <div className="recommendation-items">
                                    {styleMatch.recommendations.accessories.map((item) => (
                                        <button
                                            key={item.id}
                                            className={`recommendation-card ${selectedItems.has(item.id) ? 'selected' : ''}`}
                                            onClick={() => toggleItemSelection(item.id)}
                                        >
                                            <div className="rec-image">
                                                <img src={item.images[0]} alt={item.name} />
                                                <div className="rec-checkbox">
                                                    {selectedItems.has(item.id) ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4" />
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rec-info">
                                                <h4>{item.name}</h4>
                                                <span className="rec-price">{formatPrice(item.price)}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Shoes */}
                            <div className="recommendation-category">
                                <h3 className="category-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19.5 12.572l-7.5 7.428m0 0l-7.5-7.428m7.5 7.428V4" />
                                    </svg>
                                    Matching Shoes
                                </h3>
                                <div className="recommendation-items">
                                    {styleMatch.recommendations.shoes.map((item) => (
                                        <button
                                            key={item.id}
                                            className={`recommendation-card ${selectedItems.has(item.id) ? 'selected' : ''}`}
                                            onClick={() => toggleItemSelection(item.id)}
                                        >
                                            <div className="rec-image">
                                                <img src={item.images[0]} alt={item.name} />
                                                <div className="rec-checkbox">
                                                    {selectedItems.has(item.id) ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4" />
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rec-info">
                                                <h4>{item.name}</h4>
                                                <span className="rec-price">{formatPrice(item.price)}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary & Add to Cart */}
                        <div className="studio-summary">
                            <div className="summary-content">
                                <div className="summary-info">
                                    <h3>Your Complete Look</h3>
                                    <p>{1 + selectedItems.size} items selected</p>
                                </div>
                                <div className="summary-pricing">
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <span className="total-price">{formatPrice(getSelectedTotal())}</span>
                                    </div>
                                    {selectedItems.size > 0 && (
                                        <div className="summary-savings">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                            Complete look bundle deals available!
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="btn btn-primary btn-lg add-look-btn"
                                    onClick={handleAddToCart}
                                >
                                    Add Complete Look to Cart
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
