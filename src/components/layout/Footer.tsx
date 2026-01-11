import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <Link href="/" className="footer-logo">
                                <span className="logo-text">Neutral</span>
                                <span className="logo-accent">Palette</span>
                            </Link>
                            <p className="footer-tagline">
                                Curated fashion for the modern woman. Discover your perfect style with our
                                handpicked collection of dresses, accessories, and complete looks.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Pinterest">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" x2="12" y1="17" y2="22" />
                                        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                                        <polygon points="12 15 17 10 7 10 12 15" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Shop Column */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Shop</h4>
                            <ul className="footer-links">
                                <li><Link href="/shop/dresses">Dresses</Link></li>
                                <li><Link href="/shop/handbags">Handbags</Link></li>
                                <li><Link href="/shop/jewelry">Jewelry</Link></li>
                                <li><Link href="/shop/accessories">Accessories</Link></li>
                                <li><Link href="/shop/shoes">Shoes</Link></li>
                                <li><Link href="/studio">Style Studio</Link></li>
                            </ul>
                        </div>

                        {/* Help Column */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Help</h4>
                            <ul className="footer-links">
                                <li><Link href="/contact">Contact Us</Link></li>
                                <li><Link href="/shipping">Shipping Info</Link></li>
                                <li><Link href="/returns">Returns & Exchanges</Link></li>
                                <li><Link href="/faq">FAQs</Link></li>
                                <li><Link href="/size-guide">Size Guide</Link></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Company</h4>
                            <ul className="footer-links">
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                                <li><Link href="/sustainability">Sustainability</Link></li>
                                <li><Link href="/press">Press</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div className="footer-newsletter">
                            <h4 className="footer-heading">Stay Connected</h4>
                            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                            <form className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-btn">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © {currentYear} Neutral Palette. All rights reserved.
                        </p>
                        <div className="footer-legal">
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                        <div className="payment-methods">
                            <span>We Accept:</span>
                            <div className="payment-icons">
                                <span className="payment-icon">Visa</span>
                                <span className="payment-icon">MC</span>
                                <span className="payment-icon">UPI</span>
                                <span className="payment-icon">COD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
