import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // ✅ Create or get cart (auto-heal if 404)
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/carts/");
      localStorage.setItem("cartId", response.data.id);
      setCartId(response.data.id);
      setCart(response.data);
    } catch (error) {
      console.log("Error creating/getting cart:", error);

      // 🔄 যদি পুরোনো cart invalid হয়, নতুন বানাও
      if (error.response?.status === 404) {
        localStorage.removeItem("cartId");
        setCartId(null);
        return await createOrGetCart();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Add item to cart and update state
  const AddCartItems = async (product_id, quantity) => {
    setLoading(true);
    try {
      // যদি cart না থাকে, নতুন বানাও
      if (!cartId) await createOrGetCart();

      await authApiClient.post(`/carts/${cartId}/items/`, {
        product_id,
        quantity,
      });

      // cart refresh করে state আপডেট করো
      const updatedCart = await authApiClient.get(`/carts/${cartId}/`);
      setCart(updatedCart.data);
    } catch (error) {
      console.log("Error adding items", error);

      // 🔄 যদি cart 404 দেয়, localStorage clear করে আবার নতুন cart তৈরি করো
      if (error.response?.status === 404) {
        localStorage.removeItem("cartId");
        setCartId(null);
        await createOrGetCart();
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      setLoading(true);
      try {
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });

        // cart refresh করে state update করো
        const updatedCart = await authApiClient.get(`/carts/${cartId}/`);
        setCart(updatedCart.data);
      } catch (error) {
        console.log("Error updating cart items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  // ✅ Delete item
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);

        // cart refresh
        const updatedCart = await authApiClient.get(`/carts/${cartId}/`);
        setCart(updatedCart.data);
      } catch (error) {
        console.log("Error deleting item", error);
      }
    },
    [cartId]
  );

  // ✅ Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [createOrGetCart]);

  return {
    cart,
    loading,
    cartId,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;
