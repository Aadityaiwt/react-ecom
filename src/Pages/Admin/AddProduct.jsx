import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./CSS/AddProduct.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AddProduct = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get-all`);
      setProduct(res.data.product || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("des", des);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");

      let res;

      if (editMode) {
        res = await axios.put(
          `${API_URL}/api/update/${selectedProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Product Updated");
      } else {
        res = await axios.post(`${API_URL}/api/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Product Added");
      }

      fetchProduct();
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rowData) => {
    setEditMode(true);
    setSelectedProduct(rowData);
    setTitle(rowData.title);
    setDes(rowData.des);
    setPrice(rowData.price);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product Deleted");
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDes("");
    setPrice("");
    setImage(null);
    setEditMode(false);
    setSelectedProduct(null);
    setVisible(false);
  };

  const actionTemplate = (rowData) => (
    <div>
      <Button label="Edit" onClick={() => handleEdit(rowData)} className="ed-btn" />
      <Button label="Delete" onClick={() => handleDelete(rowData._id)} className="ed-btn" />
    </div>
  );

  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt="product" className="add-product-image" />
  );

  const filteredProducts = product.filter((item) => {
    const s = search.toLowerCase();
    return (
      item.title?.toLowerCase().includes(s) ||
      item.des?.toLowerCase().includes(s) ||
      item.price?.toString().includes(s)
    );
  });

  return (
    <DashboardLayout>
      <div className="header-button">
        <h2>Add Product</h2>

        <Button
          label="Add Product"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable value={filteredProducts}>
        <Column field="title" header="Name" />
        <Column header="Image" body={imageBodyTemplate} />
        <Column field="des" header="Description" />
        <Column field="price" header="Price" />
        <Column header="Action" body={actionTemplate} />
      </DataTable>

      <Dialog
        header={editMode ? "Edit Product" : "Add Product"}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input value={des} onChange={(e) => setDes(e.target.value)} placeholder="Description" />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

          <button disabled={loading}>
            {loading ? "Processing..." : editMode ? "Update" : "Add"}
          </button>
        </form>
      </Dialog>
    </DashboardLayout>
  );
};

export default AddProduct;