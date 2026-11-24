import React from "react";
import {
  FiUsers,
  FiCreditCard,
  FiCheckCircle,
  FiAlertTriangle,
  FiActivity,
  FiCoffee,
  FiClock,
} from "react-icons/fi";
import "../../styles/AdminPortal.css";

const defaultRenewals = [
  {
    id: 1,
    name: "Kabir Deshmukh",
    memberId: "FG-1047",
    plan: "Monthly - 1 Month",
    expiryDate: "2026-11-05",
    status: "Expired",
    isDue: false,
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    memberId: "FG-1043",
    plan: "Monthly - 1 Month",
    expiryDate: "2026-11-12",
    status: "Expired",
    isDue: false,
  },
  {
    id: 3,
    name: "Ishita Banerjee",
    memberId: "FG-1050",
    plan: "Quarterly - 3 Months",
    expiryDate: "2026-11-14",
    status: "Expired",
    isDue: false,
  },
  {
    id: 4,
    name: "Ananya Verma",
    memberId: "FG-1044",
    plan: "Quarterly - 3 Months",
    expiryDate: "2026-11-29",
    status: "Due in 7d",
    isDue: true,
  },
  {
    id: 5,
    name: "Meera Krishnan",
    memberId: "FG-1046",
    plan: "Monthly - 1 Month",
    expiryDate: "2026-12-01",
    status: "Due in 9d",
    isDue: true,
  },
  {
    id: 6,
    name: "Priya Nair",
    memberId: "FG-1042",
    plan: "Quarterly - 3 Months",
    expiryDate: "2026-12-02",
    status: "Due in 10d",
    isDue: true,
  },
];

const tierDistribution = [
  {
    name: "Monthly - 1 Month",
    price: "₹2,499 - 1 Month",
    members: 4,
    percent: 40,
  },
  {
    name: "Quarterly - 3 Months",
    price: "₹6,499 - 3 Months",
    members: 4,
    percent: 40,
  },
  {
    name: "Annual - 12 Months",
    price: "₹18,999 - 12 Months",
    members: 2,
    percent: 20,
  },
];

const recentRegistrations = [
  {
    id: 1,
    name: "Devansh Joshi",
    details: "Fat Loss · Vegetarian · Monthly - 1 Month",
    date: "2026-11-20",
    status: "Active",
  },
  {
    id: 2,
    name: "Sneha Kulkarni",
    details: "Weight Loss · Non-Vegetarian · Quarterly - 3 Months",
    date: "2026-11-18",
    status: "Active",
  },
  {
    id: 3,
    name: "Meera Krishnan",
    details: "Fat Loss · Non-Vegetarian · Monthly - 1 Month",
    date: "2026-11-01",
    status: "Active",
  },
  {
    id: 4,
    name: "Rohan Malhotra",
    details: "Muscle Building · Non-Vegetarian · Monthly - 1 Month",
    date: "2026-10-12",
    status: "Active",
  },
];

const recentTransactions = [
  {
    id: 1,
    name: "Devansh Joshi",
    details: "TXN-FG-20261120-8841 · UPI · Monthly - 1 Month",
    amount: "₹2,499",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sneha Kulkarni",
    details: "TXN-FG-20261118-7730 · Credit Card · Quarterly - 3 Months",
    amount: "₹6,499",
    status: "Paid & Verified",
  },
  {
    id: 3,
    name: "Rohan Malhotra",
    details: "TXN-FG-20261112-6512 · Net Banking · Monthly - 1 Month",
    amount: "₹2,499",
    status: "Pending",
  },
  {
    id: 4,
    name: "Kabir Deshmukh",
    details: "TXN-FG-20261005-4421 · UPI · Monthly - 1 Month",
    amount: "₹2,499",
    status: "Paid & Verified",
  },
];

