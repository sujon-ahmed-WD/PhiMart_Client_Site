import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hook/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  // Default localCart ensures no undefined errors
  const [localCart, setLocalCart] = useState({ items: [], total_price: 0 });

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    if (cart) {
      setLocalCart({
        items: cart.items || [],
        total_price: cart.total_price || 0,
      });
    }
  }, [cart]);

  if (loading) return <p>Loading...</p>;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = { ...localCart };

    setLocalCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );

      return {
        ...prev,
        items: updatedItems,
        total_price: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
      };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const prevLocalCartCopy = { ...localCart };

    setLocalCart((prev) => {
      const updatedItems = prev.items.filter((item) => item.id !== itemId);

      return {
        ...prev,
        items: updatedItems,
        total_price: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
      };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading cart items...</p>}>
            <CartItemList
              items={localCart.items || []}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart?.total_price || 0}
            itemCount={localCart?.items?.length || 0}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
