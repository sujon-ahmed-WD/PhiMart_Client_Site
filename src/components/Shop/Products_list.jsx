import Productltem from "../Products/Productltem";


const Products_list = ({products,loading}) => {
    if (loading)
    {
        <div className="flex justify-center py-16">
        <span className="loading loading-spinner text-secondary"></span>
       </div>
    }
    return (
       <div className=" my-5 mx-5 gap-2.5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {
                products.map((product,index)=>(
                    <Productltem product={product} key={index}/>
                ))
            }
        </div>
    );
};

export default Products_list;