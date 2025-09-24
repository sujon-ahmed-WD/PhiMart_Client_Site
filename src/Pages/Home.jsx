import React from 'react';
import HeroCarouSal from '../components/Home/Carousel/HeroCarouSal';
import Features from '../components/Features';
import Product from '../components/Products/Product';
import DiscountSection from '../components/Home/Discount/DiscountSection';
import Category from '../components/Home/Categories/Category';

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