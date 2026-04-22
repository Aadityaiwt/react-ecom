import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/services.css'

const Services = () => {
  return (
    <>
      <Header />

<div className="services-container">
  <h1 className="services-title">Our Flower Services</h1>

  <p>
    We provide fresh and beautiful flowers for all occasions like weddings,
    birthdays, decorations, gifting and special moments. Our flowers are
    hand-picked and delivered fresh with love.
  </p>

  <div className="services-grid">

    <div className="service-card">
      <h2>Fresh Flower Delivery</h2>
      <p>Get fresh roses, lilies, and seasonal flowers delivered at your doorstep.</p>
    </div>

    <div className="service-card">
      <h2>Wedding Decoration</h2>
      <p>Beautiful flower decoration for weddings, stage, and mandap setup.</p>
    </div>

    <div className="service-card">
      <h2>Gift Bouquets</h2>
      <p>Customized flower bouquets for birthdays, anniversaries and surprises.</p>
    </div>

    <div className="service-card">
      <h2>Event Decoration</h2>
      <p>Corporate events, parties and functions decoration with premium flowers.</p>
    </div>

    <div className="service-card">
      <h2>Custom Orders</h2>
      <p>We design flowers based on your choice, color theme and budget.</p>
    </div>

    <div className="service-card">
      <h2>Same Day Delivery</h2>
      <p>Fast and reliable same-day flower delivery service in your city.</p>
    </div>

  </div>
</div>

      <Footer />
    </>
  )
}

export default Services