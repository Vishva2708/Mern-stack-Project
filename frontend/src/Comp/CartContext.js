import { API_URL } from "../config";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const [cartItems, setCartItems] = useState([]);

  const [wishlistItems, setWishlistItems] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchcart = async () => {
      try {
        if (!user) {
          setCartItems([]);
          return;
        }

        if (!user?._id) return;

        const res = await axios.get(`${API_URL}/cart/${user._id}`);
        const formattedCart =
          res.data?.products?.map((item) => ({
            ...item.productId,
            qty: item.qty,
          })) || [];

        setCartItems(formattedCart);
      } catch (error) {
        console.log("Fetch Cart Error:", error);
      }
    };

    fetchcart();
  }, [user]);

  useEffect(() => {
    const fetchwishlist = async () => {
      try {
        if (!user) {
          setWishlistItems([]);
          return;
        }
        if (!user?._id) return;
        const res = await axios.get(
          `${API_URL}/wishlist/${user._id}`,
        );

        const formattedWishlist =
          res.data?.products?.map((item) => ({
            ...item.productId,
          })) || [];

        setWishlistItems(formattedWishlist);
      } catch (error) {
        console.log("Fetch Wishlist Error:", error);
      }
    };

    fetchwishlist();
  }, [user]);

  const addToCart = async (product) => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post(`${API_URL}/cart/add-cart`, {
        userId: user._id,
        productId: product._id,
      });

      const res = await axios.get(`${API_URL}/cart/${user._id}`);

      const formattedCart =
        res.data?.products?.map((item) => ({
          ...item.productId,
          qty: item.qty,
        })) || [];

      setCartItems(formattedCart);

      alert("Product added to cart");
    } catch (error) {
      console.log("Add Cart Error:", error);
    }
  };

  const removecart = async (id) => {
    try {
      await axios.post(`${API_URL}/cart/remove-cart`, {
        userId: user._id,
        productId: id,
      });

      const res = await axios.get(`${API_URL}/cart/${user._id}`);

      const formattedCart =
        res.data?.products?.map((item) => ({
          ...item.productId,
          qty: item.qty,
        })) || [];

      setCartItems(formattedCart);
    } catch (error) {
      console.log("Remove Cart Error:", error);
    }
  };

  const increaseQty = async (id) => {
    try {
      await axios.post(`${API_URL}/cart/increase-qty`, {
        userId: user._id,
        productId: id,
      });

      const res = await axios.get(`${API_URL}/cart/${user._id}`);

      const formattedCart =
        res.data?.products?.map((item) => ({
          ...item.productId,
          qty: item.qty,
        })) || [];

      setCartItems(formattedCart);
    } catch (error) {
      console.log("Increase Qty Error:", error);
    }
  };

  const decreaseQty = async (id) => {
    try {
      await axios.post(`${API_URL}/cart/decrease-qty`, {
        userId: user._id,
        productId: id,
      });

      const res = await axios.get(`${API_URL}/cart/${user._id}`);

      const formattedCart =
        res.data?.products?.map((item) => ({
          ...item.productId,
          qty: item.qty,
        })) || [];

      setCartItems(formattedCart);
    } catch (error) {
      console.log("Decrease Qty Error:", error);
    }
  };

  const addToWishlist = async (product) => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post(`${API_URL}/wishlist/add-wishlist`, {
        userId: user._id,
        productId: product._id,
      });

      const res = await axios.get(`${API_URL}/wishlist/${user._id}`);

      const formattedWishlist =
        res.data?.products?.map((item) => ({
          ...item.productId,
        })) || [];

      setWishlistItems(formattedWishlist);

      alert("Product added to wishlist");
    } catch (error) {
      console.log("Add Wishlist Error:", error);
    }
  };

  const removewishlist = async (id) => {
    try {
      await axios.post(`${API_URL}/wishlist/remove-wishlist`, {
        userId: user._id,
        productId: id,
      });

      const res = await axios.get(`${API_URL}/wishlist/${user._id}`);

      const formattedWishlist =
        res.data?.products?.map((item) => ({
          ...item.productId,
        })) || [];

      setWishlistItems(formattedWishlist);
    } catch (error) {
      console.log("Remove Wishlist Error:", error);
    }
  };

  const logoutUser = () => {
    setCartItems([]);
    setWishlistItems([]);

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removecart,
        increaseQty,
        decreaseQty,

        wishlistItems,
        addToWishlist,
        removewishlist,

        cartOpen,
        setCartOpen,

        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
