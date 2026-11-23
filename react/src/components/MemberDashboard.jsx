import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import {
  FiGrid,
  FiActivity,
  FiCoffee,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";

import MyWorkouts from "./MyWorkouts";
import WorkoutDetail from "./WorkoutDetail";
import MyDietPlan from "./MyDietPlan";
import MembershipPayments from "./MembershipPayments";

import "../styles/MemberDashboard.css";

function MemberDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("My Workouts");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Current logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("fitguideCurrentUser");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse current user:", e);
    }
    return {
      name: "Guest Member",
      email: "guest@fitguide.com",
      phone: "+91 98765 43210",
      plan: "Quarterly Membership",
      id: "001",
    };
  });

  // Fetch updated user details from backend if available
  useEffect(() => {
    if (currentUser?.id && typeof currentUser.id === "number") {
      api
        .getUser(currentUser.id)
        .then((fresh) => {
          if (fresh && !fresh.error) {
            setCurrentUser((prev) => ({ ...prev, ...fresh }));
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitguideCurrentUser");
    navigate("/login");
  };

  const userInitials = (currentUser?.name || "M")
    .trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    { name: "Dashboard", icon: <FiGrid /> },
    { name: "My Workouts", icon: <FiActivity /> },
    { name: "My Diet Plan", icon: <FiCoffee /> },
    { name: "Membership & Payments", icon: <FiCreditCard /> },
  ];

  const toggleComplete = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="member-dashboard">
      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${menuOpen ? "show-sidebar" : ""}`}>
        <div className="dashboard-logo">
          <span>Fɪ</span> FITGUIDE
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="sidebar-section">MEMBER PORTAL / Dashboard</div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeMenu === item.name ? "menu-item selected" : "menu-item"
              }
              onClick={() => {
                setActiveMenu(item.name);
                setSelectedWorkout(null);
                setMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="menu-item">
            <FiUser />
            <span>{currentUser.name}</span>
          </button>

          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)}>
            <FiMenu />
          </button>

          <div className="portal-label">
            MEMBER PORTAL / <span>{activeMenu}</span>
          </div>

          <div className="header-actions">
            <button className="public-site" onClick={() => navigate("/")}>
              ↗ Public Site
            </button>

            <button className="icon-button">
              <FiBell />
            </button>

            <div className="profile-avatar">{userInitials}</div>
          </div>
        </header>

        {/* DYNAMIC SCREEN CONTENT */}
        {selectedWorkout ? (
          <WorkoutDetail
            workout={selectedWorkout}
            completed={completed}
            onToggleComplete={toggleComplete}
            onBack={() => setSelectedWorkout(null)}
          />
        ) : activeMenu === "My Workouts" ? (
          <MyWorkouts
            onSelectWorkout={(workout) => setSelectedWorkout(workout)}
          />
        ) : activeMenu === "My Diet Plan" ? (
          <MyDietPlan />
        ) : activeMenu === "Membership & Payments" ? (
          <MembershipPayments currentUser={currentUser} />
        ) : (
          <section className="other-section">
            <span className="section-label">MEMBER PORTAL</span>
            <h1>{activeMenu.toUpperCase()}</h1>
            <p>Welcome to your {activeMenu} section.</p>
            <button
              className="back-workouts"
              onClick={() => setActiveMenu("My Workouts")}
            >
              Go to My Workouts
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default MemberDashboard;
