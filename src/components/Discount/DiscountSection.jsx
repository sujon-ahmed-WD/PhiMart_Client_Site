import bgImag from "../../assets/images/banner-image-bg-1.jpg"
import bookimage from "../../assets/images/banner-image3.png"
import DiscountCounter from './DiscountCounter';
 

const DiscountSection = () => {
    return (
 <section className="w-full h-[500px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
        style={{backgroundImage:`url(${bgImag})`}}
        >
            <div className=" mx-w-6xl flex flex-col md:flex-row items-center   justify-center px-8 text text-center md:text-left mb-8 md:mb-0 " >
            {/* Left Content */}
            <div className="max-w-full md:w-1/2 flex justify-center ">
                <img className="max-w-md md:max-w-md drop-shadow-lg" src={bookimage} alt="" />
            </div>
            {/* Right Content */}
            <div className=" w-full md:w-1/2">
                <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 ">30% Discount On All Items. Hurry Up !!!</h1>
            <DiscountCounter/>
              
                <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md my-4"> Shop Collection</button>
            </div>
        </div>
    </section>
    );
};

export default DiscountSection;