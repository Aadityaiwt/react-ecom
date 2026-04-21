import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/services.css'

const Services = () => {
  return (
    <>
      <Header />

      <div className="services-container">
        <h1 className="services-title">Our Services</h1>

          <p>A beautiful collection of vibrant flowers showcasing nature's colors, fragrance, elegance, and freshness, perfect for decoration, gifting, and joyful moments.</p>
        <div className="services-grid">

          <div className="service-card">
            <h2>Web Development</h2>
            <p>We build modern and responsive websites using latest technologies.</p>
          </div>

          <div className="service-card">
            <h2>App Development</h2>
            <p>High-performance mobile applications for Android and iOS.</p>
          </div>

          <div className="service-card">
            <h2>UI/UX Design</h2>
            <p>Clean and user-friendly designs that improve user experience.</p>
          </div>

          <div className="service-card">
            <h2>SEO Optimization</h2>
            <p>Improve your website ranking and visibility on search engines.</p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Services