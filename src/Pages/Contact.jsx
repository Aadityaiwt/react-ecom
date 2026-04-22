import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./CSS/Contact.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/contact",
        formData,
      );

      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    }
  };

  return (
    <>
      <Header />

      <div className="about-outer">
        <div className="about-left">
          <img src="/Images/contact.jpg" alt="contact-image" />
        </div>
        <div className="about-right">
          <div className="form-outer">
            <div className="form-container">
              <h1>Get In Touch</h1>

              <form onSubmit={handleSubmit}>
                <div className="about-row">
                  <input
                  name="firstName"
                  value={formData.firstName}
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                  <input
                  name="lastName"
                  value={formData.lastName}
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>

                <div className="about-row">
                  <input
                  name="email"
                  value={formData.email}
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <input
                  name="phone"
                  value={formData.phone}
                    type="number"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>

                <input
                  name="address"
                  value={formData.address}
                  type="text"
                  placeholder="Address"
                  className="full"
                  onChange={handleChange}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Type your message here"
                  className="full textarea"
                  onChange={handleChange}
                ></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
