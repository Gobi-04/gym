import React from "react";

export default function MemberDashboardView({ currentUser, setActiveMenu }) {
  return (
    <section className="other-section">
      <span className="section-label">MEMBER PORTAL</span>
      <h1>DASHBOARD</h1>
      <p>
        Welcome back, <strong>{currentUser?.name || "Member"}</strong>! Your
        fitness journey continues.
      </p>
      <button
        className="back-workouts"
        onClick={() => setActiveMenu("My Workouts")}
      >
        Go to My Workouts
      </button>
    </section>
  );
}
