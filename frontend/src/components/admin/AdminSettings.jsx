import React, { useState } from "react";
import { FiUpload, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import "../../styles/AdminPortal.css";

function AdminSettings({ profile, onUpdateProfile }) {
  const [name, setName] = useState(profile?.name || "Marcus Vance");
  const [email, setEmail] = useState(profile?.email || "admin@fitguide.club");
  const [avatar, setAvatar] = useState(
    profile?.avatar ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        if (onUpdateProfile) {
          onUpdateProfile({ name, email, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({ name, email, avatar });
    }
    setSavedMessage("Profile settings updated successfully!");
    setTimeout(() => setSavedMessage(""), 4000);
  };

  return (
    <div className="admin-settings-container">
      {/* Settings Header */}
      <div className="admin-heading-block" style={{ marginBottom: "26px" }}>
        <h1>Profile &amp; Settings</h1>
        <p>
          Update your FITGUIDE administrator profile details, avatar image, and
          login password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-settings-form">
        {/* Card 1: Profile Image & Admin Details */}
        <div className="admin-settings-card">
          <div className="admin-profile-image-section">
            <img
              src={avatar}
              alt={name}
              className="admin-settings-avatar-img"
            />
            <div className="admin-profile-image-info">
              <h3>Profile Image</h3>
              <p>
                Square portrait image recommended for the FITGUIDE Admin Portal
                header.
              </p>
              <label className="admin-upload-image-btn">
                <FiUpload />
                <span>Change Profile Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <div className="admin-profile-fields-row">
            <div className="admin-field-group">
              <label>Admin Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
              />
            </div>
            <div className="admin-field-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fitguide.club"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Change Password */}
        <div className="admin-settings-card">
          <div className="admin-card-header-split">
            <div>
              <h3>Change Password</h3>
              <p>
                Leave blank if you do not want to update your current password.
              </p>
            </div>
            <button
              type="button"
              className="admin-toggle-pwd-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
              <span>{showPassword ? "Hide" : "Show"}</span>
            </button>
          </div>

          <div className="admin-password-fields-row">
            <div className="admin-field-group">
              <label>Current Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="admin-field-group">
              <label>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 chars"
              />
            </div>
            <div className="admin-field-group">
              <label>Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="admin-settings-actions">
          <button type="submit" className="admin-save-settings-btn">
            Save Changes
          </button>
          {savedMessage && (
            <span className="admin-save-success-msg">
              <FiCheck /> {savedMessage}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;
