import React, { use, useEffect, useState } from 'react'
import Cards from '../Components/Cards'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/Products.css'


const Products = () => {

  const [product, setProduct] = useState([])

  useEffect(() => {
      // fetch('pruducts.json')
      fetch('pruducts.json')
      .then((res) => res.json())
      .then((data)=> {
        setProduct(data)
        console.log(data);
      })
      .catch((err)=> console.log(err));
  }, [])
  return (
    <>
    
    <Header />

      <div>
        <h2 style={{textAlign: 'center'}}>Products</h2>
        <div className="product-container">
          {product.map((item)=> {
            <Cards key={item._id} product = {item}/>
          })}
        </div>
      </div>

    <Footer />
    
    </>
  )
}

export default Products
