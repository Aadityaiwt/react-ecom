import React from "react";
import "./CSS/Header.css";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Cart from "../Pages/Cart";

const Header = ({ cart }) => {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="/Images/flower-logo.png" alt="digi-logo" />
        </div>
        <div className="ul-list">
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
        </div>

        <div className="btn">
          <button className="login">
            <Link to="/login">Login</Link>
          </button>
          <button className="login">
            <Link to="/sign">Sign Up</Link>
          </button>
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
      </div>
    </>
  );
};

export default Header;
