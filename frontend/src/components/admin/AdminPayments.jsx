import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiEdit2,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiX,
  FiDownload,
  FiPrinter,
  FiCheck,
} from "react-icons/fi";
import "../../styles/AdminPayments.css";

const defaultPlans = [
  {
    id: "monthly",
    name: "Monthly - 1 Month",
    duration: "1 Month",
    enrolled: 4,
    price: 2499,
    description:
      "Full gym access, goal-based weekly workouts, and personalized diet schedule for 30 days.",
  },
  {
    id: "quarterly",
    name: "Quarterly - 3 Months",
    duration: "3 Months",
    enrolled: 4,
    price: 6499,
    description:
      "90-day structured transformation cycle with workout & meal plan synchronization.",
  },
  {
    id: "annual",
    name: "Annual - 12 Months",
    duration: "12 Months",
    enrolled: 2,
    price: 19999,
    description:
      "Complete 12-month performance membership with full workout and nutrition portal access.",
  },
];

const defaultTransactions = [
  {
    id: "TXN-FG-20261120-8841",
    receiptNo: "RCPT-2026-0088",
    member: "Devansh Joshi",
    memberId: "FG-1049",
    package: "Monthly - 1 Month",
    method: "UPI",
    amount: 2499,
    date: "2026-11-20",
    status: "Pending",
  },
  {
    id: "TXN-FG-20261118-7730",
    receiptNo: "RCPT-2026-0087",
    member: "Sneha Kulkarni",
    memberId: "FG-1048",
    package: "Quarterly - 3 Months",
    method: "Credit Card",
    amount: 6499,
    date: "2026-11-18",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20261112-6512",
    receiptNo: "RCPT-2026-0086",
    member: "Rohan Malhotra",
    memberId: "FG-1043",
    package: "Monthly - 1 Month",
    method: "Net Banking",
    amount: 2499,
    date: "2026-11-12",
    status: "Pending",
  },
  {
    id: "TXN-FG-20261105-5401",
    receiptNo: "RCPT-2026-0085",
    member: "Kabir Deshmukh",
    memberId: "FG-1047",
    package: "Monthly - 1 Month",
    method: "UPI",
    amount: 2499,
    date: "2026-11-05",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20261101-4390",
    receiptNo: "RCPT-2026-0084",
    member: "Meera Krishnan",
    memberId: "FG-1046",
    package: "Monthly - 1 Month",
    method: "Google Pay",
    amount: 2499,
    date: "2026-11-01",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20261020-3289",
    receiptNo: "RCPT-2026-0083",
    member: "Vikramaditya Rao",
    memberId: "FG-1045",
    package: "Annual - 12 Months",
    method: "Credit Card",
    amount: 19999,
    date: "2026-10-20",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20260929-2178",
    receiptNo: "RCPT-2026-0082",
    member: "Ananya Verma",
    memberId: "FG-1044",
    package: "Quarterly - 3 Months",
    method: "UPI",
    amount: 6499,
    date: "2026-09-29",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20260914-1067",
    receiptNo: "RCPT-2026-0081",
    member: "Ishita Banerjee",
    memberId: "FG-1050",
    package: "Quarterly - 3 Months",
    method: "Credit Card",
    amount: 6499,
    date: "2026-09-14",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20260902-9956",
    receiptNo: "RCPT-2026-0080",
    member: "Priya Nair",
    memberId: "FG-1042",
    package: "Quarterly - 3 Months",
    method: "UPI",
    amount: 6499,
    date: "2026-09-02",
    status: "Paid & Verified",
  },
  {
    id: "TXN-FG-20260815-8845",
    receiptNo: "RCPT-2026-0079",
    member: "Aarav Sharma",
    memberId: "FG-1041",
    package: "Annual - 12 Months",
    method: "Net Banking",
    amount: 19999,
    date: "2026-08-15",
    status: "Paid & Verified",
  },
];

