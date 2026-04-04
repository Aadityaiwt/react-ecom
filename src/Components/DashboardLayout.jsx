import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import './CSS/DashboardLayout.css'
import { MdDashboard, MdOutlineProductionQuantityLimits, MdMarkunreadMailbox } from "react-icons/md";
import { IoMdContact, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = () => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="container">

            {/* Sidebar */}
            <div className={open ? 'sidebar open' : "sidebar"}>

                <h2 className="logo">Admin</h2>

                <NavLink to="/dashboard" className='navlinks'>
                    <MdDashboard />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/products" className='navlinks'>
                    <MdOutlineProductionQuantityLimits />
                    <span>Products</span>
                </NavLink>

                <NavLink to="/orders" className='navlinks'>
                    <MdMarkunreadMailbox />
                    <span>Orders</span>
                </NavLink>

                <NavLink to="/contact" className='navlinks'>
                    <IoMdContact />
                    <span>Contact</span>
                </NavLink>

                <NavLink to="/profile" className='navlinks'>
                    <CgProfile />
                    <span>Profile</span>
                </NavLink>

                <button className='logout' onClick={handleLogout}>
                    <IoIosLogOut />
                    <span>Logout</span>
                </button>

            </div>

            {/* Main */}
            <div className="main">

                {/* Header */}
                <div className="header">
                    <button onClick={() => setOpen(!open)}>?</button>
                    <h3>Dashboard</h3>
                </div>

                {/* Content */}
                <div className="content">

                    <div className="card">Users<br /><b>120</b></div>
                    <div className="card">Orders<br /><b>80</b></div>
                    <div className="card">Revenue<br /><b>?25,000</b></div>
                    <div className="card">Products<br /><b>50</b></div>

                </div>

            </div>

        </div>
    )
}

export default DashboardLayout