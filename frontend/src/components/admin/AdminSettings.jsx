import React from "react";
import { FiLogOut } from "react-icons/fi";
import "../../styles/AdminPortal.css";

function AdminSettings({ onLogout }) {
  return (
    <div className="admin-panel" style={{ maxWidth: "600px" }}>
      <h3>Admin Profile &amp; Settings</h3>
      <p className="admin-panel-sub">
        System administrator account credentials and gym details.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <small style={{ color: "#8b949e" }}>Administrator Name</small>
          <p style={{ margin: "4px 0", fontWeight: 600 }}>Marcus Vance</p>
        </div>
        <div>
          <small style={{ color: "#8b949e" }}>Email Address</small>
          <p style={{ margin: "4px 0", fontWeight: 600 }}>
            admin@fitguide.club
          </p>
        </div>
        <div>
          <small style={{ color: "#8b949e" }}>Role &amp; Permissions</small>
          <p style={{ margin: "4px 0", color: "#c5ff16", fontWeight: 600 }}>
            Super Admin (Full Access)
          </p>
        </div>
        <button
          className="admin-pill-btn"
          style={{ alignSelf: "flex-start", marginTop: "10px" }}
          onClick={onLogout}
        >
          <FiLogOut /> Sign Out from Admin Portal
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
