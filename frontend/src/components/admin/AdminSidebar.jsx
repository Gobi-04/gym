import React from "react";
import {
  FiGrid,
  FiUsers,
  FiCreditCard,
  FiActivity,
  FiCoffee,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "../../styles/AdminSidebar.css";

function AdminSidebar({ activeMenu, onSelectMenu, onLogout }) {
  return (
    <aside className="admin-sidebar">
      {/* Brand Logo */}
      <div className="admin-brand-logo">
        <div className="admin-brand-badge">F</div>
        <div className="admin-brand-text">FITGUIDE</div>
      </div>

      {/* Navigation Menu */}
      <nav className="admin-sidebar-menu">
        <button
          className={`admin-menu-btn ${activeMenu === "Dashboard" ? "active" : ""}`}
          onClick={() => onSelectMenu("Dashboard")}
        >
          <FiGrid />
          <span>Dashboard</span>
        </button>

        <button
          className={`admin-menu-btn ${activeMenu === "Member Management" ? "active" : ""}`}
          onClick={() => onSelectMenu("Member Management")}
        >
          <FiUsers />
          <span>Member Management</span>
        </button>

        <button
          className={`admin-menu-btn ${activeMenu === "Membership & Payments" ? "active" : ""}`}
          onClick={() => onSelectMenu("Membership & Payments")}
        >
          <FiCreditCard />
          <span>Membership &amp; Payments</span>
        </button>

        <button
          className={`admin-menu-btn ${activeMenu === "Workout Management" ? "active" : ""}`}
          onClick={() => onSelectMenu("Workout Management")}
        >
          <FiActivity />
          <span>Workout Management</span>
        </button>

        <button
          className={`admin-menu-btn ${activeMenu === "Diet Plan Management" ? "active" : ""}`}
          onClick={() => onSelectMenu("Diet Plan Management")}
        >
          <FiCoffee />
          <span>Diet Plan Management</span>
        </button>

        <button
          className={`admin-menu-btn ${activeMenu === "Profile & Settings" ? "active" : ""}`}
          onClick={() => onSelectMenu("Profile & Settings")}
        >
          <FiSettings />
          <span>Profile &amp; Settings</span>
        </button>
      </nav>

      {/* Footer Logout */}
      <div className="admin-sidebar-footer">
        <button className="admin-logout-link" onClick={onLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
