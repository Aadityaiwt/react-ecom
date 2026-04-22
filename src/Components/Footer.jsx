import React from "react";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="first-footer">
          <div className="footer-logo">
            <img src="/Images/digi-logo.png" alt="logo" />
              <p>Digicoders Technologies</p>
              <p>Email : aaditya@gmail.com</p>
              <p>Contact : +91 6389450032</p>
          </div>
        </div>
        <div className="second-footer">
          <h3>Shorts Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
          </ul>
        </div>
        <div className="third-footer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.4070910957107!2d77.68915617524908!3d27.58090587625521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736e345f11ef67%3A0x48fd2f627c33aca5!2sShri%20Radhavallabh%20Lal%20Ji%20Temple%2C%20Vrindavan!5e0!3m2!1sen!2sin!4v1776840708549!5m2!1sen!2sin"
            className="map"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
