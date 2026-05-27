import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./css/Cartslide.css";
const Cartslide = () => {
  const { cartItems, cartOpen, setCartOpen, removecart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${cartOpen ? "show" : ""}`}
        onClick={() => setCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h5>Shopping Cart</h5>
          <span onClick={() => setCartOpen(false)}>✕</span>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`http://localhost:4500/upload/${item.image}`}
                alt=""
              />
              <div className="cart-info">
                <h6>{item.title}</h6>
                <p>${item.price}</p>
              </div>
              <span onClick={() => removecart(item._id)}>✕</span>
            </div>
          ))
        )}

       <div className="cart-footer">
  
  <div className="subtotal">
    <span>Subtotal</span>
    <b>${subtotal.toFixed(2)}</b>
  </div>

  <div className="cart-buttons">
    <button
      className="view-btn"
      onClick={() => {
        setCartOpen(false);
        navigate("/cart");
      }}
    >
      View Cart
    </button>

    <button
      className="checkout-btn"
      onClick={() => {
        setCartOpen(false);
        navigate("/checkout");
      }}
    >
      Checkout
    </button>
  </div>

</div>
      </div>
    </>
  );
};

export default Cartslide;