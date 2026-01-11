'use client';

import React from 'react';
import Link from 'next/link';
import './StyleStudioBanner.css';

export default function StyleStudioBanner() {
    return (
        <section className="studio-banner">
            <div className="banner-background">
                <div className="banner-pattern"></div>
            </div>

            <div className="container">
                <div className="banner-content">
                    <div className="banner-text">
                        <span className="banner-label">Exclusive Feature</span>
                        <h2 className="banner-title">
                            Create Your <span className="text-accent">Complete Look</span>
                        </h2>
                        <p className="banner-description">
                            Our Style Studio intelligently matches your dress with the perfect handbag,
                            jewelry, and accessories. Get a complete, perfectly coordinated outfit in seconds.
                        </p>

                        <div className="banner-features">
                            <div className="banner-feature">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Smart Matching</h4>
                                    <p>AI-powered style recommendations</p>
                                </div>
                            </div>

                            <div className="banner-feature">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Bundle & Save</h4>
                                    <p>10% off when you buy the complete look</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/studio" className="btn btn-secondary btn-lg">
                            Try Style Studio
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="banner-visual">
                        <div className="visual-showcase">
                            <div className="showcase-main">
                                <img
                                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
                                    alt="Elegant dress"
                                />
                                <span className="showcase-label">Select Your Dress</span>
                            </div>

                            <div className="showcase-items">
                                <div className="showcase-item">
                                    <img
                                        src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200"
                                        alt="Matching handbag"
                                    />
                                    <span>Handbag</span>
                                </div>
                                <div className="showcase-item">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200"
                                        alt="Matching jewelry"
                                    />
                                    <span>Jewelry</span>
                                </div>
                                <div className="showcase-item">
                                    <img
                                        src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200"
                                        alt="Matching shoes"
                                    />
                                    <span>Shoes</span>
                                </div>
                            </div>

                            <div className="showcase-connector">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14" />
                                    <path d="m19 12-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
