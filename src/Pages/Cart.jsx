import React, { useEffect, useState } from 'react'
import './CSS/cart.css'
import axios from 'axios'
import { toast } from "react-toastify";

const Cart = () => {
    const [cart, setCart] = useState([])
    const [address,setAddress] = useState('')

    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("cart")) || []
        setCart(data)
    }, [])

    const getTotal = () =>{
        return cart.reduce((total,item)=>total+item.price*item.quantity,0)
    }

    const handlePlace = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/order', { address, cart })
    
    console.log(res);
    toast.success("Order Placed Successfully");

    localStorage.removeItem("cart");
    setCart([]);
    setAddress('');

  } catch (error) {
    console.log("ERROR:", error.response || error.message);
    toast.error("Order Failed");
  }
}

  return (
    <>
    <div className="cart-container">
            <h2 className="cart-title">My Cart</h2>
            {cart.length === 0 ? (
                <h3 className='empty-cart'>Cart is empty</h3>
            ) : (
                cart.map((item)=>(
                    <div className="cart-item" key={item._id}>

                        <img className='cart-image' src={item.image}  />
                        <div className="cart-details">
                            <h3 className='cart-title-text'>{item.title}</h3>
                            <h3 className='cart-description'>{item.des}</h3>
                            <h3 className='cart-description'>{item.quantity}</h3>
                            <h3 className='cart-price'>{item.price}rs</h3>
                        </div>
                    </div>
                ))
            )}

            <h1>Total Price:- {getTotal()}</h1>
            <input type="text" placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)} /> <br /> <br />
            <button onClick={handlePlace} disabled={cart.length === 0}>Place Order</button>

        </div>
    </>
  )
}

export default Cart
