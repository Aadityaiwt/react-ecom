import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./CSS/Products.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const Products = () => {
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
  alert("Order Placed!");
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

      {/* {showBuy && (
        <div div className="buy-inner">
          <div className="buy-inner">
            <div className="buy-left">
          <button className="close" onClick={() => setShowBuy(false)}><IoMdClose /></button>
              <form className="buy-form" onSubmit={handleSubmit}>
                <div className="flex">
                  <input type="text" placeholder="Full Name" />
                  <input type="number" placeholder="Phone" />
                </div>

                <div className="flex">
                  <input type="email" placeholder="Email" />
                  <input type="text" placeholder="City" />
                </div>

                <textarea name="address" placeholder="Address"></textarea>

                <div className="flex">
                  <input type="text" placeholder="State" />
                  <input type="number" placeholder="pincode" />
                </div>
                <input type="date" placeholder="Date" />

                <div className="radio-group">
                  <input type="radio" name="payment" value="cod" />
                  Cash on Delivery
                  <input type="radio" name="payment" value="online" />
                  Online Payment
                </div>

                <button type="Submit">Submit</button>
              </form>
            </div>
            <div className="buy-right">
              <div className="image">
                <img
                  src={selectedProduct?.image || "/no-image.png"}
                  alt={selectedProduct?.title}
                />
              </div>

              <div className="description">
                <h2>{selectedProduct?.title}</h2>
                <p>{selectedProduct?.des}</p>
                <p>?{selectedProduct?.price}</p>
              </div>

              
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </>
  );
};

export default Products;
