import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./CSS/AddProduct.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  useEffect(()=> {
    if(!token) {
      navigate('/login')
    }
  }, [])



  
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [Loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoader(true);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("des", des);
  formData.append("price", price);

  if (image) {
    formData.append("image", image);
  }

  try {
    let res;

    if (editMode) {
      res = await axios.post(
        `http://localhost:3000/api/update/${selectedProduct._id}`,
        formData
      );

      toast("Product Updated");
    } else {
      res = await axios.post("http://localhost:3000/api/add", formData);
      toast("Product Added");
    }

    fetchProduct();
    resetForm();

  } catch (error) {
    console.log(error);
    toast("Something went wrong");
  } finally {
    setLoader(false);
  }
}

  useEffect(() => {
    fetchProduct();
  }, []);

const handleEdit = (rowData) => {
  setEditMode(true);
  setSelectedProduct(rowData);
  setTitle(rowData.title);
  setDes(rowData.des);
  setPrice(rowData.price);
  if (image) {
  formData.append("image", image);
  }
  setVisible(true);
};

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      fetchProduct();
      toast("Product Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const actionTemplate = (rowData) => {
  return (
    <div>
      <Button 
        label="Edit" 
        onClick={() => handleEdit(rowData)} 
        className="ed-btn" 
      />
      
      <Button 
        label="Delete" 
        onClick={() => handleDelete(rowData._id)} 
        className="ed-btn" 
      />
    </div>
  );
};

  const resetForm = () => {
    setDes("");
    setTitle("");
    setPrice("");
    setImage(null);
    setSelectedProduct(null);
    setEditMode(false);
    setVisible(false)
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/get-all");
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const imageBodyTemplate = (rowData) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={rowData.image}
        alt="product"
        className="add-product-image"
      />
    </div>
  );
};

  return (
    <>
      <DashboardLayout>
        <div className="header-button">
          <h2>Add Product</h2>
          <Button
            className="add-form-btn"
            label="Add Product"
            icon="pi pi-external-link"
            onClick={() => setVisible(true)}
          />
        </div>

        <DataTable
          className="p-datatable-gridlines"
          value={product}
          tableStyle={{ minWidth: "60rem", textAlign: "center" }}
        >
          <Column field="title" header="Name"></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="des" header="Description"></Column>
          <Column field="price" header="Price"></Column>
          <Column header="Action" body={actionTemplate}></Column>
        </DataTable>
      </DashboardLayout>
      <div className="card flex justify-content-center">
        <Dialog
          className="dialog"
          header={editMode ? "Edit Product" : "Add Product"}
          visible={visible}
          style={{ width: "30vw", backgroundColor: "brown" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <p className="m-0">
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br /> <br />
              <input
                type="text"
                placeholder="Description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
              <br /> <br />
              <input
                id="file"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br /> <br />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br /> <br />
              <button type="submit" className="add-btn">
                {Loader
                  ? editMode
                    ? "Update.."
                    : "Adding.."
                  : editMode
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </form>
          </p>
        </Dialog>
      </div>
    </>
  );
};

export default AddProduct;
