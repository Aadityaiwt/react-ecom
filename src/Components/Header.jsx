import React, { useState, useRef, useEffect } from "react";
import "./CSS/Header.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaBars } from "react-icons/fa";

const Header = ({ cart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav">
      <div className="logo">
        <img src="/Images/flower-logo.png" alt="logo" />
      </div>

      <div ref={menuRef} className={`ul-list ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
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
      </div>

      <div className="mobile-btn-container">
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <Link to="/sign" className="login-btn">
          Sign Up
        </Link>
      </div>

      <div className="buy-cart">
        <Link to="/cart">
          <div className="cart">
            <FaCartPlus />
            <span className="cart-count">
              {cart?.reduce((total, item) => total + (item.quantity || 0), 0) ||
                0}
            </span>
          </div>
        </Link>
      </div>

      <div
        ref={buttonRef}
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars style={{ color: "#e20272" }} />
      </div>
    </div>
  );
};

export default Header;