const activeExpiredList = [
  { id: "FG-1041", name: "Aarav Sharma", plan: "Annual - 12 Months", status: "Active", expiry: "2027-08-15", amount: "₹19,999" },
  { id: "FG-1042", name: "Priya Nair", plan: "Quarterly - 3 Months", status: "Active", expiry: "2026-12-02", amount: "₹6,499" },
  { id: "FG-1043", name: "Rohan Malhotra", plan: "Monthly - 1 Month", status: "Expired", expiry: "2026-11-12", amount: "₹2,499" },
  { id: "FG-1044", name: "Ananya Verma", plan: "Quarterly - 3 Months", status: "Active", expiry: "2026-11-29", amount: "₹6,499" },
  { id: "FG-1045", name: "Vikramaditya Rao", plan: "Annual - 12 Months", status: "Active", expiry: "2027-08-20", amount: "₹19,999" },
  { id: "FG-1046", name: "Meera Krishnan", plan: "Monthly - 1 Month", status: "Active", expiry: "2026-12-01", amount: "₹2,499" },
  { id: "FG-1047", name: "Kabir Deshmukh", plan: "Monthly - 1 Month", status: "Expired", expiry: "2026-11-05", amount: "₹2,499" },
  { id: "FG-1048", name: "Sneha Kulkarni", plan: "Quarterly - 3 Months", status: "Active", expiry: "2026-11-18", amount: "₹6,499" },
  { id: "FG-1049", name: "Devansh Joshi", plan: "Monthly - 1 Month", status: "Active", expiry: "2026-12-20", amount: "₹2,499" },
  { id: "FG-1050", name: "Ishita Banerjee", plan: "Quarterly - 3 Months", status: "Expired", expiry: "2026-11-14", amount: "₹6,499" },
];

const upcomingRenewalsList = [
  { id: "FG-1044", name: "Ananya Verma", plan: "Quarterly - 3 Months", dueIn: "Due in 7d", expiry: "2026-11-29", renewalCost: "₹6,499" },
  { id: "FG-1046", name: "Meera Krishnan", plan: "Monthly - 1 Month", dueIn: "Due in 9d", expiry: "2026-12-01", renewalCost: "₹2,499" },
  { id: "FG-1042", name: "Priya Nair", plan: "Quarterly - 3 Months", dueIn: "Due in 10d", expiry: "2026-12-02", renewalCost: "₹6,499" },
  { id: "FG-1049", name: "Devansh Joshi", plan: "Monthly - 1 Month", dueIn: "Due in 28d", expiry: "2026-12-20", renewalCost: "₹2,499" },
  { id: "FG-1047", name: "Kabir Deshmukh", plan: "Monthly - 1 Month", dueIn: "Expired", expiry: "2026-11-05", renewalCost: "₹2,499" },
  { id: "FG-1043", name: "Rohan Malhotra", plan: "Monthly - 1 Month", dueIn: "Expired", expiry: "2026-11-12", renewalCost: "₹2,499" },
  { id: "FG-1050", name: "Ishita Banerjee", plan: "Quarterly - 3 Months", dueIn: "Expired", expiry: "2026-11-14", renewalCost: "₹6,499" },
];

