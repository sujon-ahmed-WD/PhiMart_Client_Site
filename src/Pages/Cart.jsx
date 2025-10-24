import { useEffect, useState } from "react";
import useCartContext from "../hook/useCartContext";
import CartItemList from "../components/Cart/CartItemList";

const Cart = () => {
    // const [authToken,setAuthToken]=useState(()=>localStorage.getItem("authToken")?.access);
    // Create a new cart 
  const {cart,createOrGetCart,updateCartItemQuantity } = useCartContext();
  // console.log(createOrGetCart)
  console.log(cart)
  useEffect(()=>{
    console.log("Good Job brother and sister .. .. .. ")
    createOrGetCart()
  },[createOrGetCart]);
  const handleUpdateCartItemQuantity = async(itemId,newQuantity)=>{
  try{
      await updateCartItemQuantity(itemId,newQuantity);
  }catch(error){
    console.log(error)
  }
  return(
    <div className=" flex justify-between">
      <div><CartItemList handleUpdateQuantity={handleUpdateCartItemQuantity}/></div>
      <div></div>
    </div>
  );
}
export default Cart;
