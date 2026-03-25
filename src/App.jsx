import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Contact from './Pages/Contact'
import About from './Pages/About'

const App = () => {
  return (
    <>
    
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
        </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App
