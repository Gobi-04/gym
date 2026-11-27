import React, { useState, useEffect, useMemo } from "react";
import {
  FiUsers,
  FiCreditCard,
  FiCheckCircle,
  FiAlertTriangle,
  FiActivity,
  FiCoffee,
  FiClock,
} from "react-icons/fi";
import { api } from "../../services/api";
import "../../styles/AdminOverview.css";

const DEFAULT_PLANS = [
  { name: "Monthly - 1 Month", price: 2499, duration_months: 1 },
  { name: "Quarterly - 3 Months", price: 6499, duration_months: 3 },
  { name: "Annual - 12 Months", price: 19999, duration_months: 12 },
];

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const formatGoal = (goal) => {
  if (!goal) return "General Fitness";
  return goal
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const formatDiet = (diet) => {
  if (!diet) return "Standard";
  return diet
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
};

function AdminOverview({ members: propMembers = [], payments: propPayments = [], onNavigateMenu }) {
  const [liveMembers, setLiveMembers] = useState([]);
  const [livePayments, setLivePayments] = useState([]);
  const [livePlans, setLivePlans] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchOverviewData = async () => {
      const [membersRes, paymentsRes, plansRes] = await Promise.allSettled([
        api.getAdminMembers(),
        api.getAdminPayments(),
        api.getAdminPlans(),
      ]);

      if (cancelled) return;

      if (membersRes.status === "fulfilled" && Array.isArray(membersRes.value) && membersRes.value.length > 0) {
        setLiveMembers(membersRes.value);
      }
      if (paymentsRes.status === "fulfilled" && Array.isArray(paymentsRes.value) && paymentsRes.value.length > 0) {
        setLivePayments(paymentsRes.value);
      }
      if (plansRes.status === "fulfilled" && Array.isArray(plansRes.value) && plansRes.value.length > 0) {
        setLivePlans(plansRes.value);
      }
    };

    fetchOverviewData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Use live DB data if available, otherwise fall back to props passed from AdminPortal
  const membersList = useMemo(() => {
    const source = liveMembers.length > 0 ? liveMembers : propMembers;
    return source.map((m, idx) => {
      const rawStatus = (m.membership_status || m.membershipStatus || m.status || "active").toLowerCase();
      const isExpired = rawStatus === "expired" || rawStatus === "cancelled";
      const expiryRaw = m.end_date || m.expiryDate || m.expiry_date || null;
      const createdRaw = m.created_at || m.joinDate || m.date || null;
      const numericId = typeof m.id === "number" ? m.id : idx + 1;

      return {
        id: m.id ?? idx + 1,
        memberCode: m.memberId || (String(m.id).startsWith("FG-") ? m.id : `FG-${1040 + numericId}`),
        name: m.name || "Member",
        plan: m.plan_name || m.membershipPlan || m.plan || "Monthly - 1 Month",
        status: isExpired ? "Expired" : "Active",
        isExpired,
        goal: formatGoal(m.goal || m.fitnessGoal),
        diet: formatDiet(m.diet || m.dietaryPreference),
        expiryDate: formatDate(expiryRaw),
        expiryObj: expiryRaw ? new Date(expiryRaw) : null,
        createdAt: formatDate(createdRaw),
        createdSort: createdRaw ? new Date(createdRaw).getTime() : numericId,
      };
    });
  }, [liveMembers, propMembers]);

  const paymentsList = useMemo(() => {
    const source = livePayments.length > 0 ? livePayments : propPayments;
    return source.map((p, idx) => {
      const rawStatus = (p.status || "pending").toLowerCase();
      const isVerified = rawStatus === "success" || rawStatus === "paid" || rawStatus === "paid & verified" || rawStatus === "verified";
      const amountNum = Number(p.total_amount || p.amount || 0);
      const dateRaw = p.paid_at || p.date || p.created_at || null;

      return {
        id: p.id || idx + 1,
        txId: p.transaction_id || p.txnId || (String(p.id).startsWith("TXN-") ? p.id : `TXN-FG-${1000 + idx}`),
        name: p.customer_name || p.member || p.name || "Member",
        plan: p.plan_name || p.package || p.plan || "Monthly - 1 Month",
        method: p.payment_method || p.method || "UPI",
        amount: amountNum,
        statusLabel: isVerified ? "Paid & Verified" : rawStatus === "failed" ? "Failed" : "Pending",
        isVerified,
        dateSort: dateRaw ? new Date(dateRaw).getTime() : idx,
      };
    });
  }, [livePayments, propPayments]);

  const plansList = useMemo(() => {
    return livePlans.length > 0 ? livePlans : DEFAULT_PLANS;
  }, [livePlans]);

  // Dynamic Summary Metrics
  const stats = useMemo(() => {
    const totalMembers = membersList.length;
    const activeCount = membersList.filter((m) => !m.isExpired).length;
    const expiredCount = membersList.filter((m) => m.isExpired).length;
    const activePercent = totalMembers > 0 ? Math.round((activeCount / totalMembers) * 100) : 0;
    const expiredPercent = totalMembers > 0 ? 100 - activePercent : 0;

    const verifiedPayments = paymentsList.filter((p) => p.isVerified);
    const totalRevenue = verifiedPayments.reduce((sum, p) => sum + p.amount, 0);

    return {
      totalMembers,
      activeCount,
      expiredCount,
      activePercent,
      expiredPercent,
      totalRevenue,
      verifiedCount: verifiedPayments.length,
    };
  }, [membersList, paymentsList]);

  // Dynamic Tier Distribution
  const tierDistribution = useMemo(() => {
    const total = membersList.length || 1;
    return plansList.map((plan) => {
      const planKey = plan.name.toLowerCase().split(/[-– ]/)[0];
      const count = membersList.filter((m) => {
        const mPlan = (m.plan || "").toLowerCase();
        return mPlan === plan.name.toLowerCase() || (planKey && mPlan.includes(planKey));
      }).length;

      const durationText = plan.duration_months
        ? `${plan.duration_months} ${Number(plan.duration_months) === 1 ? "Month" : "Months"}`
        : plan.duration || "";

      return {
        name: plan.name,
        price: `₹${Number(plan.price || 0).toLocaleString("en-IN")}${durationText ? ` - ${durationText}` : ""}`,
        members: count,
        percent: membersList.length > 0 ? Math.round((count / total) * 100) : 0,
      };
    });
  }, [membersList, plansList]);

  // Dynamic Renewals (Expired OR expiring within next 14 days)
  const renewalsList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return membersList
      .filter((m) => {
        if (m.isExpired) return true;
        if (!m.expiryObj || Number.isNaN(m.expiryObj.getTime())) return false;
        const diffDays = Math.ceil((m.expiryObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 14;
      })
      .map((m) => {
        let statusText = "Expired";
        let isDue = false;
        if (!m.isExpired && m.expiryObj && !Number.isNaN(m.expiryObj.getTime())) {
          const diffDays = Math.ceil((m.expiryObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays >= 0) {
            statusText = diffDays === 0 ? "Due today" : `Due in ${diffDays}d`;
            isDue = true;
          }
        }
        return {
          ...m,
          renewalStatus: statusText,
          isDue,
        };
      })
      .sort((a, b) => {
        if (a.isDue !== b.isDue) return a.isDue ? 1 : -1;
        return (a.expiryObj?.getTime() || 0) - (b.expiryObj?.getTime() || 0);
      })
      .slice(0, 6);
  }, [membersList]);

  // Dynamic Recent Member Registrations (latest 4)
  const recentRegistrations = useMemo(() => {
    return [...membersList]
      .sort((a, b) => b.createdSort - a.createdSort)
      .slice(0, 4)
      .map((m) => ({
        id: m.id,
        name: m.name,
        details: `${m.goal} · ${m.diet} · ${m.plan}`,
        date: m.createdAt,
        status: m.status,
      }));
  }, [membersList]);

  // Dynamic Recent Payment Transactions (latest 4)
  const recentTransactions = useMemo(() => {
    return [...paymentsList]
      .sort((a, b) => b.dateSort - a.dateSort)
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        name: p.name,
        details: `${p.txId} · ${p.method} · ${p.plan}`,
        amount: `₹${p.amount.toLocaleString("en-IN")}`,
        status: p.statusLabel,
        isVerified: p.isVerified,
      }));
  }, [paymentsList]);

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

      {/* 4 STATS CARDS DECK */}
      <div className="admin-stats-deck">
        {/* 1. Total Members */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Total Members</span>
            <FiUsers />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num">{stats.totalMembers}</span>
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
            <span className="admin-deck-num">{stats.activeCount}</span>
            <span className="admin-deck-tag">{stats.activePercent}% active</span>
          </div>
        </div>

        {/* 3. Expired Memberships */}
        <div className="admin-deck-card">
          <div className="admin-deck-top">
            <span>Expired Memberships</span>
            <FiAlertTriangle className="icon-amber" />
          </div>
          <div className="admin-deck-main">
            <span className="admin-deck-num">{stats.expiredCount}</span>
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
            <span className="admin-deck-num color-lime">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </span>
            <span className="admin-deck-tag color-gray">
              {stats.verifiedCount} verified
            </span>
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
            <span className="active-label">Active ({stats.activeCount})</span>
            <span className="expired-label">Expired ({stats.expiredCount})</span>
          </div>
          <div className="admin-dual-progress">
            <div className="bar-active" style={{ width: `${stats.activePercent}%` }} />
            <div className="bar-expired" style={{ width: `${stats.expiredPercent}%` }} />
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
                    {tier.members} {tier.members === 1 ? "member" : "members"}
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

          {renewalsList.length === 0 ? (
            <p className="admin-panel-sub" style={{ marginTop: "24px", textAlign: "center" }}>
              No expired or expiring memberships right now.
            </p>
          ) : (
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
                {renewalsList.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="admin-renewal-name">{r.name}</div>
                      <div className="admin-renewal-id">{r.memberCode}</div>
                    </td>
                    <td>{r.plan}</td>
                    <td>{r.expiryDate}</td>
                    <td>
                      {r.isDue ? (
                        <span className="admin-status-pill-due">
                          <FiClock /> {r.renewalStatus}
                        </span>
                      ) : (
                        <span className="admin-status-pill-expired">
                          <FiAlertTriangle /> {r.renewalStatus}
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
          )}
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
            {recentRegistrations.length === 0 ? (
              <p className="admin-panel-sub" style={{ marginTop: "16px" }}>
                No member registrations found.
              </p>
            ) : (
              recentRegistrations.map((item) => (
                <div className="admin-recent-item" key={item.id}>
                  <div className="admin-recent-info">
                    <h4>{item.name}</h4>
                    <p>{item.details}</p>
                  </div>
                  <div className="admin-recent-meta">
                    <div className="admin-recent-date">{item.date}</div>
                    <span className={`admin-recent-badge ${item.status === "Expired" ? "pending" : "active"}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
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
            {recentTransactions.length === 0 ? (
              <p className="admin-panel-sub" style={{ marginTop: "16px" }}>
                No payment transactions found.
              </p>
            ) : (
              recentTransactions.map((tx) => (
                <div className="admin-recent-item" key={tx.id}>
                  <div className="admin-recent-info">
                    <h4>{tx.name}</h4>
                    <p>{tx.details}</p>
                  </div>
                  <div className="admin-recent-meta">
                    <div className="admin-recent-amount">{tx.amount}</div>
                    <span
                      className={`admin-recent-badge ${
                        tx.isVerified ? "verified" : "pending"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOverview;
