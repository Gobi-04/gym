import React, { useState } from "react";
import "../styles/MemberDashboard.css";

const membershipPackages = [
  { name: "1 Month", price: "₹1,500", badge: "1 Month" },
  { name: "3 Months", price: "₹4,000", badge: "3 Months" },
  { name: "6 Months", price: "₹7,500", badge: "6 Months" },
  { name: "12 Months", price: "₹14,000", badge: "12 Months" },
];

function MembershipPayments({ currentUser }) {
  const [viewReceipt, setViewReceipt] = useState(null);

  // Dynamic values based on logged-in user
  const memberId =
    currentUser?.memberId ||
    `FITGUIDE-${String(currentUser?.id || 1).padStart(3, "0")}`;

  const userPlanName =
    currentUser?.plan ||
    currentUser?.membership?.plan_name ||
    "Quarterly Membership";

  const isAnnual =
    userPlanName.toLowerCase().includes("annual") ||
    userPlanName.toLowerCase().includes("12");
  const isQuarterly =
    userPlanName.toLowerCase().includes("quarterly") ||
    userPlanName.toLowerCase().includes("3");

  const durationStr = isAnnual ? "12 Months" : isQuarterly ? "3 Months" : "1 Month";
  const feeAmount =
    currentUser?.amount ||
    (isAnnual ? 11999 : isQuarterly ? 4499 : 1499);
  const gstAmount = Math.round(feeAmount * 0.18);
  const totalAmount = feeAmount + gstAmount;

  const now = new Date();
  const startDateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const expiryDateObj = new Date();
  if (isAnnual) {
    expiryDateObj.setFullYear(expiryDateObj.getFullYear() + 1);
  } else if (isQuarterly) {
    expiryDateObj.setMonth(expiryDateObj.getMonth() + 3);
  } else {
    expiryDateObj.setMonth(expiryDateObj.getMonth() + 1);
  }
  const expiryDateStr = expiryDateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const paymentMethodStr =
    currentUser?.paymentMethod || "UPI / Google Pay (PhonePe)";

  const paymentHistory = [
    {
      receipt: `FG-ROC-${now.getFullYear()}-${String(currentUser?.id || 8841).padStart(4, "0")}`,
      packageName: userPlanName,
      date: `${startDateStr}, 10:45 AM`,
      method: paymentMethodStr,
      amount: feeAmount,
      gst: gstAmount,
      total: totalAmount,
      status: "Paid",
      customer: {
        name: currentUser?.name || "Member",
        phone: currentUser?.phone || "+91 98765 43210",
        email: currentUser?.email || "member@example.com",
        memberId: memberId,
      },
      startDate: startDateStr,
      expiryDate: expiryDateStr,
      duration: durationStr,
      transactionId: `TXN-${now.getFullYear()}-${String(currentUser?.id || 8841).padStart(4, "0")}`,
      paymentType: paymentMethodStr,
    },
  ];

  const latestReceipt = paymentHistory[0];

  return (
    <section className="membership-content">
      <span className="section-label">MEMBER PORTAL</span>

      <div className="membership-header-row">
        <div>
          <h1>MEMBERSHIP &amp; PAYMENTS</h1>
          <p>
            Manage your active subscription, access official tax invoices, and
            download PDF receipts.
          </p>
        </div>

        <button
          className="download-btn"
          onClick={() => setViewReceipt(latestReceipt)}
        >
          Download Latest Receipt(PDF)
        </button>
      </div>

      {/* ACTIVE MEMBERSHIP CARD */}
      <div className="membership-card">
        <div className="membership-card-header">
          <div className="payment-badge-wrap">
            <span className="green-dot" />
            <span className="member-status">MEMBERSHIP ACTIVE</span>
          </div>

          <div className="summary-tag">Paid &amp; Verified</div>
        </div>

        <div className="membership-main-row">
          <div className="membership-title">
            <h2>{userPlanName.toUpperCase()}</h2>
            <p>
              Includes unlimited equipment access and personalized workout plans.
            </p>
          </div>

          <div className="membership-summary-box">
            <div className="summary-row">
              <span>Membership Fee</span>
              <strong>₹{feeAmount.toLocaleString("en-IN")}</strong>
            </div>
            <div className="summary-row">
              <span>Payment Status</span>
              <strong>Paid &amp; Verified</strong>
            </div>
            <div className="summary-row">
              <span>Expiry Date</span>
              <strong>{expiryDateStr}</strong>
            </div>
          </div>
        </div>

        <div className="membership-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Start Date</span>
            <strong>{startDateStr}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Renewal Due</span>
            <strong>{expiryDateStr}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Member ID</span>
            <strong>{memberId}</strong>
          </div>
        </div>
      </div>

      {/* PAYMENT & RECEIPT HISTORY TABLE */}
      <div className="payment-history-section">
        <div className="section-heading-row">
          <h3>Payment &amp; Receipt History</h3>
          <p>
            Official downloadable GST receipts for tax compliance and record
            keeping.
          </p>
        </div>

        <div className="receipt-table-wrap">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Receipt Number</th>
                <th>Package</th>
                <th>Date &amp; Time</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item) => (
                <tr key={item.receipt}>
                  <td>{item.receipt}</td>
                  <td>{item.packageName}</td>
                  <td>{item.date}</td>
                  <td>{item.method}</td>
                  <td>₹{item.amount.toLocaleString("en-IN")}</td>
                  <td>
                    <button
                      className="view-receipt"
                      onClick={() => setViewReceipt(item)}
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RENEWAL PACKAGES */}
      <div className="renewal-section">
        <div className="section-heading-row">
          <h3>Available Renewal &amp; Upgrade Packages</h3>
          <p>
            Flexible plans for continued access with better value and extended
            training support.
          </p>
        </div>

        <div className="package-grid">
          {membershipPackages.map((plan) => (
            <div key={plan.badge} className="package-card">
              <div className="package-badge">{plan.badge}</div>
              <h4>{plan.name}</h4>
              <div className="package-price">{plan.price}</div>
              <button className="package-button">Select Plan</button>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW RECEIPT MODAL */}
      {viewReceipt && (
        <div
          className="receipt-modal-backdrop"
          onClick={() => setViewReceipt(null)}
        >
          <div
            className="receipt-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="receipt-modal-header">
              <div className="receipt-company">
                <span className="receipt-brand">FITGUIDE</span>
                <small>Fitness Performance Gym &amp; Fitness Center</small>
              </div>

              <div className="receipt-action-row">
                <span className="receipt-badge">VERIFIED GYM TAX INVOICE</span>
                <button
                  className="receipt-print-button"
                  onClick={() => window.print()}
                >
                  Download PDF
                </button>
              </div>
            </div>

            <div className="receipt-card-box">
              <div className="receipt-card-top">
                <div className="receipt-user-block">
                  <span className="receipt-user-label">Member Name</span>
                  <strong>{viewReceipt.customer.name}</strong>
                </div>

                <div className="receipt-user-meta">
                  <span>{viewReceipt.customer.memberId}</span>
                  <span>{viewReceipt.status}</span>
                </div>
              </div>

              <div className="receipt-profile-row">
                <div className="receipt-profile-name">
                  <span className="receipt-avatar">
                    {viewReceipt.customer.name.trim()[0]}
                  </span>
                  <div>
                    <strong>{viewReceipt.customer.name}</strong>
                    <small>{viewReceipt.packageName}</small>
                  </div>
                </div>
                <div className="receipt-amount-tag">
                  ₹{viewReceipt.total.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="receipt-detail-grid">
                <div className="receipt-detail-item">
                  <span>Receipt Number</span>
                  <strong>{viewReceipt.receipt}</strong>
                </div>
                <div className="receipt-detail-item">
                  <span>Transaction ID</span>
                  <strong>{viewReceipt.transactionId}</strong>
                </div>
                <div className="receipt-detail-item">
                  <span>Invoice Date</span>
                  <strong>{viewReceipt.date}</strong>
                </div>
                <div className="receipt-detail-item">
                  <span>Payment Method</span>
                  <strong>{viewReceipt.method}</strong>
                </div>
              </div>

              <div className="receipt-contact-box">
                <div>
                  <span className="receipt-user-label">Mobile</span>
                  <strong>{viewReceipt.customer.phone}</strong>
                </div>
                <div>
                  <span className="receipt-user-label">Email</span>
                  <strong>{viewReceipt.customer.email}</strong>
                </div>
              </div>

              <div className="receipt-table-box">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{viewReceipt.packageName}</td>
                      <td>{viewReceipt.duration}</td>
                      <td>₹{viewReceipt.amount.toLocaleString("en-IN")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="receipt-total-box">
                <div className="receipt-total-row">
                  <span>Membership Fee</span>
                  <strong>₹{viewReceipt.amount.toLocaleString("en-IN")}</strong>
                </div>
                <div className="receipt-total-row">
                  <span>GST (CGST + SGST)</span>
                  <strong>₹{viewReceipt.gst.toLocaleString("en-IN")}</strong>
                </div>
                <div className="receipt-total-row receipt-grand-total">
                  <span>Total Paid</span>
                  <strong>₹{viewReceipt.total.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="receipt-footer">
                <span className="receipt-status-pill">
                  ● Digitally Signed &amp; Verified
                </span>
                <span className="receipt-validity">
                  Valid from {viewReceipt.startDate} to {viewReceipt.expiryDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MembershipPayments;
