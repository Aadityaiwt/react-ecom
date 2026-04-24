import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./CSS/AdminContact.css";

const AdminContact = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // ?? Auth check
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) navigate("/login");
  // }, []);

  // ?? Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/contact/get-all`);
      setContacts(res.data.contacts);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ? Delete contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/contact/delete/${id}`);
      toast("Contact Deleted");
      fetchContacts();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  // ?? Action buttons
  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          label="Delete"
          className="ed-btn"
          onClick={() => handleDelete(rowData._id)}
        />
      </div>
    );
  };

  // ?? Search filter
  const filteredContacts = contacts.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.firstName.toLowerCase().includes(text) ||
      item.lastName.toLowerCase().includes(text) ||
      item.email.toLowerCase().includes(text) ||
      item.phone.includes(text) ||
      item.message.toLowerCase().includes(text)
    );
  });

  return (
    <>
      <DashboardLayout>
        <div className="header-button">
          <h2>Contact Messages</h2>
        </div>

        {/* ?? Search */}
        <div className="search">
          <input
            type="text"
            placeholder="Search contact..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ?? Data Table */}
        <DataTable
          value={filteredContacts}
          className="p-datatable-gridlines"
          tableStyle={{ minWidth: "70rem", textAlign: "center" }}
        >
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="address" header="Address" />
          <Column field="message" header="Message" />
          <Column header="Action" body={actionTemplate} />
        </DataTable>
      </DashboardLayout>
    </>
  );
};

export default AdminContact;