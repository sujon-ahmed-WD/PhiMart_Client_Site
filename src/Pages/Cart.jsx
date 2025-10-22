import { useEffect, useState } from "react";
import useCartContext from "../hook/useCartContext";

const Cart = () => {
    // const [authToken,setAuthToken]=useState(()=>localStorage.getItem("authToken")?.access);
    // Create a new cart 
  const {cart,createOrGetCart } = useCartContext();
  // console.log(createOrGetCart)
  useEffect(()=>{
    createOrGetCart()
  },[]);
  return <div>{JSON.stringify(cart)}</div>;
}

export default Cart;