function AdminOverview({ onNavigateMenu }) {
  return (
    <>
      {/* ADMIN OVERVIEW HEADER ROW */}
      <div className="admin-header-row">
        <div className="admin-heading-block">
          <h1>Admin Overview</h1>
          <p>
            Synchronized snapshot of FITGUIDE member registrations, active plans,
            renewals, and verified payments.
          </p>
        </div>

        <div className="admin-quick-pills">
          <button
            className="admin-pill-btn"
            onClick={() => onNavigateMenu("Member Management")}
          >
            <FiUsers /> Member Management
          </button>
          <button
            className="admin-pill-btn"
            onClick={() => onNavigateMenu("Membership & Payments")}
          >
            <FiCreditCard /> Membership &amp; Payments
          </button>
          <button
            className="admin-pill-btn"
            onClick={() => onNavigateMenu("Workout Management")}
          >
            <FiActivity /> Workout Management
          </button>
          <button
            className="admin-pill-btn"
            onClick={() => onNavigateMenu("Diet Plan Management")}
          >
            <FiCoffee /> Diet Plan Management
          </button>
        </div>
      </div>

      {/* 4 STATS CARDS DECK (Matches Screenshot) */}
      <div className="admin-stats-deck">
        {/* 1. Total Members */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Total Members</span>
            <FiUsers />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num">10</span>
            <button
              className="admin-deck-link"
              onClick={() => onNavigateMenu("Member Management")}
            >
              View all ↗
            </button>
          </div>
        </div>

        {/* 2. Active Memberships */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Active Memberships</span>
            <FiCheckCircle className="icon-green" />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num">7</span>
            <span className="admin-deck-tag">70% active</span>
          </div>
        </div>

        {/* 3. Expired Memberships */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Expired Memberships</span>
            <FiAlertTriangle className="icon-amber" />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num">3</span>
            <button
              className="admin-deck-link color-amber"
              onClick={() => onNavigateMenu("Member Management")}
            >
              Review ↗
            </button>
          </div>
        </div>

        {/* 4. Total Payments Collected */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Total Payments Collected</span>
            <FiCreditCard />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num color-lime">₹68,493</span>
            <span className="admin-deck-tag color-gray">7 verified</span>
          </div>
        </div>
      </div>

      {/* DUAL PANELS ROW 1 (Membership Status & Renewals) */}
      <div className="admin-panels-row">
        {/* LEFT PANEL: Membership Status Overview */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Membership Status Overview</h3>
            <button
              className="admin-panel-action"
              onClick={() => onNavigateMenu("Membership & Payments")}
            >
              Manage plans
            </button>
          </div>
          <p className="admin-panel-sub">
            Live enrollment distribution across FITGUIDE membership tiers.
          </p>

          {/* Dual Progress Bar */}
          <div className="admin-progress-header">
            <span className="active-label">Active (7)</span>
            <span className="expired-label">Expired (3)</span>
          </div>
          <div className="admin-dual-progress">
            <div className="bar-active" style={{ width: "70%" }} />
            <div className="bar-expired" style={{ width: "30%" }} />
          </div>

          {/* Tier Rows */}
          <div className="admin-tier-rows">
            {tierDistribution.map((tier) => (
              <div className="admin-tier-row" key={tier.name}>
                <div>
                  <div className="admin-tier-name">{tier.name}</div>
                  <div className="admin-tier-price">{tier.price}</div>
                </div>
                <div className="admin-tier-stats">
                  <div className="admin-tier-members">
                    {tier.members} members
                  </div>
                  <div className="admin-tier-pct">{tier.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Members Requiring Membership Renewal */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Members Requiring Membership Renewal</h3>
            <button
              className="admin-panel-action"
              onClick={() => onNavigateMenu("Member Management")}
            >
              Open renewals
            </button>
          </div>
          <p className="admin-panel-sub">
            Expired memberships or plans expiring within the next 14 days.
          </p>

          <table className="admin-renewals-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {defaultRenewals.map((r) => (
                <tr key={r.memberId}>
                  <td>
                    <div className="admin-renewal-name">{r.name}</div>
                    <div className="admin-renewal-id">{r.memberId}</div>
                  </td>
                  <td>{r.plan}</td>
                  <td>{r.expiryDate}</td>
                  <td>
                    {r.isDue ? (
                      <span className="admin-status-pill-due">
                        <FiClock /> {r.status}
                      </span>
                    ) : (
                      <span className="admin-status-pill-expired">
                        <FiAlertTriangle /> {r.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="admin-action-link"
                      onClick={() => onNavigateMenu("Member Management")}
                    >
                      View Member
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DUAL PANELS ROW 2 (Recent Registrations & Recent Payment Transactions) */}
      <div className="admin-panels-row" style={{ marginTop: "24px" }}>
        {/* LEFT PANEL: Recent Member Registrations */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Recent Member Registrations</h3>
            <button
              className="admin-panel-action"
              onClick={() => onNavigateMenu("Member Management")}
            >
              All members
            </button>
          </div>

          <div className="admin-recent-list">
            {recentRegistrations.map((item) => (
              <div className="admin-recent-item" key={item.id}>
                <div className="admin-recent-info">
                  <h4>{item.name}</h4>
                  <p>{item.details}</p>
                </div>
                <div className="admin-recent-meta">
                  <div className="admin-recent-date">{item.date}</div>
                  <span className="admin-recent-badge active">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Recent Payment Transactions */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Recent Payment Transactions</h3>
            <button
              className="admin-panel-action"
              onClick={() => onNavigateMenu("Membership & Payments")}
            >
              Payment history
            </button>
          </div>

          <div className="admin-recent-list">
            {recentTransactions.map((tx) => (
              <div className="admin-recent-item" key={tx.id}>
                <div className="admin-recent-info">
                  <h4>{tx.name}</h4>
                  <p>{tx.details}</p>
                </div>
                <div className="admin-recent-meta">
                  <div className="admin-recent-amount">{tx.amount}</div>
                  <span
                    className={`admin-recent-badge ${
                      tx.status === "Pending" ? "pending" : "verified"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOverview;
