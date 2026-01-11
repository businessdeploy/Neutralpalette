import { Product, StyleMatch, ProductCategory, StyleType, OccasionType, ColorFamily } from '@/types';
import { products } from './products';

/**
 * Style Matching Algorithm
 * Recommends complementary items based on a selected dress
 */

// Color harmony mappings
const colorHarmony: Record<ColorFamily, ColorFamily[]> = {
    neutral: ['neutral', 'metallic', 'warm', 'cool'],
    warm: ['warm', 'neutral', 'metallic'],
    cool: ['cool', 'neutral', 'metallic', 'pastel'],
    jewel: ['jewel', 'metallic', 'neutral'],
    pastel: ['pastel', 'neutral', 'cool', 'metallic'],
    bold: ['bold', 'neutral', 'metallic'],
    metallic: ['metallic', 'neutral', 'jewel', 'cool', 'warm', 'pastel', 'bold'],
};

// Style compatibility
const styleCompatibility: Record<StyleType, StyleType[]> = {
    casual: ['casual', 'bohemian', 'minimalist'],
    formal: ['formal', 'minimalist', 'romantic'],
    party: ['party', 'edgy', 'romantic', 'formal'],
    ethnic: ['ethnic', 'bohemian', 'romantic'],
    bohemian: ['bohemian', 'casual', 'romantic', 'ethnic'],
    minimalist: ['minimalist', 'casual', 'formal'],
    romantic: ['romantic', 'bohemian', 'formal', 'party'],
    edgy: ['edgy', 'party', 'minimalist'],
};

// Calculate match score between two products
function calculateMatchScore(dress: Product, item: Product): number {
    let score = 0;

    // Style compatibility (0-30 points)
    const dressStyles = dress.styleProfile.style;
    const itemStyles = item.styleProfile.style;

    for (const dressStyle of dressStyles) {
        const compatibleStyles = styleCompatibility[dressStyle] || [];
        for (const itemStyle of itemStyles) {
            if (compatibleStyles.includes(itemStyle)) {
                score += 10;
            }
        }
    }
    score = Math.min(score, 30);

    // Occasion compatibility (0-25 points)
    const dressOccasions = dress.styleProfile.occasion;
    const itemOccasions = item.styleProfile.occasion;

    for (const dressOccasion of dressOccasions) {
        if (itemOccasions.includes(dressOccasion)) {
            score += 8;
        }
    }
    score = Math.min(score, 55);

    // Color harmony (0-25 points)
    const dressColors = dress.styleProfile.colorFamily;
    const itemColors = item.styleProfile.colorFamily;

    for (const dressColor of dressColors) {
        const harmonious = colorHarmony[dressColor] || [];
        for (const itemColor of itemColors) {
            if (harmonious.includes(itemColor)) {
                score += 8;
            }
        }
    }
    score = Math.min(score, 80);

    // Price range compatibility (0-20 points)
    const priceRanks: Record<string, number> = { budget: 1, mid: 2, premium: 3, luxury: 4 };
    const dressRank = priceRanks[dress.styleProfile.priceRange] || 2;
    const itemRank = priceRanks[item.styleProfile.priceRange] || 2;
    const priceDiff = Math.abs(dressRank - itemRank);
    score += (3 - priceDiff) * 7;

    return Math.min(score, 100);
}

// Get recommendations for a specific category
function getRecommendationsForCategory(
    dress: Product,
    category: ProductCategory,
    limit: number = 3
): Product[] {
    const categoryProducts = products.filter(p => p.category === category && p.stock > 0);

    const scoredProducts = categoryProducts.map(item => ({
        product: item,
        score: calculateMatchScore(dress, item),
    }));

    // Sort by score descending
    scoredProducts.sort((a, b) => b.score - a.score);

    return scoredProducts.slice(0, limit).map(sp => sp.product);
}

// Main function to get style matches
export function getStyleMatches(dress: Product): StyleMatch {
    const recommendations = {
        handbags: getRecommendationsForCategory(dress, 'handbags', 3),
        jewelry: getRecommendationsForCategory(dress, 'jewelry', 4),
        accessories: getRecommendationsForCategory(dress, 'accessories', 2),
        shoes: getRecommendationsForCategory(dress, 'shoes', 2),
    };

    // Calculate bundle pricing (10% discount for complete look)
    const allRecommendedItems = [
        ...recommendations.handbags.slice(0, 1),
        ...recommendations.jewelry.slice(0, 2),
        ...recommendations.accessories.slice(0, 1),
        ...recommendations.shoes.slice(0, 1),
    ];

    const regularTotal = dress.price + allRecommendedItems.reduce((sum, item) => sum + item.price, 0);
    const bundleDiscount = 0.10; // 10% discount
    const totalBundlePrice = Math.round(regularTotal * (1 - bundleDiscount));
    const savedAmount = regularTotal - totalBundlePrice;

    return {
        dress,
        recommendations,
        totalBundlePrice,
        savedAmount,
    };
}

// Get all dresses for the Product Studio
export function getDressesForStudio(): Product[] {
    return products.filter(p => p.category === 'dresses' && p.stock > 0);
}

// Get curated complete looks
export function getCuratedLooks(): StyleMatch[] {
    const dresses = getDressesForStudio().slice(0, 4);
    return dresses.map(dress => getStyleMatches(dress));
}
