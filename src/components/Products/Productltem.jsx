import defaultImage from "../../assets/images/default_product.jpg";

const Productltem = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm ">
        <figure className="px-10 pt-10">
          <img
            src={product.images.length > 0 ? product.images[0]: defaultImage}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <h2 className="text-red-500 font-bold">${product.price}</h2>
          <p>
            {product.description}
          </p>
          <div className="card-actions">
            <button className="btn  text-white bg-pink-600 rounded-full">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productltem;
