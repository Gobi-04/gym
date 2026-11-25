import React from "react";

export default function MemberMembership({
  userPlanName,
  feeAmount,
  startDateStr,
  expiryDateStr,
  memberId,
  paymentHistory,
  membershipPackages,
  latestReceipt,
  viewReceipt,
  setViewReceipt,
}) {
  return (
    <section className="membership-content">
      <span className="section-label">MEMBER PORTAL</span>

      <div className="membership-header-row">
        <div>
          <h1>MEMBERSHIP &amp; PAYMENTS</h1>
          <p>
            Manage your active subscription, access official tax invoices,
            and download PDF receipts.
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
              Includes unlimited equipment access and personalized workout
              plans.
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

      {/* PAYMENT HISTORY */}
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

      {/* RENEWAL / UPGRADE PACKAGES */}
      <div className="renewal-section">
        <div className="section-heading-row">
          <h3>Available Renewal &amp; Upgrade Packages</h3>
          <p>
            Flexible plans for continued access with better value and
            extended training support.
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
    </section>
  );
}
