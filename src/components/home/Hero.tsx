'use client';

import React from 'react';
import Link from 'next/link';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-overlay"></div>
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920"
                >
                    <source src="" type="video/mp4" />
                </video>
                <img
                    className="hero-image"
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920"
                    alt="Elegant woman in designer dress"
                />
            </div>

            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-label animate-fadeInUp">New Collection 2026</span>
                    <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        Discover Your
                        <span className="hero-title-accent"> Perfect Style</span>
                    </h1>
                    <p className="hero-description animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Curated fashion pieces designed for the modern woman. From elegant dresses to
                        matching accessories — create your complete look with our Style Studio.
                    </p>
                    <div className="hero-buttons animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <Link href="/shop" className="btn btn-secondary btn-lg">
                            Shop Collection
                        </Link>
                        <Link href="/studio" className="btn btn-outline btn-lg hero-btn-outline">
                            Try Style Studio
                        </Link>
                    </div>
                </div>

                <div className="hero-features animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="hero-feature">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        <span>Premium Quality</span>
                    </div>
                    <div className="hero-feature">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span>Free Shipping</span>
                    </div>
                    <div className="hero-feature">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Style Matching</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll">
                <span>Scroll to explore</span>
                <div className="scroll-indicator">
                    <span></span>
                </div>
            </div>
        </section>
    );
}
