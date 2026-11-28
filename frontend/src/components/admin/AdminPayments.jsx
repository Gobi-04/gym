import React, { useState, useMemo, useEffect } from "react";
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
import { api } from "../../services/api";
import "../../styles/AdminPayments.css";

const defaultPlans = [
  {
    id: "monthly",
    name: "Monthly - 1 Month",
    duration: "1 Month",
    price: 2499,
    description:
      "Full gym access, goal-based weekly workouts, and personalized diet schedule for 30 days.",
  },
  {
    id: "quarterly",
    name: "Quarterly - 3 Months",
    duration: "3 Months",
    price: 6499,
    description:
      "90-day structured transformation cycle with workout & meal plan synchronization.",
  },
  {
    id: "annual",
    name: "Annual - 12 Months",
    duration: "12 Months",
    price: 19999,
    description:
      "Complete 12-month performance membership with full workout and nutrition portal access.",
  },
];

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const normalizeTransaction = (p, idx = 0) => {
  const rawStatus = (p.status || "pending").toLowerCase();
  const isVerified =
    rawStatus === "success" ||
    rawStatus === "paid" ||
    rawStatus === "paid & verified" ||
    rawStatus === "verified";
  const numericUserId = typeof p.user_id === "number" ? p.user_id : idx + 1;

  return {
    dbId: typeof p.id === "number" ? p.id : null,
    id: p.transaction_id || p.txnId || (String(p.id || "").startsWith("TXN-") ? p.id : `TXN-FG-${1000 + idx}`),
    receiptNo: p.receipt_number || p.receiptNo || `RCPT-${new Date().getFullYear()}-${String(p.id || idx + 1).padStart(4, "0")}`,
    member: p.customer_name || p.member || p.name || "Member",
    memberId: p.memberId || `FG-${1040 + numericUserId}`,
    package: p.plan_name || p.package || p.plan || "Monthly - 1 Month",
    method: p.payment_method || p.method || "UPI",
    amount: Number(p.total_amount || p.amount || 0),
    date: formatDate(p.paid_at || p.date || p.created_at),
    status: isVerified ? "Paid & Verified" : "Pending",
  };
};

const normalizePlan = (plan, idx = 0) => ({
  dbId: typeof plan.id === "number" ? plan.id : null,
  id: plan.id || `plan-${idx}`,
  name: plan.name,
  duration: plan.duration_months
    ? `${plan.duration_months} ${Number(plan.duration_months) === 1 ? "Month" : "Months"}`
    : plan.duration || "1 Month",
  price: Number(plan.price || 0),
  description: plan.description || plan.features || "",
});

