import React from "react";
import "../../styles/AdminPortal.css";

function AdminPayments({ payments = [] }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h3>Membership &amp; Payments</h3>
        <span style={{ color: "#c5ff16", fontWeight: 700 }}>
          Total Collected: ₹68,493
        </span>
      </div>
      <p className="admin-panel-sub">
        Verified gym invoices, subscriptions, and receipts.
      </p>

      <table className="admin-renewals-table">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Customer Name</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>
                <code>{p.id}</code>
              </td>
              <td>
                <strong>{p.customer_name}</strong>
              </td>
              <td>{p.plan_name}</td>
              <td style={{ color: "#c5ff16", fontWeight: 700 }}>
                ₹{Number(p.amount).toLocaleString("en-IN")}
              </td>
              <td>{p.method}</td>
              <td style={{ color: "#10b981" }}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayments;
