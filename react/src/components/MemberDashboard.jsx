

import React, { useState } from "react";
import {
  FiGrid,
  FiActivity,
  FiCoffee,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiCalendar,
  FiPlay,
  FiBell,
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "../styles/MemberDashboard.css";

const workouts = [
  {
    id: 1,
    title: "Flat Barbell Bench Press",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
    sets: 3,
    reps: "10 - 12 Reps",
    duration: "10 Minutes",
    muscle: "Chest",
    description:
      "The flat barbell bench press helps build chest strength and upper body muscles.",
    steps: [
      "Lie flat on the bench.",
      "Hold the barbell slightly wider than shoulder width.",
      "Lower the bar slowly towards your chest.",
      "Push the bar upward until your arms are extended.",
    ],
  },
  {
    id: 2,
    title: "Incline Dumbbell Press",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900",
    sets: 3,
    reps: "10 - 12 Reps",
    duration: "12 Minutes",
    muscle: "Upper Chest",
    description:
      "Incline dumbbell press focuses on developing the upper chest and shoulder muscles.",
    steps: [
      "Set the bench at an incline angle.",
      "Hold one dumbbell in each hand.",
      "Lower the dumbbells towards your upper chest.",
      "Push both dumbbells upward with control.",
    ],
  },
  {
    id: 3,
    title: "Standing Cable Fly",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
    sets: 3,
    reps: "10 - 12 Reps",
    duration: "10 Minutes",
    muscle: "Chest",
    description:
      "Standing cable fly helps improve chest muscle strength and control.",
    steps: [
      "Stand between the cable machine handles.",
      "Hold both handles with your arms open.",
      "Bring your hands together in front of your chest.",
      "Slowly return to the starting position.",
    ],
  },
];

const days = [
  ["Mon", "Day 01"],
  ["Tue", "Day 02"],
  ["Wed", "Day 03"],
  ["Thu", "Day 04"],
  ["Fri", "Day 05"],
  ["Sat", "Day 06"],
  ["Sun", "Rest"],
];

function MemberDashboard() {
  const [activeMenu, setActiveMenu] = useState("My Workouts");
  const [activeDay, setActiveDay] = useState("Mon");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiGrid /> },
    { name: "My Workouts", icon: <FiActivity /> },
    { name: "My Diet Plan", icon: <FiCoffee /> },
    { name: "Membership & Payments", icon: <FiCreditCard /> },
  ];

  const toggleComplete = (id) => {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const openWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

  const goBack = () => {
    setSelectedWorkout(null);
  };

  return (
    <div className="member-dashboard">

      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${menuOpen ? "show-sidebar" : ""}`}>

        <div className="dashboard-logo">
          <span>Fɪ</span> FITGUIDE

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="sidebar-section">
          MEMBER PORTAL / Dashboard
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeMenu === item.name
                  ? "menu-item selected"
                  : "menu-item"
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
            <span>Profile & Settings</span>
          </button>

          <button className="logout-button">
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>

          <div className="portal-label">
            MEMBER PORTAL / <span>{activeMenu}</span>
          </div>

          <div className="header-actions">
            <button className="public-site">
              ↗ Public Site
            </button>

            <button className="icon-button">
              <FiBell />
            </button>

            <div className="profile-avatar">S</div>
          </div>

        </header>

        {/* WORKOUT DETAIL SCREEN */}
        {selectedWorkout ? (

          <section className="workout-detail">

            <button className="back-button" onClick={goBack}>
              <FiArrowLeft />
              Back to My Workouts
            </button>

            <div className="detail-heading">
              <div>
                <span className="section-label">
                  MONDAY WORKOUT / EXERCISE DETAILS
                </span>

                <h1>{selectedWorkout.title}</h1>

                <p>{selectedWorkout.description}</p>
              </div>

              <span className="muscle-badge">
                {selectedWorkout.muscle}
              </span>
            </div>

            <div className="detail-grid">

              {/* VIDEO / IMAGE */}
              <div className="detail-image-card">

                <div className="detail-image">
                  <img
                    src={selectedWorkout.image}
                    alt={selectedWorkout.title}
                  />

                  <button className="detail-play-button">
                    <FiPlay />
                  </button>

                  <span className="demo-label">
                    EXERCISE DEMO
                  </span>
                </div>

                <div className="detail-stats">

                  <div>
                    <FiActivity />
                    <span>Sets</span>
                    <strong>{selectedWorkout.sets}</strong>
                  </div>

                  <div>
                    <FiCheckCircle />
                    <span>Reps</span>
                    <strong>{selectedWorkout.reps}</strong>
                  </div>

                  <div>
                    <FiClock />
                    <span>Duration</span>
                    <strong>{selectedWorkout.duration}</strong>
                  </div>

                </div>

              </div>

              {/* INSTRUCTIONS */}
              <div className="instruction-card">

                <span className="section-label">
                  WORKOUT GUIDE
                </span>

                <h2>How to Perform</h2>

                <div className="instruction-list">
                  {selectedWorkout.steps.map((step, index) => (
                    <div className="instruction-item" key={index}>
                      <span>{index + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <button
                  className={
                    completed.includes(selectedWorkout.id)
                      ? "complete-button completed"
                      : "complete-button"
                  }
                  onClick={() => toggleComplete(selectedWorkout.id)}
                >
                  <FiCheckCircle />
                  {completed.includes(selectedWorkout.id)
                    ? "Workout Completed"
                    : "Mark as Completed"}
                </button>

              </div>

            </div>

          </section>

        ) : activeMenu === "My Workouts" ? (

          /* MY WORKOUTS MAIN SCREEN */
          <section className="workout-content">

            <span className="section-label">
              ASSIGNED TRAINING SCHEDULE
            </span>

            <h1>MY WEEKLY WORKOUTS</h1>

            <p className="workout-description">
              Assigned strictly by your trainer. Follow sets,
              reps, and video technique cues.
            </p>

            {/* WEEKLY DAYS */}
            <div className="weekly-schedule">

              {days.map(([day, label]) => (
                <button
                  key={day}
                  className={
                    activeDay === day
                      ? "day-card active-day"
                      : "day-card"
                  }
                  onClick={() => setActiveDay(day)}
                >
                  <strong>{day}</strong>
                  <span>{label}</span>
                </button>
              ))}

            </div>

            {/* FOCUS CARD */}
            <div className="focus-card">

              <div className="calendar-icon">
                <FiCalendar />
              </div>

              <div className="focus-details">
                <small>
                  {activeDay.toUpperCase()} FOCUS
                </small>

                <h2>
                  {activeDay === "Mon"
                    ? "Chest & Triceps Hypertrophy"
                    : activeDay === "Sun"
                    ? "Recovery & Rest"
                    : "Assigned Training Schedule"}
                </h2>
              </div>

              <span className="exercise-count">
                {activeDay === "Sun"
                  ? "Rest Day"
                  : "3 Exercises Assigned"}
              </span>

            </div>

            {/* EXERCISE CARDS */}
            {activeDay === "Sun" ? (

              <div className="rest-message">
                <FiCoffee />
                <h2>Take a Rest Day!</h2>
                <p>Give your body time to recover.</p>
              </div>

            ) : (

              <div className="workout-grid">

                {workouts.map((workout) => (

                  <div className="exercise-card" key={workout.id}>

                    <div className="exercise-image">

                      <img
                        src={workout.image}
                        alt={workout.title}
                      />

                      <span className="demo-label">
                        DEMO VIDEO
                      </span>

                      <button
                        className="play-button"
                        onClick={() => openWorkout(workout)}
                      >
                        <FiPlay />
                      </button>

                    </div>

                    <div className="exercise-details">

                      <h3>{workout.title}</h3>

                      <div className="exercise-stats">

                        <div>
                          <small>Sets</small>
                          <strong>{workout.sets}</strong>
                        </div>

                        <div>
                          <small>Reps</small>
                          <strong>{workout.reps}</strong>
                        </div>

                      </div>

                      <button
                        className="view-workout"
                        onClick={() => openWorkout(workout)}
                      >
                        <FiPlay />
                        VIEW TODAY'S WORKOUT
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        ) : (

          <section className="other-section">
            <span className="section-label">MEMBER PORTAL</span>
            <h1>{activeMenu.toUpperCase()}</h1>
            <p>
              Welcome to your {activeMenu} section.
            </p>

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
