'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import './cart.css';

export default function CartPage() {
    const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

    const shipping = subtotal >= 2999 ? 0 : 199;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="cart-empty">
                        <div className="empty-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <h1>Your Cart is Empty</h1>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/shop" className="btn btn-primary btn-lg">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <span className="item-count">{itemCount} items</span>
                </div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`} className="cart-item">
                                <div className="item-image">
                                    <img src={item.product.images[0]} alt={item.product.name} />
                                </div>

                                <div className="item-details">
                                    <Link href={`/product/${item.product.slug}`} className="item-name">
                                        {item.product.name}
                                    </Link>
                                    <div className="item-options">
                                        <span className="item-color">
                                            <span
                                                className="color-dot"
                                                style={{ backgroundColor: item.selectedColor.hex }}
                                            />
                                            {item.selectedColor.name}
                                        </span>
                                        {item.selectedSize && (
                                            <span className="item-size">Size: {item.selectedSize}</span>
                                        )}
                                    </div>
                                    <span className="item-price">{formatPrice(item.product.price)}</span>
                                </div>

                                <div className="item-actions">
                                    <div className="quantity-selector">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14" />
                                            </svg>
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                        </button>
                                    </div>

                                    <span className="item-total">{formatPrice(item.product.price * item.quantity)}</span>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.product.id)}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="clear-cart-btn" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>
                            {shipping > 0 && (
                                <div className="free-shipping-note">
                                    Add {formatPrice(2999 - subtotal)} more for free shipping
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="promo-code">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                className="form-input promo-input"
                            />
                            <button className="btn btn-outline apply-btn">Apply</button>
                        </div>

                        <Link href="/checkout" className="btn btn-primary btn-lg checkout-btn">
                            Proceed to Checkout
                        </Link>

                        <div className="payment-options">
                            <p>We accept</p>
                            <div className="payment-icons">
                                <span>Visa</span>
                                <span>MC</span>
                                <span>UPI</span>
                                <span>COD</span>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="cart-benefits">
                            <div className="benefit">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                            <div className="benefit">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                    <path d="M21 3v5h-5" />
                                </svg>
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