function AdminPayments({ members: propMembers = [], payments: propPayments = [] }) {
  // Plan Configurations State
  const [plans, setPlans] = useState(defaultPlans);

  // Transactions State
  const [transactions, setTransactions] = useState(() =>
    Array.isArray(propPayments) ? propPayments.map(normalizeTransaction) : []
  );

  // Members State (for Active/Expired, Renewals, and Plan Enrolled counts)
  const [membersList, setMembersList] = useState(() =>
    Array.isArray(propMembers) ? propMembers : []
  );

  // Fetch live data from backend API on mount
  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      const [plansRes, paymentsRes, membersRes] = await Promise.allSettled([
        api.getAdminPlans(),
        api.getAdminPayments(),
        api.getAdminMembers(),
      ]);

      if (cancelled) return;

      if (plansRes.status === "fulfilled" && Array.isArray(plansRes.value) && plansRes.value.length > 0) {
        setPlans(plansRes.value.map(normalizePlan));
      }
      if (paymentsRes.status === "fulfilled" && Array.isArray(paymentsRes.value)) {
        setTransactions(paymentsRes.value.map(normalizeTransaction));
      }
      if (membersRes.status === "fulfilled" && Array.isArray(membersRes.value)) {
        setMembersList(membersRes.value);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // Dynamically compute enrolled count per plan
  const plansWithCounts = useMemo(() => {
    return plans.map((p) => {
      const key = p.name.toLowerCase().split(/[-– ]/)[0];
      const enrolled = membersList.filter((m) => {
        const mPlan = (m.plan_name || m.membershipPlan || m.plan || "").toLowerCase();
        return mPlan === p.name.toLowerCase() || (key && mPlan.includes(key));
      }).length;
      return { ...p, enrolled };
    });
  }, [plans, membersList]);

  // Dynamically derive Active & Expired list from real members
  const activeExpiredList = useMemo(() => {
    return membersList.map((m, idx) => {
      const rawStatus = (m.membership_status || m.membershipStatus || m.status || "active").toLowerCase();
      const isExpired = rawStatus === "expired" || rawStatus === "cancelled";
      const planName = m.plan_name || m.membershipPlan || m.plan || "Monthly - 1 Month";
      const matchedPlan = plans.find((p) => {
        const key = p.name.toLowerCase().split(/[-– ]/)[0];
        return planName.toLowerCase() === p.name.toLowerCase() || (key && planName.toLowerCase().includes(key));
      });
      const planPrice = matchedPlan ? matchedPlan.price : 2499;
      const numericId = typeof m.id === "number" ? m.id : idx + 1;

      return {
        id: m.memberId || (String(m.id || "").startsWith("FG-") ? m.id : `FG-${1040 + numericId}`),
        name: m.name || "Member",
        plan: planName,
        status: isExpired ? "Expired" : "Active",
        expiry: formatDate(m.end_date || m.expiryDate),
        amount: `₹${Number(planPrice).toLocaleString("en-IN")}`,
      };
    });
  }, [membersList, plans]);

  // Dynamically derive Upcoming Renewals (Expired or expiring within 30 days)
  const upcomingRenewalsList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return activeExpiredList
      .filter((m) => {
        if (m.status === "Expired") return true;
        if (!m.expiry || m.expiry === "—") return false;
        const expDate = new Date(m.expiry);
        if (Number.isNaN(expDate.getTime())) return false;
        const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      })
      .map((m) => {
        let dueIn = "Expired";
        if (m.status !== "Expired" && m.expiry !== "—") {
          const expDate = new Date(m.expiry);
          const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          dueIn = diffDays <= 0 ? "Expired" : `Due in ${diffDays}d`;
        }
        return {
          id: m.id,
          name: m.name,
          plan: m.plan,
          dueIn,
          expiry: m.expiry,
          renewalCost: m.amount,
        };
      });
  }, [activeExpiredList]);

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

  const handleStatusChange = async (txnId, newStatus) => {
    let targetDbId = null;
    const updated = transactions.map((t) => {
      if (t.id === txnId) {
        targetDbId = t.dbId;
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTransactions(updated);
    if (targetDbId) {
      try {
        await api.updatePaymentStatus(
          targetDbId,
          newStatus === "Paid & Verified" ? "success" : "pending"
        );
      } catch {
        // already updated in UI
      }
    }
    showToast(`Transaction ${txnId} status updated to ${newStatus}`);
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    const updated = plans.map((p) =>
      p.id === editingPlan.id ? editingPlan : p
    );
    setPlans(updated);
    if (editingPlan.dbId) {
      try {
        await api.updateAdminPlan(editingPlan.dbId, {
          name: editingPlan.name,
          price: Number(editingPlan.price),
          description: editingPlan.description,
        });
      } catch {
        // already updated in UI
      }
    }
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
          {plansWithCounts.map((p) => (
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
                {activeExpiredList.length > 0 ? (
                  activeExpiredList.map((m) => {
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
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-no-results-cell">
                      No active or expired memberships found.
                    </td>
                  </tr>
                )}
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
                {upcomingRenewalsList.length > 0 ? (
                  upcomingRenewalsList.map((r) => {
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
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-no-results-cell">
                      No upcoming renewals found.
                    </td>
                  </tr>
                )}
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
