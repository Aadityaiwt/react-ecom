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
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-user">
                  <h3>{order.name}</h3>
                  <p>
                    <b>Email : </b>
                    {order.email}
                  </p>
                  <p>
                    <b>Phone : </b>
                    {order.contact}
                  </p>
                  <p>
                    <b>Address : </b>
                    {order.address}
                  </p>
                </div>

                <div className="order-products">
                  {order.products?.map((item, i) => (
                    <div className="order-item" key={i}>
                      <img className="order-image" src={item.image} />

                      <div>
                        <h4>{item.title}</h4>
                        <p>
                          Price : {item.price} <br />
                        </p>
                        <p>Quantity : {item.quantity}</p> <hr />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                  <h4>Total: {order.totalAmount}rs</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