function AdminPayments() {
  // Plan Configurations State
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("fitguideAdminPlans");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return defaultPlans;
  });

  // Transactions State
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fitguideAdminTransactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return defaultTransactions;
  });

  // Active Tab: "history" | "active-expired" | "renewals"
  const [activeTab, setActiveTab] = useState("history");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleStatusChange = (txnId, newStatus) => {
    const updated = transactions.map((t) =>
      t.id === txnId ? { ...t, status: newStatus } : t
    );
    setTransactions(updated);
    localStorage.setItem("fitguideAdminTransactions", JSON.stringify(updated));
    showToast(`Transaction ${txnId} status updated to ${newStatus}`);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    const updated = plans.map((p) =>
      p.id === editingPlan.id ? editingPlan : p
    );
    setPlans(updated);
    localStorage.setItem("fitguideAdminPlans", JSON.stringify(updated));
    setEditingPlan(null);
    showToast(`Plan ${editingPlan.name} updated!`);
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matches =
          t.id.toLowerCase().includes(q) ||
          t.receiptNo.toLowerCase().includes(q) ||
          t.member.toLowerCase().includes(q) ||
          t.memberId.toLowerCase().includes(q) ||
          t.package.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (statusFilter !== "All") {
        if (t.status !== statusFilter) return false;
      }

      return true;
    });
  }, [transactions, searchTerm, statusFilter]);

  return (
    <div className="admin-payments-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <FiCheck /> {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div className="admin-heading-block" style={{ marginBottom: "26px" }}>
        <h1>Membership &amp; Payments</h1>
        <p>
          Configure membership packages, monitor active/expired memberships,
          verify payments, and issue receipts.
        </p>
      </div>

      {/* SECTION 1: Membership Plans */}
      <div className="admin-plans-section">
        <div className="admin-plans-header">
          <h3>Membership Plans</h3>
          <span>Changes synchronize directly with member records &amp; receipts</span>
        </div>

        <div className="admin-plans-cards-grid">
          {plans.map((p) => (
            <div key={p.id} className="admin-plan-card">
              <div className="admin-plan-card-top">
                <div className="admin-plan-card-title-wrap">
                  <h4>{p.name}</h4>
                  <span className="admin-plan-card-enrolled">
                    {p.duration} · {p.enrolled} enrolled
                  </span>
                </div>
                <button
                  type="button"
                  className="admin-plan-edit-btn"
                  onClick={() => setEditingPlan({ ...p })}
                  title={`Edit ${p.name}`}
                >
                  <FiEdit2 />
                </button>
              </div>

              <div className="admin-plan-price">
                ₹{p.price.toLocaleString("en-IN")}
              </div>

              <p className="admin-plan-description">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Segmented Tabs & Filters */}
      <div className="admin-payments-toolbar">
        {/* Left Segmented Control Tabs */}
        <div className="admin-segmented-tabs">
          <button
            type="button"
            className={`admin-seg-tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Payment History ({transactions.length})
          </button>
          <button
            type="button"
            className={`admin-seg-tab ${activeTab === "active-expired" ? "active" : ""}`}
            onClick={() => setActiveTab("active-expired")}
          >
            Active &amp; Expired ({activeExpiredList.length})
          </button>
          <button
            type="button"
            className={`admin-seg-tab ${activeTab === "renewals" ? "active" : ""}`}
            onClick={() => setActiveTab("renewals")}
          >
            Upcoming Renewals ({upcomingRenewalsList.length})
          </button>
        </div>

        {/* Right Search & Filter */}
        <div className="admin-payments-filter-group">
          <div className="admin-payments-search-box">
            <FiSearch className="admin-payments-search-icon" />
            <input
              type="text"
              placeholder="Search member or ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-filter-dropdown-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Payment Statuses</option>
              <option value="Paid & Verified">Paid &amp; Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: Content based on active tab */}
      {activeTab === "history" && (
        <div className="admin-members-table-card">
          <div className="admin-members-table-wrapper">
            <table className="admin-members-table admin-transactions-table">
              <thead>
                <tr>
                  <th>Transaction Reference</th>
                  <th>Member</th>
                  <th>Package</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Verify Status</th>
                  <th style={{ textAlign: "right", paddingRight: "24px" }}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => {
                    const isPending = tx.status === "Pending";
                    return (
                      <tr key={tx.id}>
                        <td>
                          <div className="txn-ref-bold">{tx.id}</div>
                          <div className="txn-ref-sub">{tx.receiptNo}</div>
                        </td>
                        <td>
                          <div className="txn-member-bold">{tx.member}</div>
                          <div className="txn-member-id">{tx.memberId}</div>
                        </td>
                        <td className="txn-package-cell">{tx.package}</td>
                        <td className="txn-method-cell">{tx.method}</td>
                        <td className="txn-amount-cell">
                          ₹{tx.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="txn-date-cell">{tx.date}</td>
                        <td>
                          <div className="admin-status-select-wrap">
                            <select
                              value={tx.status}
                              onChange={(e) =>
                                handleStatusChange(tx.id, e.target.value)
                              }
                              className={`admin-status-dropdown ${isPending ? "status-pending-select" : "status-verified-select"
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid & Verified">Paid &amp; Verified</option>
                            </select>
                          </div>
                        </td>
                        <td style={{ textAlign: "right", paddingRight: "24px" }}>
                          <button
                            type="button"
                            className="admin-receipt-action-btn"
                            onClick={() => setSelectedReceipt(tx)}
                          >
                            <FiFileText />
                            <span>Receipt</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="admin-no-results-cell">
                      No transaction records found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "active-expired" && (
        <div className="admin-members-table-card">
          <div className="admin-members-table-wrapper">
            <table className="admin-members-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Assigned Plan</th>
                  <th>Status</th>
                  <th>Plan Amount</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {activeExpiredList.map((m) => {
                  const isActive = m.status === "Active";
                  return (
                    <tr key={m.id}>
                      <td className="member-id-cell">{m.id}</td>
                      <td className="member-name-cell">{m.name}</td>
                      <td>{m.plan}</td>
                      <td>
                        <span
                          className={`member-status-indicator ${isActive ? "status-active" : "status-expired"
                            }`}
                        >
                          {isActive ? <FiCheckCircle /> : <FiClock />}
                          <span>{m.status}</span>
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: "#ffffff" }}>{m.amount}</td>
                      <td className="member-expiry-cell">{m.expiry}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "renewals" && (
        <div className="admin-members-table-card">
          <div className="admin-members-table-wrapper">
            <table className="admin-members-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Current Plan</th>
                  <th>Due Status</th>
                  <th>Renewal Cost</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {upcomingRenewalsList.map((r) => {
                  const isExpired = r.dueIn === "Expired";
                  return (
                    <tr key={r.id}>
                      <td className="member-id-cell">{r.id}</td>
                      <td className="member-name-cell">{r.name}</td>
                      <td>{r.plan}</td>
                      <td>
                        <span
                          className={`member-status-indicator ${isExpired ? "status-expired" : "status-due"
                            }`}
                        >
                          <FiClock />
                          <span>{r.dueIn}</span>
                        </span>
                      </td>
                      <td style={{ color: "#c5ff16", fontWeight: 700 }}>{r.renewalCost}</td>
                      <td className="member-expiry-cell">{r.expiry}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedReceipt && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="admin-modal-window admin-receipt-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-receipt-sheet">
              {/* Receipt Header */}
              <div className="admin-receipt-header">
                <div>
                  <div className="admin-receipt-brand">FITGUIDE</div>
                  <div className="admin-receipt-brand-sub">
                    Fitness Performance Gym &amp; Fitness Center
                  </div>
                </div>
                <div className="admin-receipt-badge-verified">
                  VERIFIED GYM TAX INVOICE
                </div>
              </div>

              {/* Member details card */}
              <div className="admin-receipt-meta-box">
                <div className="meta-left">
                  <span className="meta-label">MEMBER NAME</span>
                  <div className="meta-name">{selectedReceipt.member}</div>
                  <span className="meta-sub">
                    {selectedReceipt.memberId} · {selectedReceipt.package}
                  </span>
                </div>
                <div className="meta-right">
                  <span className="meta-amount">
                    ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="meta-paid-pill">Paid &amp; Verified</span>
                </div>
              </div>

              {/* Receipt breakdown */}
              <div className="admin-receipt-grid">
                <div>
                  <span className="meta-label">Receipt Number</span>
                  <p>{selectedReceipt.receiptNo}</p>
                </div>
                <div>
                  <span className="meta-label">Transaction ID</span>
                  <p>{selectedReceipt.id}</p>
                </div>
                <div>
                  <span className="meta-label">Invoice Date</span>
                  <p>{selectedReceipt.date}</p>
                </div>
                <div>
                  <span className="meta-label">Payment Method</span>
                  <p>{selectedReceipt.method}</p>
                </div>
              </div>

              <div className="admin-receipt-pricing">
                <div className="pricing-row">
                  <span>Membership Fee ({selectedReceipt.package})</span>
                  <span>
                    ₹{(selectedReceipt.amount - 500).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pricing-row">
                  <span>GST (CGST + SGST 18%)</span>
                  <span>₹500</span>
                </div>
                <div className="pricing-row pricing-total">
                  <span>Total Paid</span>
                  <span style={{ color: "#c5ff16" }}>
                    ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="admin-receipt-signature">
                <span className="digitally-signed">
                  <FiCheckCircle /> Digitally Signed &amp; Verified
                </span>
                <span className="valid-until">Official Gym Receipt</span>
              </div>
            </div>

            <div className="admin-modal-foot">
              <button
                type="button"
                className="admin-modal-secondary-btn"
                onClick={() => setSelectedReceipt(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-modal-primary-btn"
                onClick={() => window.print()}
              >
                <FiPrinter /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PLAN MODAL */}
      {editingPlan && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="admin-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-top">
              <div className="admin-modal-title-wrap">
                <h2>Edit {editingPlan.name}</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setEditingPlan(null)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSavePlan}>
              <div className="admin-modal-body">
                <div className="admin-modal-edit-fields" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="admin-edit-field">
                    <label>Package Name</label>
                    <input
                      type="text"
                      value={editingPlan.name}
                      onChange={(e) =>
                        setEditingPlan({ ...editingPlan, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Duration Label</label>
                    <input
                      type="text"
                      value={editingPlan.duration}
                      onChange={(e) =>
                        setEditingPlan({ ...editingPlan, duration: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          price: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="admin-edit-field">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      value={editingPlan.description}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          description: e.target.value,
                        })
                      }
                      style={{
                        background: "#090c0a",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        padding: "9px 12px",
                        color: "#ffffff",
                        fontSize: "13px",
                        outline: "none",
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  className="admin-modal-secondary-btn"
                  onClick={() => setEditingPlan(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-primary-btn">
                  <FiCheck /> Update Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;
