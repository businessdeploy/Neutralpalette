'use client';

import React from 'react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        rating: 5,
        text: 'The Style Studio is absolutely genius! I found the perfect matching accessories for my wedding reception dress. The quality exceeded my expectations.',
        product: 'Midnight Elegance Gown',
    },
    {
        id: 2,
        name: 'Ananya Reddy',
        location: 'Bangalore',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        rating: 5,
        text: 'I love how easy it is to create complete looks. The bundle discount is amazing and the pieces arrived beautifully packaged. Definitely my new favorite store!',
        product: 'Boho Sunset Maxi',
    },
    {
        id: 3,
        name: 'Meera Kapoor',
        location: 'Delhi',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        rating: 5,
        text: 'Premium quality at reasonable prices. The jewelry collection is stunning and the matching algorithm really understands style compatibility.',
        product: 'Layered Gold Necklace Set',
    },
];

export default function Testimonials() {
    return (
        <section className="testimonials section">
            <div className="container">
                <div className="section-title">
                    <h2>What Our Customers Say</h2>
                    <p>Real reviews from women who love Neutral Palette</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <article key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="testimonial-text">"{testimonial.text}"</p>

                            <div className="testimonial-product">
                                Purchased: <span>{testimonial.product}</span>
                            </div>

                            <div className="testimonial-author">
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div>
                                    <h4>{testimonial.name}</h4>
                                    <span>{testimonial.location}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
