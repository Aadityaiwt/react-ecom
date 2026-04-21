import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/About.css'

const About = () => {
  return (
    <>
      <Header />

      <div className="about">

        {/* HERO SECTION */}
        <div className="about-hero">
          <h1>About Our Flowers</h1>
          <p>Fresh flowers, beautiful moments, and happiness delivered to your doorstep.</p>
        </div>

        {/* CONTENT SECTION */}
        <div className="about-content">

          <div className="about-left">
            <img 
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="flowers"
            />
          </div>

          <div className="about-right">
            <h2>Who We Are</h2>
            <p>
              We are passionate about delivering fresh and beautiful flowers that bring joy to your life.
              Our mission is to make every occasion special with our premium flower collection.
            </p>

            <h2>Our Mission</h2>
            <p>
              To provide high-quality flowers with fast delivery and make every moment memorable.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default About