import React, { useState } from "react";
import "./CSS/Login.css";
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleLogin = async () => {
  if (!email || !password) {
    return toast.error("Please fill all fields");
  }

  setLoading(true);
  try {

    const res = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });

    if (res.data.success) {
  const { user, token } = res.data;

  // ?? store user
  localStorage.setItem("user", JSON.stringify(user));

  // ?? store token (IMPORTANT)
  localStorage.setItem("token", token);

  toast.success("Login successful");

  setTimeout(() => {
    if (user.role === "admin") {
      navigate("/dashboardLayout");
    } else {
      navigate("/");
    }
  }, 1000);
} else {
      toast.error("Invalid Email or Password Or not exist this account please signup");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header />

      <div className="login-outer">
        <h1 className="margin">Log In</h1>
        <button className="btn-icon">
          <img src="./Images/google-icon.png" alt="google-icon" />
        </button>
        <div className="divider">
          <span>OR</span>
        </div>
        <div
          className="form">
          <label htmlFor="email" id="email" className="margin">
            Email
          </label>
          <br />
          <input
            type="email"
            className="margin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password" id="password" className="margin">
            Password
          </label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <span>Forgot password?</span>
        </div>
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading.." : "Login"}
        </button>
        <p>
          <Link to="">Can't Access Your Account?</Link>
        </p>
        <p>
          Don't have an account?
          <Link to="/sign"> Sign Up</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Login;
