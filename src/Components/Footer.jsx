import React from 'react'
import './CSS/Footer.css'

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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
          </ul>
        </div>
        <div className="third-footer">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.9638590228824!2d80.94701827522405!3d26.904642076652046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd90f852511b%3A0xea3004cdf494ecbb!2sDigiCoders%20Technologies%20Private%20Limited%2C%20Best%20Software%2FWebsite%2FMobile%20App%20Development%20Company%20in%20Lucknow!5e0!3m2!1sen!2sin!4v1774516771859!5m2!1sen!2sin" width="400px" height="200px"></iframe>
        </div>
      </div>

    </>
  )
}

export default Footer