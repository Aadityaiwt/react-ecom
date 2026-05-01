import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Sign.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Sign = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name required");
      return false;
    }
    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!password) {
      toast.error("Password required");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 6+ chars with letters & numbers");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/signup`, {
        name,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="outer">
        <h1 className="margin">Register</h1>

        <div className="register-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          className="regiter-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Registering.." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Sign;
