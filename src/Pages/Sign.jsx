import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Sign.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/create-admin`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Registered successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error in signup");
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="outer">
        <h1 className="margin">Register</h1>

        <button className="btn-icon">
          <img src="./Images/google-icon.png" alt="google-icon" />
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="register-form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="regiter-btn" onClick={handleSignup}>
          Register
        </button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <p>
          By continuing, you accept our <Link>Terms of Service</Link> and
          acknowledgement.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Sign;
