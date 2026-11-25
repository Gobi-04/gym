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

/* ---------- VIDEO HELPERS ---------- */
// Converts YouTube links (watch / youtu.be / embed) into an embed link.
// Pass { muted: true } to get a silent, looping, controls-free preview URL.
const getEmbedUrl = (url, { muted = false } = {}) => {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  if (!yt) return null;
  const id = yt[1];
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${
    muted ? `&mute=1&controls=0&loop=1&playlist=${id}` : ""
  }`;
};

// Full player: YouTube link in an iframe, anything else (mp4/webm) in a <video> tag.
function VideoPlayer({ url, title }) {
  const embed = getEmbedUrl(url);
  return embed ? (
    <iframe
      src={embed}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video src={url} controls autoPlay />
  );
}

// Muted looping preview that plays while the mouse is over the card.
// Browsers only allow autoplay when the video is muted.
function HoverPreview({ url, title }) {
  const embed = getEmbedUrl(url, { muted: true });
  return embed ? (
    <iframe
      className="hover-preview"
      src={embed}
      title={title}
      allow="autoplay; encrypted-media"
    />
  ) : (
    <video
      className="hover-preview"
      src={url}
      muted
      loop
      autoPlay
      playsInline
    />
  );
}

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const dietPlanData = {
  "non-vegetarian": {
    label: "Non-Vegetarian",
    focus: "Chest & Triceps Hypertrophy",
    description: "High-protein meals designed to build muscle and recover faster.",
    meals: [
      {
        id: 1,
        time: "08:00 AM - 8:30 AM",
        mealType: "Breakfast",
        title: "Chicken & Egg Power Breakfast",
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "3 Whole Eggs + 4 Egg Whites + 2 Whole Wheat Toast",
        calories: "480 kcal",
      },
      {
        id: 2,
        time: "12:30 PM - 1:00 PM",
        mealType: "Lunch",
        title: "Chicken Rice Bowl",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "150g Grilled Chicken + 1 Cup Steamed Rice + Dal",
        calories: "620 kcal",
      },
      {
        id: 3,
        time: "05:00 PM - 5:30 PM",
        mealType: "Dinner",
        title: "Salmon & Quinoa Plate",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "150g Salmon + Quinoa + Roasted Veggies",
        calories: "590 kcal",
      },
    ],
  },
  vegetarian: {
    label: "Vegetarian",
    focus: "Plant Protein & Recovery",
    description: "Balanced vegetarian meals with protein-rich ingredients for strength and energy.",
    meals: [
      {
        id: 1,
        time: "08:00 AM - 8:30 AM",
        mealType: "Breakfast",
        title: "Paneer Oats Bowl",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "Oats + Paneer + Chia Seeds + Banana",
        calories: "450 kcal",
      },
      {
        id: 2,
        time: "12:30 PM - 1:00 PM",
        mealType: "Lunch",
        title: "Soya Chunks Rice Bowl",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "1 Cup Soya Chunks + Brown Rice + Lentils",
        calories: "560 kcal",
      },
      {
        id: 3,
        time: "05:00 PM - 5:30 PM",
        mealType: "Dinner",
        title: "Tofu & Veggie Stir-Fry",
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
        portion: "Portion Recommendation",
        nutrients: "Tofu + Mixed Veggies + Quinoa + Olive Oil",
        calories: "540 kcal",
      },
    ],
  },
};

const workouts = [
  {
    id: 1,
    title: "Flat Barbell Bench Press",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
    videoUrl: "/videos/bench-press.mp4", // 👈 replace with your original link
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
    videoUrl: "/videos/incline-press.mp4", // 👈 replace with your original link
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
    videoUrl: "/videos/cable-fly.mp4", // 👈 replace with your original link
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
  {
    id: 4,
    title: "Seated Dumbbell Shoulder Press",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
    videoUrl: "/videos/shoulder-press.mp4", // 👈 replace with your original link
    sets: 3,
    reps: "10 - 12 Reps",
    duration: "10 Minutes",
    muscle: "Shoulders",
    description:
      "Seated dumbbell press builds overhead pushing strength and sculpted shoulders.",
    steps: [
      "Sit upright with back support and dumbbells at shoulder height.",
      "Press the weights upward until arms are almost fully extended.",
      "Pause briefly at the top without banging the weights together.",
      "Lower under control back to ear level.",
    ],
  },
  {
    id: 5,
    title: "Triceps Rope Pushdown",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
    videoUrl: "/videos/triceps-pushdown.mp4", // 👈 replace with your original link
    sets: 3,
    reps: "12 - 15 Reps",
    duration: "8 Minutes",
    muscle: "Triceps",
    description:
      "Rope pushdowns isolate the lateral and long heads of the triceps.",
    steps: [
      "Attach a rope to a high cable pulley.",
      "Keep elbows tucked tightly to your sides.",
      "Push downward and spread the rope apart at the bottom contraction.",
      "Return slowly to 90-degree elbow flexion.",
    ],
  },
  {
    id: 6,
    title: "Parallel Bar Dips",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900",
    videoUrl: "/videos/dips.mp4", // 👈 replace with your original link
    sets: 3,
    reps: "10 - 12 Reps",
    duration: "10 Minutes",
    muscle: "Chest & Triceps",
    description:
      "Dips are an essential compound movement for chest and tricep power.",
    steps: [
      "Grip the parallel bars and push yourself up to the starting position.",
      "Lean forward slightly to target the chest.",
      "Lower your body until elbows reach a 90-degree bend.",
      "Drive back up using your chest and triceps.",
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
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("My Workouts");
  const [activeDay, setActiveDay] = useState("Mon");
  const [activeDietDay, setActiveDietDay] = useState("Mon");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingId, setPlayingId] = useState(null); // full video playing inside a card
  const [hoverId, setHoverId] = useState(null); // card currently under the mouse (preview)
  const [detailPlaying, setDetailPlaying] = useState(false); // video on detail page
  const [selectedDiet, setSelectedDiet] = useState(() => {
    const savedDiet = localStorage.getItem("fitguide-diet");
    return savedDiet === "vegetarian" ? "vegetarian" : "non-vegetarian";
  });

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
      api.getUser(currentUser.id)
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

  const currentDietPlan = dietPlanData[selectedDiet];

  const membershipPackages = [
    { name: "1 Month", price: "₹1,500", badge: "1 Month" },
    { name: "3 Months", price: "₹4,000", badge: "3 Months" },
    { name: "6 Months", price: "₹7,500", badge: "6 Months" },
    { name: "12 Months", price: "₹14,000", badge: "12 Months" },
  ];

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
  const [viewReceipt, setViewReceipt] = useState(null);

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
    setDetailPlaying(false);
    setHoverId(null);
  };

  const goBack = () => {
    setSelectedWorkout(null);
    setDetailPlaying(false);
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
                setPlayingId(null);
                setHoverId(null);
                setDetailPlaying(false);
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
            <button className="public-site" onClick={() => navigate("/")}>
              ↗ Public Site
            </button>

            <button className="icon-button">
              <FiBell />
            </button>

            <div className="profile-avatar">{userInitials}</div>
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
                  {detailPlaying ? (
                    <VideoPlayer
                      url={selectedWorkout.videoUrl}
                      title={selectedWorkout.title}
                    />
                  ) : (
                    <>
                      <img
                        src={selectedWorkout.image}
                        alt={selectedWorkout.title}
                      />

                      <button
                        className="detail-play-button"
                        onClick={() => setDetailPlaying(true)}
                      >
                        <FiPlay />
                      </button>

                      <span className="demo-label">
                        EXERCISE DEMO
                      </span>
                    </>
                  )}
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
                  onClick={() => {
                    setActiveDay(day);
                    setPlayingId(null);
                    setHoverId(null);
                  }}
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
                  : `${workouts.length} Exercises Assigned`}
              </span>

            </div>

            {/* EXERCISE CARDS */}
            {activeDay === "Sun" ? (

              <div className="rest-message">
                <FiCoffee />
                <h2>Sunday is Rest & Recovery Day</h2>
                <p>No workout videos or exercises scheduled today. Focus on hydration, light stretching, and complete muscle recovery.</p>
              </div>

            ) : (

              <div className="workout-grid">

                {workouts.map((workout) => (

                  <div className="exercise-card" key={workout.id}>

                    {/* Hover here -> muted preview plays. Click play -> full video. */}
                    <div
                      className="exercise-image"
                      onMouseEnter={() => setHoverId(workout.id)}
                      onMouseLeave={() => setHoverId(null)}
                    >

                      {playingId === workout.id ? (
                        <VideoPlayer
                          url={workout.videoUrl}
                          title={workout.title}
                        />
                      ) : (
                        <>
                          <img
                            src={workout.image}
                            alt={workout.title}
                          />

                          {hoverId === workout.id && (
                            <HoverPreview
                              url={workout.videoUrl}
                              title={workout.title}
                            />
                          )}

                          <span className="demo-label">
                            DEMO VIDEO
                          </span>

                          <button
                            className="play-button"
                            onClick={() => setPlayingId(workout.id)}
                          >
                            <FiPlay />
                          </button>
                        </>
                      )}

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

        ) : activeMenu === "My Diet Plan" ? (

          <section className="diet-plan-content">
            <span className="section-label">MEMBER PORTAL</span>
            <div className="diet-plan-header">
              <div>
                <h1>MY DIET PLAN</h1>
                <p className="diet-plan-description">
                  Assigned for MUSCLE BUILDING - Whole Food Performance Fuel
                </p>
              </div>

              <div className="diet-toggle-row">
                <button
                  type="button"
                  className={selectedDiet === "non-vegetarian" ? "diet-toggle active" : "diet-toggle"}
                  onClick={() => setSelectedDiet("non-vegetarian")}
                >
                  Non-Vegetarian
                </button>
                <button
                  type="button"
                  className={selectedDiet === "vegetarian" ? "diet-toggle active" : "diet-toggle"}
                  onClick={() => setSelectedDiet("vegetarian")}
                >
                  Vegetarian
                </button>
              </div>
            </div>

            {/* WEEKLY DIET DAYS */}
            <div className="weekly-schedule">
              {days.map(([day, label]) => (
                <button
                  type="button"
                  key={day}
                  className={
                    activeDietDay === day
                      ? "day-card active-day"
                      : "day-card"
                  }
                  onClick={() => setActiveDietDay(day)}
                >
                  <strong>{day}</strong>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="diet-focus-card">
              <div className="calendar-icon diet-icon">
                <FiCoffee />
              </div>

              <div className="focus-details diet-focus-details">
                <small>{currentDietPlan.label.toUpperCase()} PLAN</small>
                <h2>{currentDietPlan.focus}</h2>
              </div>

              <span className="diet-plan-note">{currentDietPlan.description}</span>
            </div>

            <div className="diet-grid">
              {currentDietPlan.meals.map((meal) => (
                <div className="diet-card" key={meal.id}>
                  <div className="diet-image-wrap">
                    <img src={meal.image} alt={meal.title} />
                    <span className="diet-chip">{meal.mealType}</span>
                    <span className="diet-time">{meal.time}</span>
                  </div>

                  <div className="diet-card-body">
                    <div className="diet-card-header">
                      <h3>{meal.title}</h3>
                      <span>{meal.calories}</span>
                    </div>

                    <p className="diet-portion">{meal.portion}</p>
                    <p className="diet-nutrients">{meal.nutrients}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        ) : activeMenu === "Membership & Payments" ? (

          <section className="membership-content">
            <span className="section-label">MEMBER PORTAL</span>

            <div className="membership-header-row">
              <div>
                <h1>MEMBERSHIP &amp; PAYMENTS</h1>
                <p>Manage your active subscription, access official tax invoices, and download PDF receipts.</p>
              </div>

              <button
                className="download-btn"
                onClick={() => setViewReceipt(latestReceipt)}
              >
                Download Latest Receipt(PDF)
              </button>
            </div>

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
                  <p>Includes unlimited equipment access and personalized workout plans.</p>
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

            <div className="payment-history-section">
              <div className="section-heading-row">
                <h3>Payment &amp; Receipt History</h3>
                <p>Official downloadable GST receipts for tax compliance and record keeping.</p>
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

            <div className="renewal-section">
              <div className="section-heading-row">
                <h3>Available Renewal &amp; Upgrade Packages</h3>
                <p>Flexible plans for continued access with better value and extended training support.</p>
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

        {viewReceipt && (
          <div className="receipt-modal-backdrop" onClick={() => setViewReceipt(null)}>
            <div className="receipt-modal" onClick={(event) => event.stopPropagation()}>
              <div className="receipt-modal-header">
                <div className="receipt-company">
                  <span className="receipt-brand">FITGUIDE</span>
                  <small>Fitness Performance Gym & Fitness Center</small>
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
                    <span className="receipt-avatar">{viewReceipt.customer.name.split(" ")[0][0]}</span>
                    <div>
                      <strong>{viewReceipt.customer.name}</strong>
                      <small>{viewReceipt.packageName}</small>
                    </div>
                  </div>
                  <div className="receipt-amount-tag">₹{viewReceipt.total.toLocaleString("en-IN")}</div>
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
                  <div className="receipt-total-row grand-total">
                    <span>Total Paid</span>
                    <strong>₹{viewReceipt.total.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="receipt-footer-row">
                  <div className="receipt-status-badge">
                    <span className="status-dot" />
                    Digitally Signed &amp; Verified
                  </div>
                  <div className="receipt-validity">
                    Valid from {viewReceipt.startDate} to {viewReceipt.expiryDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default MemberDashboard;