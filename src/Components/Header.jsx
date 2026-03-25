import React from 'react'
import './CSS/Header.css'

import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
    
    <div className="nav">
      <div className="logo">
        <img src="/Images/digi-logo.png" alt="digi-logo" />
      </div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </div>
    
    </>
  )
}

export default Header
