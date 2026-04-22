import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
  };

  const validateForm = () => {
    // Name ? min 3 characters, no numbers
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter valid Email (example@gmail.com)";
    }

    // Email ? @ and gmail.com end
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter valid Email (example@gmail.com)";
    }

    // Contact ? 10 digit, start 6-9
    if (!/^[6-9]\d{9}$/.test(contact)) {
      return "Enter valid 10 digit contact number";
    }

    // Pincode ? exactly 6 digit
    if (!/^\d{6}$/.test(pincode)) {
      return "Enter valid 6 digit pincode";
    }

    // Address ? minimum length check
    if (!address || address.length < 10) {
      return "Enter full address (min 10 characters)";
    }

    return null; // all good
  };

  const handlePlace = async () => {
    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }

    const error = validateForm(); // ?? proper validation

    if (error) {
      return toast.error(error);
    }

    try {
      const res = await axios.post(`${API_URL}/api/order`, {
        cart,
        name,
        email,
        contact,
        address,
        pincode,
      });

      toast.success("Order Placed Successfully");

      localStorage.removeItem("cart");
      setCart([]);
      setAddress("");
      setName("");
      setEmail("");
      setContact("");
      setPincode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <>
<div className="cart-container">
  <h2 className="cart-title">My Cart</h2>

  {cart.length === 0 ? (
    <h3 className="empty-cart">Your cart is empty</h3>
  ) : (
    <>
      <div className="cart-grid">
        {cart.map((item) => (
          <div className="cart-card" key={item._id}>
            <img src={item.image} alt="" />

            <div className="cart-info">
              <div className="cart-title">
                <h3>Title</h3>
                <h3>{item.title}</h3>
              </div>
              <p>{item.des}</p>

              <div className="cart-meta">
                <span>Qty: {item.quantity}</span>
                <span>{item.price}rs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="cart-summary">
        <h2>Total: {getTotal()}rs</h2>
      </div>

      {/* Order Form Section */}
      <div className="checkout-form">
        <h3>Shipping Details</h3>

        <div className="form-grid">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Contact Number"
            maxLength="10"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <input
            type="text"
            placeholder="Pincode"
            maxLength="6"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button onClick={handlePlace}>
          Place Order
        </button>
      </div>
    </>
  )}
</div>
    </>
  );
};

export default Cart;
