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
import Services from './Pages/Services'
import Cart from './Pages/Cart'
import Orders from './Pages/Admin/Orders'
import AdminContact from './Pages/Admin/AdminContact'
import AdminProfile from './Pages/Admin/AdminProfile'
import AdminDashboard from './Pages/Admin/AdminDashboard'

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
            <Route path='/services' element={<Services />}/>
            <Route path='/cart' element={<Cart />}/>





            {/* Dashboard */}
            <Route path='/dashboardLayout' element={<DashboardLayout />}/>
            <Route path='/add-product' element={<AddProduct />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path='/admincontact' element={<AdminContact />}/>
            <Route path='/adminprofile' element={<AdminProfile />}/>
            <Route path='/admindashboard' element={<AdminDashboard />}/>
        </Routes>
         <ToastContainer />
     </BrowserRouter>
    
    </>
  )
}

export default App
