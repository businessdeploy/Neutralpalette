'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import './Header.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { itemCount: cartCount } = useCart();
    const { itemCount: wishlistCount } = useWishlist();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const shopLinks = [
        { href: '/shop', label: 'Shop All' },
        { href: '/shop/dresses', label: 'Dresses' },
        { href: '/shop/handbags', label: 'Handbags' },
        { href: '/shop/jewelry', label: 'Jewelry' },
        { href: '/shop/accessories', label: 'Accessories' },
        { href: '/shop/shoes', label: 'Shoes' },
    ];

    const moreLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
        { href: '/account', label: 'My Account' },
    ];

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <p>Free Shipping on Orders Above ₹2,999 | Use Code: STYLE10 for 10% Off</p>
            </div>

            <div className="header-main">
                <div className="header-container">
                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    {/* Logo */}
                    <Link href="/" className="logo">
                        <span className="logo-text">Neutral</span>
                        <span className="logo-accent">Palette</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        {/* Shop Dropdown */}
                        <div
                            className="nav-dropdown"
                            onMouseEnter={() => setActiveDropdown('shop')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="nav-link nav-dropdown-trigger">
                                Shop
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>
                            <div className={`nav-dropdown-menu ${activeDropdown === 'shop' ? 'open' : ''}`}>
                                {shopLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="dropdown-link">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/studio" className="nav-link nav-link-highlight">
                            Style Studio
                        </Link>

                        <Link href="/about" className="nav-link">
                            About
                        </Link>

                        <Link href="/contact" className="nav-link">
                            Contact
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <button
                            className="action-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Search"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>

                        <Link href="/wishlist" className="action-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
                        </Link>

                        <Link href="/cart" className="action-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
                        </Link>

                        <Link href="/account" className="action-btn action-btn-account">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 1 0-16 0" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className={`search-bar ${isSearchOpen ? 'search-bar-open' : ''}`}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for dresses, handbags, jewelry..."
                            className="search-input"
                        />
                        <button className="search-submit">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Navigation */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <div className="mobile-menu-header">
                    <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="logo-text">Neutral</span>
                        <span className="logo-accent">Palette</span>
                    </Link>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" x2="6" y1="6" y2="18" />
                            <line x1="6" x2="18" y1="6" y2="18" />
                        </svg>
                    </button>
                </div>

                <nav className="mobile-nav">
                    <div className="mobile-nav-section">
                        <span className="mobile-nav-label">Shop</span>
                        {shopLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="mobile-nav-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mobile-nav-section">
                        <Link
                            href="/studio"
                            className="mobile-nav-link mobile-nav-link-highlight"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ✨ Style Studio
                        </Link>
                    </div>

                    <div className="mobile-nav-section">
                        <span className="mobile-nav-label">More</span>
                        {moreLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="mobile-nav-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="mobile-menu-footer">
                    <div className="mobile-social">
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Pinterest">PIN</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

