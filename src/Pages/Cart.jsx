import React from 'react';
import useCartContext from '../hook/useCartContext.js';

const Cart = () => {
    const{createCart}=useCartContext();
    return <div>This Cart Pages </div>
};

export default Cart;