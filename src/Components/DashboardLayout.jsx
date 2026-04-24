import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./CSS/DashboardLayout.css";
import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdMarkunreadMailbox,
} from "react-icons/md";
import { IoMdContact, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { TiThMenu } from "react-icons/ti";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

useEffect(() => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
    }

  } catch (error) {
    localStorage.clear();
    navigate("/login");
  }
}, []);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      text: "After this You can not redirect to login page",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout!",
          text: "You are logged out.",
          icon: "success",
          customClass: {
        confirmButton: "swal-confirm-btn",
      },
        });
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div className="container">
      <div className={open ? "sidebar open" : "sidebar"}>
        <div className="logo">
          <span>A</span>
          <h2>Admin</h2>
        </div>

        <NavLink to="/admindashboard" className="navlinks">
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/add-product" className="navlinks">
          <MdOutlineProductionQuantityLimits />
          <span>Products</span>
        </NavLink>

        <NavLink to="/orders" className="navlinks">
          <MdMarkunreadMailbox />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admincontact" className="navlinks">
          <IoMdContact />
          <span>Contact</span>
        </NavLink>

        <NavLink to="/adminprofile" className="navlinks">
          <CgProfile />
          <span>Profile</span>
        </NavLink>

        <button className="logout" onClick={handleLogout}>
          <IoIosLogOut />
          <span>Logout</span>
        </button>
      </div>

      <div className="main">
        <div className="header">
          <button onClick={() => setOpen(!open)}>
            <TiThMenu />{" "}
          </button>
          <h3>Dashboard</h3>
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
