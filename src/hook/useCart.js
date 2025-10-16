import { useState } from "react";
import apiClient from "../services/api-client";

const useCart = () => {
  // ✅ Safe way: handle null token
  const [authToken, setAuthToken] = useState(() => {
    const stored = localStorage.getItem("authToken");
    if (!stored) return null;
    try {
      return JSON.parse(stored).access;
    } catch {
      return null;
    }
  });

  const createCart = async () => {
    if (!authToken) {
      console.warn("❌ No token found. Please login first.");
      return;
    }

    try {
      console.log("Creating cart...");
      const response = await apiClient.post(
        "/carts/",
        {},
        {
          headers: {
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      console.log(response.data)
      localStorage.setItem("cartId",response.data.id)
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  return { createCart };
};

export default useCart;
