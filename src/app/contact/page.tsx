'use client';

import React, { useState } from 'react';
import './contact.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
            </section>

            <div className="contact-main container">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2>Send us a Message</h2>

                        {isSubmitted ? (
                            <div className="success-message">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                                <h3>Thank You!</h3>
                                <p>We've received your message and will get back to you within 24 hours.</p>
                                <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Your Name *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject *</label>
                                    <select
                                        className="form-input form-select"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="return">Returns & Exchanges</option>
                                        <option value="product">Product Question</option>
                                        <option value="styling">Styling Advice</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message *</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg submit-btn">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <h3>Email Us</h3>
                            <p>hello@neutralpalette.com</p>
                            <p>support@neutralpalette.com</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                            <p>Mon-Sat, 10AM - 7PM IST</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h3>Visit Us</h3>
                            <p>123 Fashion Street</p>
                            <p>Mumbai, Maharashtra 400001</p>
                        </div>

                        <div className="info-card social-card">
                            <h3>Follow Us</h3>
                            <div className="social-links">
                                <a href="#" className="social-link">Instagram</a>
                                <a href="#" className="social-link">Facebook</a>
                                <a href="#" className="social-link">Pinterest</a>
                                <a href="#" className="social-link">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
