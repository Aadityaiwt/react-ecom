import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./CSS/Products.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const Products = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showBuy, setShowBuy] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get-all`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
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
        i._id === item._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
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

  return (
    <>
      <Header cart={cart}/>

      <div>
        <h2 className="head">Our Products</h2>
        <div className="product-container">
          {product.map((item, i) => (
            <div className="card-outer" key={item._id}>
              <img src={item.image} />
              <h2>{item.title}</h2>
              <p>{item.des}</p>
              <h3>Price : {item.price}rs</h3>
              <button onClick={() => addToCart(item)}>Add to cart</button>
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setShowBuy(true);
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
