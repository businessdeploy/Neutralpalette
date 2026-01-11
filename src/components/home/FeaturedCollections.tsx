'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/products';
import './FeaturedCollections.css';

export default function FeaturedCollections() {
    return (
        <section className="collections section">
            <div className="container">
                <div className="section-title">
                    <h2>Shop by Category</h2>
                    <p>Explore our carefully curated collections designed for every occasion</p>
                </div>

                <div className="collections-grid">
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            href={`/shop/${category.id}`}
                            className={`collection-card collection-card-${index + 1}`}
                        >
                            <div className="collection-image">
                                <img src={category.image} alt={category.name} />
                                <div className="collection-overlay"></div>
                            </div>
                            <div className="collection-content">
                                <h3 className="collection-title">{category.name}</h3>
                                <p className="collection-description">{category.description}</p>
                                <span className="collection-link">
                                    Shop Now
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
