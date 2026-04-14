import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Login from './Pages/Login'
import Sign from './Pages/Sign'
import DashboardLayout from './Components/DashboardLayout'
import { ToastContainer, toast } from 'react-toastify';
import AddProduct from './Pages/Admin/AddProduct'

const App = () => {
  return (
    <>
    
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/sign' element={<Sign />}/>





            {/* Dashboard */}
            <Route path='/dashboardLayout' element={<DashboardLayout />}/>
            <Route path='/add-product' element={<AddProduct />}/>
        </Routes>
         <ToastContainer />
     </BrowserRouter>
    
    </>
  )
}

export default App
