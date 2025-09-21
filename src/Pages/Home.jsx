import React from 'react';
import HeroCarouSal from '../components/Carousel/HeroCarouSal';
import Features from '../components/Features';
import Product from '../components/Products/Product';
import DiscountSection from '../components/Discount/DiscountSection';
import Category from '../components/Categories/Category';

const Home = () => {
    return (
        <div>
             {/* <CarouselSlide/> */}
             <HeroCarouSal/>
             <Features/>
             <Category/>
             <Product/>
             <DiscountSection/>
        </div>
    );
};

export default Home;