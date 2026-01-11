'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import './checkout.css';

type PaymentMethod = 'online' | 'cod' | 'preorder';
type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const shipping = subtotal >= 2999 ? 0 : 199;
    const codCharges = paymentMethod === 'cod' ? 49 : 0;
    const total = subtotal + shipping + codCharges;

    const steps = [
        { id: 'shipping', label: 'Shipping' },
        { id: 'payment', label: 'Payment' },
        { id: 'review', label: 'Review' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
    };

    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="checkout-empty">
                        <h1>Your cart is empty</h1>
                        <Link href="/shop" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="order-success">
                        <div className="success-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
                        <p className="order-id">Order ID: NP{Date.now().toString().slice(-8)}</p>
                        <Link href="/shop" className="btn btn-primary btn-lg">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                {/* Progress Steps */}
                <div className="checkout-steps">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`checkout-step ${currentStep === step.id ? 'active' : ''} ${steps.findIndex(s => s.id === currentStep) > index ? 'completed' : ''
                                }`}
                        >
                            <span className="step-number">{index + 1}</span>
                            <span className="step-label">{step.label}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout-layout">
                    {/* Form Section */}
                    <div className="checkout-form">
                        {/* Shipping Step */}
                        {currentStep === 'shipping' && (
                            <div className="form-section">
                                <h2>Shipping Information</h2>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={shippingInfo.firstName}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={shippingInfo.lastName}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingInfo.email}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingInfo.phone}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="House number, Street, Locality"
                                        required
                                    />
                                </div>

                                <div className="form-row form-row-3">
                                    <div className="form-group">
                                        <label className="form-label">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingInfo.state}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">PIN Code *</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={shippingInfo.pincode}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg next-btn"
                                    onClick={() => setCurrentStep('payment')}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* Payment Step */}
                        {currentStep === 'payment' && (
                            <div className="form-section">
                                <h2>Payment Method</h2>

                                <div className="payment-methods">
                                    <label className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            checked={paymentMethod === 'online'}
                                            onChange={() => setPaymentMethod('online')}
                                        />
                                        <div className="option-content">
                                            <div className="option-header">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                                    <path d="M2 10h20" />
                                                </svg>
                                                <div>
                                                    <h4>Pay Online</h4>
                                                    <p>Credit/Debit Card, UPI, Net Banking</p>
                                                </div>
                                            </div>
                                            <span className="option-badge recommended">Recommended</span>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                        />
                                        <div className="option-content">
                                            <div className="option-header">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 2v20" />
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                <div>
                                                    <h4>Cash on Delivery</h4>
                                                    <p>Pay when you receive your order (+₹49)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${paymentMethod === 'preorder' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="preorder"
                                            checked={paymentMethod === 'preorder'}
                                            onChange={() => setPaymentMethod('preorder')}
                                        />
                                        <div className="option-content">
                                            <div className="option-header">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 6v6l4 2" />
                                                </svg>
                                                <div>
                                                    <h4>Pre-order</h4>
                                                    <p>Reserve now, pay 50% upfront - Priority shipping</p>
                                                </div>
                                            </div>
                                            <span className="option-badge priority">Priority</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="form-buttons">
                                    <button
                                        className="btn btn-outline back-btn"
                                        onClick={() => setCurrentStep('shipping')}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg next-btn"
                                        onClick={() => setCurrentStep('review')}
                                    >
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Review Step */}
                        {currentStep === 'review' && (
                            <div className="form-section">
                                <h2>Review Your Order</h2>

                                <div className="review-section">
                                    <h3>Shipping Address</h3>
                                    <p>
                                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                                        {shippingInfo.address}<br />
                                        {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}<br />
                                        Phone: {shippingInfo.phone}<br />
                                        Email: {shippingInfo.email}
                                    </p>
                                    <button className="edit-btn" onClick={() => setCurrentStep('shipping')}>Edit</button>
                                </div>

                                <div className="review-section">
                                    <h3>Payment Method</h3>
                                    <p>
                                        {paymentMethod === 'online' && 'Pay Online (Cards, UPI, Net Banking)'}
                                        {paymentMethod === 'cod' && 'Cash on Delivery (+₹49)'}
                                        {paymentMethod === 'preorder' && 'Pre-order (50% upfront, Priority shipping)'}
                                    </p>
                                    <button className="edit-btn" onClick={() => setCurrentStep('payment')}>Edit</button>
                                </div>

                                <div className="review-items">
                                    <h3>Order Items</h3>
                                    {items.map((item) => (
                                        <div key={item.product.id} className="review-item">
                                            <img src={item.product.images[0]} alt={item.product.name} />
                                            <div className="review-item-info">
                                                <h4>{item.product.name}</h4>
                                                <p>{item.selectedColor.name} {item.selectedSize && `• Size ${item.selectedSize}`}</p>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <span className="review-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-buttons">
                                    <button
                                        className="btn btn-outline back-btn"
                                        onClick={() => setCurrentStep('payment')}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg place-order-btn"
                                        onClick={handlePlaceOrder}
                                    >
                                        {paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="checkout-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-items">
                            {items.map((item) => (
                                <div key={item.product.id} className="summary-item">
                                    <img src={item.product.images[0]} alt={item.product.name} />
                                    <div className="summary-item-info">
                                        <h4>{item.product.name}</h4>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                    <span className="summary-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>
                            {codCharges > 0 && (
                                <div className="summary-row">
                                    <span>COD Charges</span>
                                    <span>{formatPrice(codCharges)}</span>
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <div className="secure-checkout">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
