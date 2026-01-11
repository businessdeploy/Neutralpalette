import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/components.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Neutral Palette | Premium Women\'s Fashion & Accessories',
    description: 'Discover curated fashion for the modern woman. Shop dresses, handbags, jewelry, and accessories. Use our Style Studio to create complete looks.',
    keywords: 'women fashion, dresses, handbags, jewelry, accessories, style studio, complete looks, fashion matching',
    openGraph: {
        title: 'Neutral Palette | Premium Women\'s Fashion & Accessories',
        description: 'Discover curated fashion for the modern woman. Shop dresses, handbags, jewelry, and accessories.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'Neutral Palette',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body>
                <CartProvider>
                    <WishlistProvider>
                        <div className="page-wrapper">
                            <Header />
                            <main className="main-content">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </WishlistProvider>
                </CartProvider>
            </body>
        </html>
    );
}
