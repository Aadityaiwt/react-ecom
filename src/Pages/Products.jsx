import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./CSS/Products.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showBuy, setShowBuy] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_URL}/api/get-all`);

      setProduct(res.data.product || res.data.products || res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);

      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order Placed!");
    setShowBuy(false);
  };

  const increaseQty = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);

      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const decreaseQty = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // remove item
          return prevCart.filter((i) => i._id !== item._id);
        }

        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }

      return prevCart;
    });
  };

  return (
    <>
      <Header cart={cart} />

      <div>
        <div className="parent">
          <h1 className="head">Our Products</h1>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : product.length === 0 ? (
          <h2>No Products Found</h2>
        ) : (
          <div className="product-container">
            {product.map((item, i) => (
              <div className="card-outer" key={item._id}>
                <img src={item.image} />
                <h2>{item.title}</h2>
                <p>{item.des}</p>
                <h3>Price : {item.price}rs</h3>
                <div className="cart-btn">
                  <span className="decrease" onClick={() => decreaseQty(item)}>
                    -
                  </span>

                  <FaShoppingCart className="cart-icon" />

                  <span className="increase" onClick={() => increaseQty(item)}>
                    +
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Products;
