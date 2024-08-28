import React, { useState } from "react";
import "./Navbar.css";
import {
  FaSearch,
  FaBell,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaHamburger,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CartModal from "./CartModal"; // Import the CartModal component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State for modal visibility
  const [cartItems, setCartItems] = useState([]); // State for cart items

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaHamburger className="navbar-logo-icon" /> FoodService
        </Link>
        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          <span className="navbar-toggle-icon">&#9776;</span>
        </button>
        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="navbar-menu-items">
            <li>
              <Link to="/">
                <FaHome className="navbar-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FaInfoCircle className="navbar-icon" /> About
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FaPhone className="navbar-icon" /> Contact
              </Link>
            </li>
          </ul>
          <div className="navbar-search">
            <input type="text" placeholder="Search..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
          <div className="navbar-notification">
            <FaBell />
            <span className="notification-badge">3</span>
          </div>
          <div className="navbar-cart">
            <button onClick={toggleCartModal}>
              <FaShoppingCart className="navbar-cart-icon" />
              <span className="cart-item-count">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </div>
      <CartModal
        isOpen={isCartModalOpen}
        onClose={toggleCartModal}
        cartItems={cartItems}
      />
    </nav>
  );
};

export default Navbar;
