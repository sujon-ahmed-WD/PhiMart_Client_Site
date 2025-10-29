// ✅ useCart.js
import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // Create a new Cart ........ ......... .............
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/carts/");
      // console.log("response", response.data);
      if (!cartId) {
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
      }
      setCart(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ cartId]);
  // Add items to Cart ....
  const AddCartItems = async (product_id, quantity) => {
    setLoading(true);
    if (!cartId) await createOrGetCart();
    try {
      const response = await authApiClient.post(`/carts/${cartId}/items/`, {
        product_id,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.log("Error addinge Items", error);
    } finally {
      setLoading(false);
    }
  };
  // Update Item quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      setLoading(true);
      try {
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
      } catch (error) {
        console.log("Error updating cart items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  // Delete Cart Items
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
      } catch (error) {
        console.log(error);
      }
    },
    [cartId]
  );

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
