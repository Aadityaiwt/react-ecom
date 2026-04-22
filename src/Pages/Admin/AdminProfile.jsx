import React, { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import './CSS/AdminProfile.css'


const AdminProfile = () => {
  const [visible, setVisible] = useState(false);

  // ?? Dummy data (later API se replace karna)
  const [profile, setProfile] = useState({
    name: "Aditya Kumar",
    email: "admin@gmail.com",
    phone: "6389450032",
    role: "Admin",
  });

  const [editData, setEditData] = useState(profile);

  // ? Handle change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ? Save
  const handleSave = () => {
    setProfile(editData);
    setVisible(false);
  };

  return (
    <>
      <DashboardLayout>
        <div className="profile-container">
          <div className="profile-card">

            {/* ?? Profile Header */}
            <div className="profile-header">
              <div className="avatar">
                {profile.name.charAt(0)}
              </div>
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
            </div>

            {/* ?? Info */}
            <div className="profile-info">
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Phone:</b> {profile.phone}</p>
            </div>

            {/* ?? Edit Button */}
            <Button
              label="Edit Profile"
              className="edit-btn"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </DashboardLayout>

      {/* ?? Edit Dialog */}
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

          <Button
            label="Save"
            className="save-btn"
            onClick={handleSave}
          />
        </div>
      </Dialog>
    </>
  );
};

export default AdminProfile;