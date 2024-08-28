// CartModal.js
import React from "react";
import "./CartModal.css"; // Import your styles
import { useSelector } from "react-redux";

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal-content">
        <button className="cart-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.dish.name} {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartModal;
