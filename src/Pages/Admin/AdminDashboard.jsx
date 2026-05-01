import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import axios from "axios";
import "./CSS/AdminDashboard.css";

import { BaggageClaim, CircleUserRound, ListCheck } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    contacts: 0,
  });

  const [chartData, setChartData] = useState([]);

  // ?? Fetch Cards Data
  const fetchStats = async () => {
    setLoading(true);
    try {
      const productRes = await axios.get(`${API_URL}/api/get-all`);
      const orderRes = await axios.get(`${API_URL}/api/orders`);
      const contactRes = await axios.get(`${API_URL}/api/contact/get-all`);

      setStats({
        products: Array.isArray(productRes.data)
          ? productRes.data.length
          : productRes.data?.product?.length || 0,

        orders: Array.isArray(orderRes.data)
          ? orderRes.data.length
          : orderRes.data?.orders?.length || 0,

        contacts: Array.isArray(contactRes.data)
          ? contactRes.data.length
          : contactRes.data?.contacts?.length || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders`);

      const orders = Array.isArray(res.data) ? res.data : res.data.orders || [];

      const monthlyData = {};

      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const month = date.toLocaleString("default", { month: "short" });

        if (!monthlyData[month]) {
          monthlyData[month] = 0;
        }
        monthlyData[month]++;
      });

      const formattedData = Object.keys(monthlyData).map((month) => ({
        month,
        orders: monthlyData[month],
      }));

      setChartData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchChartData();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div className="dashboard-cards">
              <div className="card products">
                <BaggageClaim size={40} />
                <h3>Total Products</h3>
                <p>{stats.products}</p>
              </div>

              <div className="card orders">
                <ListCheck size={40} />
                <h3>Total Orders</h3>
                <p>{stats.orders}</p>
              </div>

              <div className="card contacts">
                <CircleUserRound size={40} />
                <h3>Total Contacts</h3>
                <p>{stats.contacts}</p>
              </div>
            </div>

            {/* ?? Chart */}
            <div className="chart-container">
              <h3 style={{ color: "#fff", marginBottom: "20px" }}>
                Monthly Orders Graph
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#00ffcc" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
