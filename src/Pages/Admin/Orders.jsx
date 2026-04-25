import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../Components/DashboardLayout";
import "./CSS/Orders.css";

const Orders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return <p>Please login first</p>;
      }

      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<DashboardLayout>
  <div className="orders-page">
    <h2>Orders</h2>

    {loading ? (
      <p>Loading orders...</p>
    ) : orders.length === 0 ? (
      <p>No Orders Found</p>
    ) : (
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Products</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.contact}</td>
              <td>{order.address}</td>

              {/* Products Column */}
              <td>
                {order.products?.map((item, i) => (
                  <div key={i} className="table-product">
                    <img src={item.image} alt="" />
                    <div>
                      <p><b>Title : </b>{item.title}</p>
                      <p><b>Price : </b>{item.price}rs</p>
                      <p><b>Quantity :  </b>{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </td>

              <td>{order.totalAmount}rs</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</DashboardLayout>
  );
};

export default Orders;
