import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import axios from "axios";
import "./CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    contacts: 0,
  });

const fetchStats = async () => {
  try {
    const productRes = await axios.get(`${API_URL}/api/get-all`);
    const orderRes = await axios.get(`${API_URL}/api/orders`);
    const contactRes = await axios.get(`${API_URL}/api/contact/get-all`);
    
setStats({
  products: productRes.data.product?.length || productRes.data.length || 0,
  orders: orderRes.data.orders?.length || orderRes.data.length || 0,
  contacts: contactRes.data.contacts?.length || contactRes.data.length || 0,
});

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="dashboard-cards">

          <div className="card products">
            <h3>Total Products</h3>
            <p>{stats.products}</p>
          </div>

          <div className="card orders">
            <h3>Total Orders</h3>
            <p>{stats.orders}</p>
          </div>

          <div className="card contacts">
            <h3>Total Contacts</h3>
            <p>{stats.contacts}</p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;