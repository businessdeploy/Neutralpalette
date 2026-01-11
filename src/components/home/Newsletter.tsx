'use client';

import React, { useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <section className="newsletter">
            <div className="newsletter-background">
                <div className="newsletter-pattern"></div>
            </div>

            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    <h2 className="newsletter-title">Join the Palette</h2>
                    <p className="newsletter-description">
                        Subscribe to get exclusive access to new collections, style tips, and special offers.
                        Plus, get 15% off your first order!
                    </p>

                    {isSubmitted ? (
                        <div className="newsletter-success">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span>Thank you for subscribing!</span>
                        </div>
                    ) : (
                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="newsletter-input"
                            />
                            <button type="submit" className="btn btn-secondary">
                                Subscribe
                            </button>
                        </form>
                    )}

                    <p className="newsletter-privacy">
                        By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
