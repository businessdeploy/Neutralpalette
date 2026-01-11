import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import StyleStudioBanner from '@/components/home/StyleStudioBanner';
import NewArrivals from '@/components/home/NewArrivals';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedCollections />
            <BestSellers />
            <StyleStudioBanner />
            <NewArrivals />
            <Testimonials />
            <Newsletter />
        </>
    );
}
