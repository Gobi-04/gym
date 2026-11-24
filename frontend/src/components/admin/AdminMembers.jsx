import React from "react";
import { FiUserPlus } from "react-icons/fi";
import "../../styles/AdminPortal.css";

function AdminMembers({ members = [] }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h3>Member Management</h3>
        <button
          className="admin-pill-btn"
          onClick={() => alert("Add Member form: Open member onboarding modal.")}
        >
          <FiUserPlus /> Add New Member
        </button>
      </div>
      <p className="admin-panel-sub">
        Manage all registered athlete &amp; member accounts.
      </p>

      <table className="admin-renewals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>#{m.id}</td>
              <td><strong>{m.name}</strong></td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.plan_name}</td>
              <td>
                <span
                  style={{
                    color: m.membership_status === "expired" ? "#ef4444" : "#10b981",
                    fontWeight: 600,
                  }}
                >
                  {m.membership_status === "expired" ? "Expired" : "Active"}
                </span>
              </td>
              <td>
                <button
                  className="admin-action-link"
                  onClick={() => alert(`Member Details: ${m.name} (${m.email})`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMembers;
