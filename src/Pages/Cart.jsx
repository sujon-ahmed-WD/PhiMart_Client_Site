import { useState } from "react";
import useCartContext from "../hook/useCartContext";

const Cart = () => {
    const [authToken,setAuthToken]=useState(()=>localStorage.getItem("authToken")?.access);
    // Create a new cart 
  const { createCart } = useCartContext();

  const handleCreate = async () => {
    await createCart();
  };

  return (
    <div>
      <h2>This is the create  Page</h2>
      <button onClick={handleCreate}>Create Cart</button>
    </div>
  );
};

export default Cart;
