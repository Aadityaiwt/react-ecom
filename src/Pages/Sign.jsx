import React from 'react';
import { Link } from "react-router-dom";
import './CSS/Sign.css'


const Sign = () => {
  return (
    <>
      <div className="outer">
        <h1 className="margin">Register</h1>

        <button className="btn-icon">
          <img src="./Images/google-icon.png" alt="google-icon" />
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="form">
          <label htmlFor="email" className="margin">
            Email address
          </label>
          <br />
          <input type="text" id="email" className="margin" />
          <br />

          <label htmlFor="password" className="margin">
            Password
          </label>
          <br />
          <input type="password" id="password" className="margin" />
        </div>

        <button className="btn-icon margin" id="btn">
          Register
        </button>

        <p className="margin">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <p className="margin" style={{ width: "80%" }}>
          By continuing, you accept our{" "}
          <Link>Terms of Service</Link> and acknowledgement.
        </p>
      </div>
    </>
  );
};

export default Sign;