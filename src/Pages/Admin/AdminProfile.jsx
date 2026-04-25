import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./CSS/AdminProfile.css";
import axios from "axios";

const AdminProfile = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
      setEditData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/api/profile`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="profile-container">
          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar">{profile.name?.charAt(0)}</div>
                <h2>{profile.name}</h2>
                <p>{profile.role}</p>
              </div>

              <div className="profile-info">
                <p>
                  <b>Email: </b> {profile.email}
                </p>
                <p>
                  <b>Phone:</b> {profile.phone}
                </p>
              </div>

              <Button
                label="Edit Profile"
                className="edit-btn"
                onClick={() => setVisible(true)}
              />
            </div>
          )}
        </div>
      </DashboardLayout>

      <Dialog
        header="Edit Profile"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={editData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <button label="Save" className="save-btn" onClick={handleSave} />
        </div>
      </Dialog>
    </>
  );
};

export default AdminProfile;
