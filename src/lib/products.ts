import { Product, ProductCategory } from '@/types';

// Sample product data
export const products: Product[] = [
    // DRESSES
    {
        id: 'dress-001',
        name: 'Midnight Elegance Gown',
        slug: 'midnight-elegance-gown',
        description: 'A stunning floor-length gown featuring a deep V-neckline and flowing silhouette. Perfect for evening events and special occasions.',
        price: 12999,
        originalPrice: 15999,
        images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
        ],
        category: 'dresses',
        subcategory: 'evening',
        colors: [
            { name: 'Midnight Black', hex: '#1a1a2e' },
            { name: 'Deep Burgundy', hex: '#722f37' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        tags: ['evening', 'formal', 'gown'],
        styleProfile: {
            style: ['formal', 'romantic'],
            occasion: ['evening', 'wedding'],
            colorFamily: ['jewel'],
            priceRange: 'premium',
        },
        stock: 15,
        isBestseller: true,
    },
    {
        id: 'dress-002',
        name: 'Boho Sunset Maxi',
        slug: 'boho-sunset-maxi',
        description: 'Embrace free-spirited style with this flowing maxi dress featuring intricate bohemian prints and a flattering wrap design.',
        price: 6499,
        images: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
        ],
        category: 'dresses',
        subcategory: 'casual',
        colors: [
            { name: 'Terracotta', hex: '#c96a40' },
            { name: 'Sage Green', hex: '#9caf88' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        tags: ['boho', 'casual', 'maxi'],
        styleProfile: {
            style: ['bohemian', 'casual'],
            occasion: ['brunch', 'vacation'],
            colorFamily: ['warm'],
            priceRange: 'mid',
        },
        stock: 25,
        isNew: true,
    },
    {
        id: 'dress-003',
        name: 'Power Blazer Dress',
        slug: 'power-blazer-dress',
        description: 'Make a statement with this structured blazer dress. Sharp tailoring meets feminine elegance for the modern professional.',
        price: 8999,
        images: [
            'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
        ],
        category: 'dresses',
        subcategory: 'formal',
        colors: [
            { name: 'Classic Black', hex: '#0a0a0a' },
            { name: 'Ivory', hex: '#fffff0' },
            { name: 'Camel', hex: '#c19a6b' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        tags: ['office', 'formal', 'blazer'],
        styleProfile: {
            style: ['formal', 'minimalist'],
            occasion: ['office', 'date-night'],
            colorFamily: ['neutral'],
            priceRange: 'mid',
        },
        stock: 20,
    },
    {
        id: 'dress-004',
        name: 'Ethereal Lace Midi',
        slug: 'ethereal-lace-midi',
        description: 'Delicate lace overlay on a midi-length silhouette creates a dreamy, romantic look perfect for garden parties and receptions.',
        price: 9999,
        images: [
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
        ],
        category: 'dresses',
        subcategory: 'occasion',
        colors: [
            { name: 'Blush Pink', hex: '#f4c2c2' },
            { name: 'Champagne', hex: '#f7e7ce' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        tags: ['romantic', 'lace', 'midi'],
        styleProfile: {
            style: ['romantic', 'party'],
            occasion: ['wedding', 'date-night'],
            colorFamily: ['pastel'],
            priceRange: 'premium',
        },
        stock: 12,
        isNew: true,
    },
    {
        id: 'dress-005',
        name: 'Minimal Slip Dress',
        slug: 'minimal-slip-dress',
        description: 'A timeless slip dress in luxurious satin. Layer it or wear it alone for effortless sophistication.',
        price: 5499,
        images: [
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
            'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800',
        ],
        category: 'dresses',
        subcategory: 'casual',
        colors: [
            { name: 'Champagne', hex: '#f7e7ce' },
            { name: 'Black', hex: '#0a0a0a' },
            { name: 'Olive', hex: '#808000' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        tags: ['minimal', 'satin', 'slip'],
        styleProfile: {
            style: ['minimalist', 'casual'],
            occasion: ['date-night', 'evening', 'everyday'],
            colorFamily: ['neutral'],
            priceRange: 'mid',
        },
        stock: 30,
        isBestseller: true,
    },

    // HANDBAGS
    {
        id: 'bag-001',
        name: 'Structured Leather Tote',
        slug: 'structured-leather-tote',
        description: 'The perfect everyday companion. This structured tote features premium leather and ample interior space.',
        price: 7999,
        images: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
            'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
        ],
        category: 'handbags',
        subcategory: 'tote',
        colors: [
            { name: 'Tan', hex: '#d2b48c' },
            { name: 'Black', hex: '#0a0a0a' },
            { name: 'Cognac', hex: '#9a463d' },
        ],
        tags: ['tote', 'leather', 'everyday'],
        styleProfile: {
            style: ['minimalist', 'casual', 'formal'],
            occasion: ['office', 'everyday'],
            colorFamily: ['neutral', 'warm'],
            priceRange: 'mid',
        },
        stock: 18,
        isBestseller: true,
    },
    {
        id: 'bag-002',
        name: 'Evening Clutch Gold',
        slug: 'evening-clutch-gold',
        description: 'A glamorous gold clutch with intricate detailing. The perfect accessory for your most special evenings.',
        price: 4999,
        images: [
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
            'https://images.unsplash.com/photo-1559563458-527698bf5295?w=800',
        ],
        category: 'handbags',
        subcategory: 'clutch',
        colors: [
            { name: 'Gold', hex: '#d4af37' },
            { name: 'Silver', hex: '#c0c0c0' },
        ],
        tags: ['clutch', 'evening', 'metallic'],
        styleProfile: {
            style: ['formal', 'party'],
            occasion: ['evening', 'wedding'],
            colorFamily: ['metallic'],
            priceRange: 'mid',
        },
        stock: 20,
        isNew: true,
    },
    {
        id: 'bag-003',
        name: 'Bohemian Crossbody',
        slug: 'bohemian-crossbody',
        description: 'Hand-woven details and artisan craftsmanship make this crossbody perfect for your bohemian adventures.',
        price: 3999,
        images: [
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
        ],
        category: 'handbags',
        subcategory: 'crossbody',
        colors: [
            { name: 'Natural', hex: '#f5deb3' },
            { name: 'Rust', hex: '#b7410e' },
        ],
        tags: ['crossbody', 'boho', 'woven'],
        styleProfile: {
            style: ['bohemian', 'casual'],
            occasion: ['vacation', 'brunch', 'everyday'],
            colorFamily: ['warm'],
            priceRange: 'budget',
        },
        stock: 22,
    },
    {
        id: 'bag-004',
        name: 'Mini Quilted Bag',
        slug: 'mini-quilted-bag',
        description: 'Timeless quilted pattern meets modern mini proportions. A versatile piece that transitions from day to night.',
        price: 5999,
        images: [
            'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800',
            'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800',
        ],
        category: 'handbags',
        subcategory: 'mini',
        colors: [
            { name: 'Black', hex: '#0a0a0a' },
            { name: 'Cream', hex: '#fffdd0' },
            { name: 'Blush', hex: '#f4c2c2' },
        ],
        tags: ['mini', 'quilted', 'chain'],
        styleProfile: {
            style: ['romantic', 'formal', 'party'],
            occasion: ['date-night', 'evening', 'brunch'],
            colorFamily: ['neutral', 'pastel'],
            priceRange: 'mid',
        },
        stock: 16,
        isBestseller: true,
    },

    // JEWELRY
    {
        id: 'jewel-001',
        name: 'Layered Gold Necklace Set',
        slug: 'layered-gold-necklace-set',
        description: 'A curated set of three delicate gold necklaces designed to be worn together for a perfectly layered look.',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        ],
        category: 'jewelry',
        subcategory: 'necklace',
        colors: [
            { name: 'Gold', hex: '#d4af37' },
            { name: 'Rose Gold', hex: '#b76e79' },
        ],
        tags: ['layered', 'gold', 'necklace', 'set'],
        styleProfile: {
            style: ['minimalist', 'casual', 'bohemian'],
            occasion: ['everyday', 'date-night', 'brunch'],
            colorFamily: ['metallic'],
            priceRange: 'budget',
        },
        stock: 40,
        isBestseller: true,
    },
    {
        id: 'jewel-002',
        name: 'Statement Crystal Earrings',
        slug: 'statement-crystal-earrings',
        description: 'Dazzling crystal drop earrings that catch the light beautifully. Perfect for making a statement.',
        price: 2999,
        images: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800',
        ],
        category: 'jewelry',
        subcategory: 'earrings',
        colors: [
            { name: 'Crystal Clear', hex: '#e8e8e8' },
            { name: 'Champagne', hex: '#f7e7ce' },
        ],
        tags: ['earrings', 'crystal', 'statement'],
        styleProfile: {
            style: ['formal', 'party', 'romantic'],
            occasion: ['wedding', 'evening', 'date-night'],
            colorFamily: ['metallic'],
            priceRange: 'budget',
        },
        stock: 28,
        isNew: true,
    },
    {
        id: 'jewel-003',
        name: 'Minimalist Cuff Bracelet',
        slug: 'minimalist-cuff-bracelet',
        description: 'Clean lines and modern design define this adjustable cuff bracelet. Stackable and versatile.',
        price: 1999,
        images: [
            'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
        ],
        category: 'jewelry',
        subcategory: 'bracelet',
        colors: [
            { name: 'Gold', hex: '#d4af37' },
            { name: 'Silver', hex: '#c0c0c0' },
        ],
        tags: ['bracelet', 'cuff', 'minimal'],
        styleProfile: {
            style: ['minimalist', 'formal', 'casual'],
            occasion: ['office', 'everyday', 'date-night'],
            colorFamily: ['metallic'],
            priceRange: 'budget',
        },
        stock: 35,
    },
    {
        id: 'jewel-004',
        name: 'Pearl Drop Earrings',
        slug: 'pearl-drop-earrings',
        description: 'Classic freshwater pearls on delicate gold drops. Timeless elegance for any occasion.',
        price: 2499,
        images: [
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
            'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=800',
        ],
        category: 'jewelry',
        subcategory: 'earrings',
        colors: [
            { name: 'Pearl White', hex: '#f8f6f0' },
        ],
        tags: ['earrings', 'pearl', 'classic'],
        styleProfile: {
            style: ['formal', 'romantic', 'minimalist'],
            occasion: ['office', 'wedding', 'evening'],
            colorFamily: ['neutral'],
            priceRange: 'budget',
        },
        stock: 25,
        isBestseller: true,
    },
    {
        id: 'jewel-005',
        name: 'Boho Ring Stack',
        slug: 'boho-ring-stack',
        description: 'A set of five stackable rings featuring unique textures and semi-precious stones. Mix and match your way.',
        price: 2799,
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
        ],
        category: 'jewelry',
        subcategory: 'rings',
        colors: [
            { name: 'Gold Mix', hex: '#d4af37' },
            { name: 'Silver Mix', hex: '#c0c0c0' },
        ],
        tags: ['rings', 'stack', 'boho'],
        styleProfile: {
            style: ['bohemian', 'casual'],
            occasion: ['everyday', 'vacation', 'festival'],
            colorFamily: ['metallic'],
            priceRange: 'budget',
        },
        stock: 32,
        isNew: true,
    },

    // ACCESSORIES
    {
        id: 'acc-001',
        name: 'Silk Hair Scarf',
        slug: 'silk-hair-scarf',
        description: 'Luxurious pure silk scarf with exclusive print. Wear it in your hair, on your bag, or around your neck.',
        price: 1999,
        images: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
        ],
        category: 'accessories',
        subcategory: 'scarves',
        colors: [
            { name: 'Flora Print', hex: '#e8b4b8' },
            { name: 'Ocean Blue', hex: '#4a90a4' },
        ],
        tags: ['scarf', 'silk', 'hair'],
        styleProfile: {
            style: ['bohemian', 'romantic', 'casual'],
            occasion: ['vacation', 'brunch', 'everyday'],
            colorFamily: ['pastel', 'cool'],
            priceRange: 'budget',
        },
        stock: 50,
        isNew: true,
    },
    {
        id: 'acc-002',
        name: 'Leather Wide Belt',
        slug: 'leather-wide-belt',
        description: 'Define your silhouette with this statement wide belt in premium Italian leather.',
        price: 2499,
        images: [
            'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        ],
        category: 'accessories',
        subcategory: 'belts',
        colors: [
            { name: 'Tan', hex: '#d2b48c' },
            { name: 'Black', hex: '#0a0a0a' },
        ],
        tags: ['belt', 'leather', 'wide'],
        styleProfile: {
            style: ['bohemian', 'casual', 'formal'],
            occasion: ['office', 'everyday', 'date-night'],
            colorFamily: ['neutral', 'warm'],
            priceRange: 'budget',
        },
        stock: 30,
    },
    {
        id: 'acc-003',
        name: 'Oversized Sunglasses',
        slug: 'oversized-sunglasses',
        description: 'Glamorous oversized frames with UV protection. Channel your inner movie star.',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
            'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800',
        ],
        category: 'accessories',
        subcategory: 'eyewear',
        colors: [
            { name: 'Tortoise', hex: '#8b4513' },
            { name: 'Black', hex: '#0a0a0a' },
        ],
        tags: ['sunglasses', 'oversized', 'glamour'],
        styleProfile: {
            style: ['party', 'casual', 'formal'],
            occasion: ['vacation', 'brunch', 'everyday'],
            colorFamily: ['neutral'],
            priceRange: 'budget',
        },
        stock: 25,
        isBestseller: true,
    },

    // SHOES
    {
        id: 'shoe-001',
        name: 'Classic Strappy Heels',
        slug: 'classic-strappy-heels',
        description: 'Elegant strappy heels with a comfortable block heel. Perfect for dancing the night away.',
        price: 5999,
        images: [
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
            'https://images.unsplash.com/photo-1518049362265-d5b2a6467571?w=800',
        ],
        category: 'shoes',
        subcategory: 'heels',
        colors: [
            { name: 'Nude', hex: '#e3bc9a' },
            { name: 'Black', hex: '#0a0a0a' },
            { name: 'Gold', hex: '#d4af37' },
        ],
        sizes: ['36', '37', '38', '39', '40', '41'],
        tags: ['heels', 'strappy', 'evening'],
        styleProfile: {
            style: ['formal', 'party', 'romantic'],
            occasion: ['evening', 'wedding', 'date-night'],
            colorFamily: ['neutral', 'metallic'],
            priceRange: 'mid',
        },
        stock: 18,
        isBestseller: true,
    },
    {
        id: 'shoe-002',
        name: 'Leather Mules',
        slug: 'leather-mules',
        description: 'Effortlessly chic leather mules that slip on and elevate any outfit instantly.',
        price: 4499,
        images: [
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
            'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800',
        ],
        category: 'shoes',
        subcategory: 'mules',
        colors: [
            { name: 'Cream', hex: '#fffdd0' },
            { name: 'Tan', hex: '#d2b48c' },
            { name: 'Black', hex: '#0a0a0a' },
        ],
        sizes: ['36', '37', '38', '39', '40', '41'],
        tags: ['mules', 'leather', 'minimal'],
        styleProfile: {
            style: ['minimalist', 'casual', 'formal'],
            occasion: ['office', 'brunch', 'everyday'],
            colorFamily: ['neutral'],
            priceRange: 'mid',
        },
        stock: 22,
        isNew: true,
    },
];

// Helper functions
export function getProductsByCategory(category: ProductCategory): Product[] {
    return products.filter(p => p.category === category);
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.isBestseller || p.isNew).slice(0, 8);
}

export function getNewArrivals(): Product[] {
    return products.filter(p => p.isNew);
}

export function getBestsellers(): Product[] {
    return products.filter(p => p.isBestseller);
}

// Re-export from styleMatch
export { getStyleMatches, getDressesForStudio } from './styleMatch';

export function searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price);
}

// Category metadata
export const categories = [
    {
        id: 'dresses',
        name: 'Dresses',
        description: 'From elegant gowns to everyday favorites',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    },
    {
        id: 'handbags',
        name: 'Handbags',
        description: 'Carry your essentials in style',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    },
    {
        id: 'jewelry',
        name: 'Jewelry',
        description: 'Delicate pieces that make a statement',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    },
    {
        id: 'accessories',
        name: 'Accessories',
        description: 'The finishing touches for every look',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
    },
    {
        id: 'shoes',
        name: 'Shoes',
        description: 'Step out in confidence',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    },
];
