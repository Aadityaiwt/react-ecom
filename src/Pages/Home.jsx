import React from 'react'
import Products from './Products'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/Home.css'

const Home = () => {
  return (
    <>
    <div className="home-outer">
      <div className="home-left">
        <div className="home-heading">
          <span id='first'>Flowers</span> <br />
          <span id='second'>with </span><span id='third'>Love</span>
          <p>Welcome to our flower shop, where every bloom tells a story. Discover fresh, handpicked flowers crafted into beautiful arrangements for every occasion. From romantic roses to cheerful bouquets, we deliver happiness to your doorstep. Celebrate love, joy, and special moments with nature's finest flowers, designed to make every day bright and memorable.</p>
        </div>
        <div className="home-button">
          <button>Shop Now</button>
        </div>
      </div>
      <div className="home-right">
        <div className="home-image">
          {/* <img src="/Images/home-image.png" alt="" /> */}
        </div>
      </div>
    </div>
     <Products />
    
    </>
  )
}

export default Home