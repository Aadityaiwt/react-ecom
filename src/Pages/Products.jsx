import React, { use, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/Products.css'
import axios from 'axios'


const Products = () => {

  const [product, setProduct] = useState([])
  const getProducts = async() =>{
    try {
      const res = await axios.get('http://localhost:3000/api/get-all')
      setProduct(res.data.product)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getProducts()
  }, [])
  return (
    <>
    
    <Header />

      <div>
        <h2 style={{textAlign: 'center'}}>Products</h2>
        <div className="product-container">
          {product.map((item,i)=> (
            <div className="card-outer" key={item._id}>
              <img src={item.image} />
              <h2>{item.title}</h2>
              <p>{item.des}</p>
              <h3>Price : {item.price}rs</h3>
              <button>Add to cart</button>
              <button>Buy Now</button>
            </div>
          ))}
        </div>
      </div>

    <Footer />
    
    </>
  )
}

export default Products
