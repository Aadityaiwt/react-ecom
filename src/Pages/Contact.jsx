import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/Contact.css'


const Contact = () => {
  const handleSubmit=()=> {

  }
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
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>

          <div className="about-row">
            <input type="email" placeholder="Email" />
            <input type="number" placeholder="Phone" />
          </div>

          <input type="text" placeholder="Address" className="full" />

          <textarea
            placeholder="Type your message here"
            className="full textarea"
          ></textarea>

          <button type="submit">Submit</button>
        </form>

      </div>
    </div>
        </div>
      </div>

    <Footer />
    
    </>
  )
}

export default Contact
