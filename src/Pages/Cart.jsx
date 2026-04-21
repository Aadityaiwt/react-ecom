import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
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
    );
  };

  const validateForm = () => {

  // Name ? min 3 characters, no numbers
  if (!name || name.length < 3 || /\d/.test(name)) {
    return "Enter valid name (min 3 letters, no numbers)";
  }

  // Email ? @ and gmail.com end
  if (!email.includes("@") || !email.endsWith("@gmail.com")) {
    return "Enter valid Gmail (example@gmail.com)";
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
    return "Enter valid address (min 10 characters)";
  }

  return null; // all good
};

  const handlePlace = async () => {
    if (!name || !email || !contact || !address || !pincode) {
      return toast.error("Please fill all fields");
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

      console.log(res);
      toast.success("Order Placed Successfully");

      localStorage.removeItem("cart");
      setCart([]);
      setAddress("");
      setName("");
      setEmail("");
      setContact("");
      setPincode("");
    } catch (error) {
      console.log("ERROR:", error.response || error.message);
      toast.error("Order Failed");
    }
  };

  return (
    <>
      <div className="cart-container">
        <h2 className="cart-title">My Cart</h2>
        {cart.length === 0 ? (
          <h3 className="empty-cart">Cart is empty</h3>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-details">
                <h3 className="cart-title-text">Product Name : {item.title}</h3>
                <h3 className="cart-description">Description : {item.des}</h3>
                <h3 className="cart-description">
                  Net Quantity : {item.quantity}
                </h3>
                <h3 className="cart-price">Products Price : {item.price}rs</h3>
              </div>
              <img className="cart-image" src={item.image} />
            </div>
          ))
        )}
        <h1>Total Price:- {getTotal()}</h1>
        <label>Enter Your Name : </label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Enter Your Email : </label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Contact : </label>
        <input
          type="text"
          maxLength="10"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Enter Your Address : </label>
        <input
          type="text"
          maxLength="6"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Pincode : </label>
        <input
          type="number"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />{" "}
        <br /> <br />
        <button onClick={handlePlace} disabled={cart.length === 0}>
          Place Order
        </button>
      </div>
    </>
  );
};

export default Cart;
