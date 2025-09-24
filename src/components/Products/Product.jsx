import { useEffect, useState } from "react";
import Productltem from "./Productltem";
import { Navigation } from "swiper/modules";
import { SwiperSlide,Swiper } from "swiper/react";
import ErroAlert from "../ErroAlert";
import apiClient from "../../services/api-client";

const Product = () => {
  const [products, SetProducts] = useState([]);
  const[isLoading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  useEffect(() => {
    setLoading(true)
    apiClient
    .get("/products/")
    .then((res) => SetProducts(res.data.results))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false))
    
  }, []);
  return (
     
      <section className="mx-auto py-16 bg-gray-50" >
        <div className="py-12 px-28">
                   
          <div className="flex justify-between items-center px-4 md:px-8 mb-4">
        <h2 className="text-3xl md:text-4xl font-bold">Trending Products</h2>

       <a href="#" className="btn btn-secondary px-6 py-6 text-lg rounded-full">View All</a>
        </div>

       {/* Spaner */}
       {
isLoading &&(
        <div className="flex justify-center py-16">
        <span className="loading loading-spinner text-secondary"></span>
       </div>
        )
    }
      
    {/* Error */}
    {error && <ErroAlert error={error} />}
          {/* Product Slider */}
    {!isLoading && !error && products.length>0 &&(
        <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
            640:{slidesPerView:2},
            1024:{slidesPerView:3},
        }}
        navigation
        className="mt-4 px-4 container"
        >
            {products?.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
            <Productltem key={product.id} product={product} />
            </SwiperSlide>
          ))}
          
        </Swiper>
    )}
        </div>

      </section>
       
    
  );
};

export default Product;
