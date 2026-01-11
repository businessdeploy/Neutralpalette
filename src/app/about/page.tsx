import React from 'react';
import Link from 'next/link';
import './about.css';

export default function AboutPage() {
    const team = [
        {
            name: 'Priya Sharma',
            role: 'Founder & Creative Director',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        },
        {
            name: 'Ananya Reddy',
            role: 'Head of Styling',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        },
        {
            name: 'Meera Patel',
            role: 'Product Curator',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        },
    ];

    return (
        <div className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="container about-hero-content">
                    <span className="about-label">Our Story</span>
                    <h1>Curating Timeless Fashion for the Modern Woman</h1>
                    <p>
                        We believe every woman deserves to feel confident and beautiful.
                        That's why we created Neutral Palette — where style meets simplicity.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="about-section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-content">
                            <span className="section-label">Our Mission</span>
                            <h2>Making Style Effortless</h2>
                            <p>
                                Founded in 2024, Neutral Palette set out to solve a common problem:
                                the stress of putting together the perfect outfit. We curate premium
                                fashion pieces and use intelligent styling to help you create complete,
                                coordinated looks in seconds.
                            </p>
                            <p>
                                Our signature <strong>Style Studio</strong> feature recommends matching
                                accessories for any dress you choose. Whether it's a date night, office
                                event, or special occasion, we've got you covered.
                            </p>
                            <div className="mission-stats">
                                <div className="stat">
                                    <span className="stat-number">10K+</span>
                                    <span className="stat-label">Happy Customers</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Curated Pieces</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Cities Served</span>
                                </div>
                            </div>
                        </div>
                        <div className="mission-image">
                            <img
                                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600"
                                alt="Fashion studio workspace"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">What We Believe</span>
                        <h2>Our Core Values</h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                </svg>
                            </div>
                            <h3>Premium Quality</h3>
                            <p>Every piece is crafted with premium materials and meticulous attention to detail.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h3>Effortless Style</h3>
                            <p>Our Style Studio makes creating the perfect outfit simple, fun, and stress-free.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                            </div>
                            <h3>Customer First</h3>
                            <p>Your satisfaction is our priority. We're here to help you look and feel amazing.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                    <path d="m7 12 3 3 7-7" />
                                </svg>
                            </div>
                            <h3>Sustainable Fashion</h3>
                            <p>We're committed to ethical sourcing and reducing our environmental footprint.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="team-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">The People Behind</span>
                        <h2>Meet Our Team</h2>
                    </div>
                    <div className="team-grid">
                        {team.map((member) => (
                            <div key={member.name} className="team-card">
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Find Your Perfect Style?</h2>
                        <p>Explore our collection and discover looks curated just for you</p>
                        <div className="cta-buttons">
                            <Link href="/shop" className="btn btn-secondary btn-lg">
                                Shop Collection
                            </Link>
                            <Link href="/studio" className="btn btn-outline btn-lg cta-outline">
                                Try Style Studio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
