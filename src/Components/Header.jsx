import React, { useState } from "react";
import "./CSS/Header.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaBars } from "react-icons/fa";

const Header = ({ cart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav">
      <div className="logo">
        <img src="/Images/flower-logo.png" alt="logo" />
      </div>

      <div className={`ul-list ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
        </ul>

        <div className="mobile-btn-container">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/sign" className="login">
            Sign Up
          </Link>
        </div>
      </div>

      <Link to="/cart">
        <div className="cart">
          <FaCartPlus />
          <span className="cart-count">
            {cart?.reduce((total, item) => total + (item.quantity || 0), 0) ||
              0}
          </span>
        </div>
      </Link>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars style={{ color: "#e20272" }} />
      </div>
    </div>
  );
};

export default Header;
