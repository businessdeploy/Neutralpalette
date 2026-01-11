'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './account.css';

export default function AccountPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        if (email && password) {
            setIsLoggedIn(true);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="account-page">
                <div className="auth-container">
                    <div className="auth-card">
                        <Link href="/" className="auth-logo">
                            <span className="logo-text">Neutral</span>
                            <span className="logo-accent">Palette</span>
                        </Link>

                        <h1>{isRegistering ? 'Create Account' : 'Welcome Back'}</h1>
                        <p>{isRegistering ? 'Join us and start shopping' : 'Sign in to your account'}</p>

                        <form onSubmit={handleLogin}>
                            {isRegistering && (
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-input" required />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {!isRegistering && (
                                <div className="form-options">
                                    <label className="form-checkbox">
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="forgot-link">Forgot password?</a>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary btn-lg auth-btn">
                                {isRegistering ? 'Create Account' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <button className="btn btn-outline social-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="auth-switch">
                            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={() => setIsRegistering(!isRegistering)}>
                                {isRegistering ? 'Sign In' : 'Create One'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="account-page logged-in">
            <div className="container">
                <div className="account-header">
                    <h1>My Account</h1>
                    <button className="btn btn-outline" onClick={() => setIsLoggedIn(false)}>
                        Sign Out
                    </button>
                </div>

                <div className="account-grid">
                    <aside className="account-nav">
                        <nav>
                            <a href="#" className="nav-item active">Dashboard</a>
                            <a href="#" className="nav-item">Orders</a>
                            <a href="#" className="nav-item">Addresses</a>
                            <a href="#" className="nav-item">Wishlist</a>
                            <a href="#" className="nav-item">Account Settings</a>
                        </nav>
                    </aside>

                    <main className="account-content">
                        <div className="welcome-card">
                            <h2>Welcome back!</h2>
                            <p>From your account dashboard you can view your recent orders, manage your shipping addresses, and edit your account details.</p>
                        </div>

                        <div className="quick-links">
                            <Link href="/shop" className="quick-link-card">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <h3>Continue Shopping</h3>
                                <p>Browse our latest collection</p>
                            </Link>

                            <Link href="/studio" className="quick-link-card">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                </svg>
                                <h3>Style Studio</h3>
                                <p>Create your perfect look</p>
                            </Link>

                            <Link href="/wishlist" className="quick-link-card">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                <h3>Wishlist</h3>
                                <p>View saved items</p>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
