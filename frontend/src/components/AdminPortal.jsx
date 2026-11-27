import React, { useState, useEffect } from "react";
import AdminSignIn from "./admin/AdminSignIn";
import AdminSidebar from "./admin/AdminSidebar";
import AdminOverview from "./admin/AdminOverview";
import AdminMembers from "./admin/AdminMembers";
import AdminPayments from "./admin/AdminPayments";
import AdminWorkouts from "./admin/AdminWorkouts";
import AdminDiet from "./admin/AdminDiet";
import AdminSettings from "./admin/AdminSettings";
import { api } from "../services/api";
import "../styles/AdminPortal.css";

function AdminPortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("fitguideAdminToken") ? true : false;
  });

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem("fitguideAdminProfile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use fallback
      }
    }
    return {
      name: "Marcus Vance",
      email: "admin@fitguide.club",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    };
  });

  const handleUpdateProfile = (newProfile) => {
    setAdminProfile(newProfile);
    localStorage.setItem("fitguideAdminProfile", JSON.stringify(newProfile));
  };

  // Active Menu: "Dashboard" | "Member Management" | "Membership & Payments" | "Workout Management" | "Diet Plan Management" | "Profile & Settings"
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Dynamic Members & Payments List
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const res = await api.getAdminMembers();
      if (res && Array.isArray(res) && res.length > 0) {
        setMembers(res);
      } else {
        fallbackMembers();
      }
    } catch {
      fallbackMembers();
    }

    try {
      const payRes = await api.getAdminPayments();
      if (payRes && Array.isArray(payRes) && payRes.length > 0) {
        setPayments(payRes);
      } else {
        fallbackPayments();
      }
    } catch {
      fallbackPayments();
    }
  };

  const fallbackMembers = () => {
    const localUsers = JSON.parse(localStorage.getItem("fitguideUsers") || "[]");
    if (localUsers.length > 0) {
      setMembers(
        localUsers.map((u, i) => ({
          id: i + 1,
          name: u.name,
          email: u.email,
          phone: u.phone,
          plan_name: u.plan || "Monthly - 1 Month",
          membership_status: "active",
          created_at: new Date().toISOString(),
        }))
      );
    } else {
      setMembers([
        { id: 1041, name: "Suresh Kumar", email: "suresh@fitguide.com", phone: "+91 98765 11111", plan_name: "Monthly - 1 Month", membership_status: "active", created_at: "2026-10-12" },
        { id: 1042, name: "Madhu Shalini", email: "madhu@fitguide.com", phone: "+91 98765 22222", plan_name: "Quarterly - 3 Months", membership_status: "active", created_at: "2026-09-18" },
        { id: 1043, name: "Rohan Malhotra", email: "rohan@fitguide.com", phone: "+91 98765 33333", plan_name: "Monthly - 1 Month", membership_status: "expired", created_at: "2026-10-12" },
        { id: 1047, name: "Kabir Deshmukh", email: "kabir@fitguide.com", phone: "+91 98765 44444", plan_name: "Monthly - 1 Month", membership_status: "expired", created_at: "2026-10-05" },
        { id: 1050, name: "Ishita Banerjee", email: "ishita@fitguide.com", phone: "+91 98765 55555", plan_name: "Quarterly - 3 Months", membership_status: "expired", created_at: "2026-08-14" },
      ]);
    }
  };

  const fallbackPayments = () => {
    setPayments([
      { id: "TXN-8841", customer_name: "Karan Verma", plan_name: "Quarterly Membership", amount: 4499, method: "UPI / PhonePe", status: "Paid", date: "01 Nov 2026" },
      { id: "TXN-8842", customer_name: "Madhu Shalini", plan_name: "Quarterly Membership", amount: 4499, method: "Credit Card", status: "Paid", date: "15 Oct 2026" },
      { id: "TXN-8843", customer_name: "Suresh Kumar", plan_name: "Annual Elite", amount: 14000, method: "Google Pay", status: "Paid", date: "20 Oct 2026" },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem("fitguideAdminToken");
    setIsAuthenticated(false);
    setActiveMenu("Dashboard");
  };

  // If not authenticated, render Sign In View
  if (!isAuthenticated) {
    return <AdminSignIn onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="admin-dashboard-container">
      {/* 1. LEFT SIDEBAR */}
      <AdminSidebar
        activeMenu={activeMenu}
        onSelectMenu={(menu) => setActiveMenu(menu)}
        onLogout={handleLogout}
      />

      {/* 2. MAIN VIEWPORT */}
      <main className="admin-main-viewport">
        {/* TOP APP BAR */}
        <header className="admin-app-bar">
          <div className="admin-breadcrumb">Admin Portal / {activeMenu}</div>

          <div className="admin-top-profile">
            <div className="admin-profile-info">
              <div className="admin-profile-name">{adminProfile.name}</div>
              <div className="admin-profile-email">{adminProfile.email}</div>
            </div>
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="admin-profile-thumb"
            />
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <div className="admin-canvas">
          {activeMenu === "Dashboard" && (
            <AdminOverview
              members={members}
              payments={payments}
              onNavigateMenu={(menu) => setActiveMenu(menu)}
            />
          )}

          {activeMenu === "Member Management" && (
            <AdminMembers members={members} />
          )}

          {activeMenu === "Membership & Payments" && (
            <AdminPayments payments={payments} />
          )}

          {activeMenu === "Workout Management" && <AdminWorkouts />}

          {activeMenu === "Diet Plan Management" && <AdminDiet />}

          {activeMenu === "Profile & Settings" && (
            <AdminSettings
              profile={adminProfile}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminPortal;
