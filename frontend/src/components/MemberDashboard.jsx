import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { dietPlanData, dailyWorkoutSynergy, getDynamicMealOptions } from "../data/dietData";
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
  FiSun,
  FiMoon,
  FiZap,
  FiRefreshCw,
  FiDroplet,
  FiPlus,
  FiMinus,
  FiRotateCcw,
  FiEdit2,
  FiCheck,
  FiSliders,
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

// dietPlanData is imported from ../data/dietData.js

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
 const [selectedGoal, setSelectedGoal] = useState(() => {
  const saved = localStorage.getItem("fitguide-goal");
  if (["bulking", "weightLoss", "strength"].includes(saved)) {
    return saved;
  }

  try {
    const user = JSON.parse(localStorage.getItem("fitguideCurrentUser") || "{}");
    const raw = user?.fitnessProfile?.goal || user?.goal;
    if (raw === "muscle-building") return "bulking";
    if (raw === "fat-loss") return "weightLoss";
    if (["bulking", "weightLoss", "strength"].includes(raw)) return raw;
  } catch {
    // ignore
  }

  return "bulking";
});

const [selectedDiet, setSelectedDiet] = useState(() => {
  const saved = localStorage.getItem("fitguide-diet");

  return ["vegetarian", "non-vegetarian"].includes(saved)
    ? saved
    : "vegetarian";
});

const [workoutTiming, setWorkoutTiming] = useState(() => {
  return localStorage.getItem("fitguide-workout-timing") || "evening";
});

const [selectedMealOptions, setSelectedMealOptions] = useState({});

const handleWorkoutTimingChange = (timing) => {
  setWorkoutTiming(timing);
  localStorage.setItem("fitguide-workout-timing", timing);
};

const handleSelectMealOption = (mealKey, optionIndex) => {
  setSelectedMealOptions((prev) => ({
    ...prev,
    [mealKey]: optionIndex,
  }));
};

const handleCycleOption = (mealKey, totalOptions) => {
  setSelectedMealOptions((prev) => {
    const current = prev[mealKey] || 0;
    return {
      ...prev,
      [mealKey]: (current + 1) % totalOptions,
    };
  });
};

// Daily Water Intake Tracking with date-aware localStorage
const getTodayDateStr = () => new Date().toISOString().slice(0, 10);

const [waterIntake, setWaterIntake] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("fitguide-water-tracker") || "{}");
    if (saved && saved.date === getTodayDateStr() && typeof saved.amount === "number") {
      return saved.amount;
    }
  } catch {
    // fallback
  }
  return 1500;
});

const defaultWaterTarget =
  selectedGoal === "bulking"
    ? 3500
    : selectedGoal === "strength"
    ? 4000
    : 3000;

const [waterTarget, setWaterTarget] = useState(() => {
  const saved = parseInt(localStorage.getItem("fitguide-water-target"), 10);
  return saved && !isNaN(saved) && saved >= 500 ? saved : defaultWaterTarget;
});

const [isEditingTarget, setIsEditingTarget] = useState(false);
const [customTargetInput, setCustomTargetInput] = useState(waterTarget);

const [isEditingIntake, setIsEditingIntake] = useState(false);
const [directIntakeInput, setDirectIntakeInput] = useState(1500);

const [customAddInput, setCustomAddInput] = useState("");

const handleSaveTarget = (newTarget) => {
  if (!newTarget || isNaN(newTarget) || newTarget < 500) return;
  const clamped = Math.min(Math.max(newTarget, 500), 10000);
  setWaterTarget(clamped);
  setCustomTargetInput(clamped);
  localStorage.setItem("fitguide-water-target", clamped);
  localStorage.setItem("fitguide-water-target-custom", "true");
  setIsEditingTarget(false);
};

const handleSetExactIntake = (amount) => {
  if (isNaN(amount) || amount < 0) return;
  const clamped = Math.min(Math.max(amount, 0), 10000);
  setWaterIntake(clamped);
  setDirectIntakeInput(clamped);
  localStorage.setItem(
    "fitguide-water-tracker",
    JSON.stringify({ date: getTodayDateStr(), amount: clamped })
  );
  setIsEditingIntake(false);
};

const handleAddCustomAmount = () => {
  const parsed = parseInt(customAddInput, 10);
  if (!parsed || isNaN(parsed) || parsed <= 0) return;
  handleAddWater(parsed);
  setCustomAddInput("");
};

const handleAddWater = (delta) => {
  setWaterIntake((prev) => {
    const nextVal = Math.max(0, Math.min(prev + delta, 10000));
    localStorage.setItem(
      "fitguide-water-tracker",
      JSON.stringify({ date: getTodayDateStr(), amount: nextVal })
    );
    return nextVal;
  });
};

const handleSetGlasses = (glassCount) => {
  const nextVal = glassCount * 250;
  setWaterIntake(nextVal);
  localStorage.setItem(
    "fitguide-water-tracker",
    JSON.stringify({ date: getTodayDateStr(), amount: nextVal })
  );
};

const handleResetWater = () => {
  setWaterIntake(0);
  localStorage.setItem(
    "fitguide-water-tracker",
    JSON.stringify({ date: getTodayDateStr(), amount: 0 })
  );
};

const waterPercentage = Math.min(Math.round((waterIntake / waterTarget) * 100), 100);

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
            if (fresh.fitnessProfile?.goal) {
              const mappedGoal =
                fresh.fitnessProfile.goal === "muscle-building"
                  ? "bulking"
                  : fresh.fitnessProfile.goal === "fat-loss"
                  ? "weightLoss"
                  : fresh.fitnessProfile.goal;
              if (["bulking", "weightLoss", "strength"].includes(mappedGoal)) {
                setSelectedGoal(mappedGoal);
                localStorage.setItem("fitguide-goal", mappedGoal);
              }
            }
            if (
              fresh.fitnessProfile?.diet &&
              ["vegetarian", "non-vegetarian"].includes(fresh.fitnessProfile.diet)
            ) {
              setSelectedDiet(fresh.fitnessProfile.diet);
              localStorage.setItem("fitguide-diet", fresh.fitnessProfile.diet);
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleGoalChange = (goalId) => {
    setSelectedGoal(goalId);
    localStorage.setItem("fitguide-goal", goalId);
    if (currentUser?.id && typeof currentUser.id === "number") {
      api.updateFitnessProfile(currentUser.id, goalId, selectedDiet).catch(() => {});
    }
  };

  const handleDietChange = (dietType) => {
    setSelectedDiet(dietType);
    localStorage.setItem("fitguide-diet", dietType);
    if (currentUser?.id && typeof currentUser.id === "number") {
      api.updateFitnessProfile(currentUser.id, selectedGoal, dietType).catch(() => {});
    }
  };

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

  const basePlan =
    dietPlanData[selectedGoal]?.[selectedDiet] ||
    dietPlanData.bulking.vegetarian;

  const rawMeals =
    basePlan.days?.[activeDietDay] ||
    basePlan.meals ||
    [];

  // Adjust timing and sequence dynamically based on workoutTiming (morning vs evening)
  const currentMeals = rawMeals
    .map((meal) => {
      if (workoutTiming === "morning") {
        if (meal.mealType === "Pre-Workout") {
          return { ...meal, time: "06:15 AM - 06:45 AM", sortOrder: 1 };
        }
        if (meal.mealType === "Post-Workout") {
          return { ...meal, time: "08:15 AM - 08:45 AM", sortOrder: 2 };
        }
        if (meal.mealType === "Breakfast") {
          return { ...meal, time: "09:15 AM - 09:45 AM", sortOrder: 3 };
        }
        if (meal.mealType === "Lunch") {
          return { ...meal, sortOrder: 4 };
        }
        if (meal.mealType === "Dinner") {
          return { ...meal, sortOrder: 5 };
        }
      } else {
        // Evening timing
        if (meal.mealType === "Breakfast") return { ...meal, sortOrder: 1 };
        if (meal.mealType === "Lunch") return { ...meal, sortOrder: 2 };
        if (meal.mealType === "Pre-Workout") return { ...meal, sortOrder: 3 };
        if (meal.mealType === "Post-Workout") return { ...meal, sortOrder: 4 };
        if (meal.mealType === "Dinner") return { ...meal, sortOrder: 5 };
      }
      return { ...meal, sortOrder: 3 };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const dayFocus =
    basePlan.weeklyFocus?.[activeDietDay] ||
    basePlan.focus;

  const currentDietPlan = {
    ...basePlan,
    focus: dayFocus,
    meals: currentMeals,
  };

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
      Personalized daily nutrition based on the fitness goal you selected during onboarding.
    </p>
  </div>
</div>

{/* ASSIGNED GOAL SUMMARY (FROM ONBOARDING / LOGIN) */}
<div className="diet-selection-section">
  <div className="assigned-goal-card">
    <div className="assigned-goal-info">
      <span className="assigned-label">ASSIGNED FITNESS GOAL</span>
      <h2>
        {selectedGoal === "bulking"
          ? "💪 Muscle Building & Hypertrophy"
          : selectedGoal === "weightLoss"
          ? "🔥 Fat Loss & Calorie Deficit"
          : "🏋️ Strength & Peak Performance"}
      </h2>
      <p>
        {selectedGoal === "bulking"
          ? "Your daily meals are calibrated in a clean calorie surplus with high protein to build lean muscle mass."
          : selectedGoal === "weightLoss"
          ? "Your daily meals are structured in a controlled calorie deficit with high fiber to burn fat and preserve lean muscle."
          : "Your daily meals are packed with dense whole foods and clean carbs to maximize compound lift power."}
      </p>
    </div>
    <button
      type="button"
      className="change-goal-link"
      onClick={() => navigate("/onboarding")}
    >
      Change Goal ↗
    </button>
  </div>

  {/* FOOD PREFERENCE & WORKOUT TIMING */}
  <div className="diet-controls-flex">
    <div className="diet-control-block">
      <h3>Select Food Preference</h3>
      <div className="diet-toggle-row">
        <button
          type="button"
          className={
            selectedDiet === "vegetarian"
              ? "diet-toggle active"
              : "diet-toggle"
          }
          onClick={() => handleDietChange("vegetarian")}
        >
          🌱 Vegetarian
        </button>

        <button
          type="button"
          className={
            selectedDiet === "non-vegetarian"
              ? "diet-toggle active"
              : "diet-toggle"
          }
          onClick={() => handleDietChange("non-vegetarian")}
        >
          🍗 Non-Vegetarian
        </button>
      </div>
    </div>

    <div className="diet-control-block">
      <h3>Workout Training Window</h3>
      <div className="diet-toggle-row">
        <button
          type="button"
          className={
            workoutTiming === "evening"
              ? "diet-toggle active"
              : "diet-toggle"
          }
          onClick={() => handleWorkoutTimingChange("evening")}
        >
          <FiMoon style={{ marginRight: 6 }} /> Evening Workout (4:30 PM Pre / 7:00 PM Post)
        </button>

        <button
          type="button"
          className={
            workoutTiming === "morning"
              ? "diet-toggle active"
              : "diet-toggle"
          }
          onClick={() => handleWorkoutTimingChange("morning")}
        >
          <FiSun style={{ marginRight: 6 }} /> Morning Workout (6:15 AM Pre / 8:15 AM Post)
        </button>
      </div>
    </div>
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

            {/* SUNDAY RECOVERY NOTE */}
            {activeDietDay === "Sun" && (
              <div className="rest-message" style={{ margin: "1rem 0" }}>
                <FiCoffee />
                <h2>Sunday: Rest &amp; Nutrition Recovery</h2>
                <p>
                  Hydration and cellular recovery day. Drink 3–4 liters of water, maintain steady protein intake, and allow your digestive system and muscles to recharge.
                </p>
              </div>
            )}

            <div className="diet-focus-card">
              <div className="calendar-icon diet-icon">
                <FiCoffee />
              </div>

              <div className="focus-details diet-focus-details">
                <small>
  {activeDietDay.toUpperCase()} SCHEDULE &bull;{" "}
  {selectedGoal === "bulking"
    ? "BULKING PLAN"
    : selectedGoal === "weightLoss"
    ? "WEIGHT LOSS PLAN"
    : "STRENGTH TRAINING PLAN"}
  {" / "}
  {currentDietPlan.label.toUpperCase()}
</small>

<h2>{currentDietPlan.focus}</h2>
              </div>

              <span className="diet-plan-note">{currentDietPlan.description}</span>
            </div>

            {/* DAILY WATER & HYDRATION TRACKER */}
            <div className="water-tracker-card">
              <div className="water-tracker-top">
                <div className="water-title-wrap">
                  <div className="water-icon-circle">
                    <FiDroplet />
                  </div>
                  <div>
                    <span className="water-badge">DAILY HYDRATION TRACKER</span>
                    <div className="water-header-with-actions">
                      <h3>
                        {(waterIntake / 1000).toFixed(2)}L{" "}
                        <span className="water-target-label">
                          / {(waterTarget / 1000).toFixed(1)}L Goal
                        </span>
                      </h3>
                      <div className="water-tool-buttons">
                        <button
                          type="button"
                          className={`water-tool-btn ${isEditingTarget ? "active" : ""}`}
                          onClick={() => {
                            setIsEditingTarget(!isEditingTarget);
                            setIsEditingIntake(false);
                          }}
                          title="Set custom daily target goal"
                        >
                          <FiEdit2 /> Set Goal
                        </button>
                        <button
                          type="button"
                          className={`water-tool-btn ${isEditingIntake ? "active" : ""}`}
                          onClick={() => {
                            setIsEditingIntake(!isEditingIntake);
                            setIsEditingTarget(false);
                          }}
                          title="Manually set current consumed amount"
                        >
                          <FiSliders /> Set Intake
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="water-stats-pill">
                  <span className="water-percent">{waterPercentage}%</span>
                  <span className="water-glasses-count">
                    {Math.floor(waterIntake / 250)} / {Math.floor(waterTarget / 250)} Glasses
                  </span>
                </div>
              </div>

              {/* CUSTOM TARGET GOAL DRAWER */}
              {isEditingTarget && (
                <div className="water-custom-editor-drawer">
                  <div className="custom-drawer-header">
                    <span className="drawer-title">
                      <FiEdit2 /> Customize Daily Water Target Goal:
                    </span>
                    <button
                      type="button"
                      className="drawer-close-btn"
                      onClick={() => setIsEditingTarget(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="target-presets-row">
                    <span className="presets-label">Quick Presets:</span>
                    {[2000, 2500, 3000, 3500, 4000, 4500, 5000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`target-preset-chip ${waterTarget === preset ? "active" : ""}`}
                        onClick={() => handleSaveTarget(preset)}
                      >
                        {(preset / 1000).toFixed(1)}L
                      </button>
                    ))}
                  </div>
                  <div className="custom-input-flex">
                    <span className="input-prompt">Or enter custom target:</span>
                    <div className="input-with-button">
                      <input
                        type="number"
                        min="500"
                        max="10000"
                        step="100"
                        value={customTargetInput}
                        onChange={(e) => setCustomTargetInput(e.target.value)}
                        placeholder="e.g. 3200"
                        className="water-input-field"
                      />
                      <span className="unit-label">ml</span>
                      <button
                        type="button"
                        className="apply-custom-btn"
                        onClick={() => handleSaveTarget(Number(customTargetInput))}
                      >
                        <FiCheck /> Apply Goal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* DIRECT INTAKE ADJUSTMENT DRAWER */}
              {isEditingIntake && (
                <div className="water-custom-editor-drawer">
                  <div className="custom-drawer-header">
                    <span className="drawer-title">
                      <FiSliders /> Manually Set Current Consumed Water:
                    </span>
                    <button
                      type="button"
                      className="drawer-close-btn"
                      onClick={() => setIsEditingIntake(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="custom-input-flex">
                    <span className="input-prompt">Enter current total volume:</span>
                    <div className="input-with-button">
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        step="50"
                        value={directIntakeInput}
                        onChange={(e) => setDirectIntakeInput(e.target.value)}
                        placeholder="e.g. 1850"
                        className="water-input-field"
                      />
                      <span className="unit-label">ml</span>
                      <button
                        type="button"
                        className="apply-custom-btn"
                        onClick={() => handleSetExactIntake(Number(directIntakeInput))}
                      >
                        <FiCheck /> Update Intake
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PROGRESS BAR */}
              <div className="water-progress-track">
                <div
                  className="water-progress-fill"
                  style={{ width: `${waterPercentage}%` }}
                >
                  <div className="water-progress-glow"></div>
                </div>
              </div>

              {/* INTERACTIVE GLASS INDICATORS */}
              <div className="water-glasses-row">
                {Array.from({ length: Math.min(Math.floor(waterTarget / 250), 16) }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`glass-indicator ${idx < Math.floor(waterIntake / 250) ? "filled" : ""}`}
                    onClick={() => handleSetGlasses(idx + 1)}
                    title={`Glass ${idx + 1} (250ml) - Click to set`}
                  >
                    <FiDroplet />
                    <span>{idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* QUICK & CUSTOM ACTION BUTTONS */}
              <div className="water-controls-row">
                <div className="water-quick-buttons">
                  <button
                    type="button"
                    className="water-btn add-btn"
                    onClick={() => handleAddWater(250)}
                  >
                    <FiPlus /> 250 ml (Glass)
                  </button>
                  <button
                    type="button"
                    className="water-btn add-btn"
                    onClick={() => handleAddWater(500)}
                  >
                    <FiPlus /> 500 ml (Shaker)
                  </button>
                  <button
                    type="button"
                    className="water-btn add-btn"
                    onClick={() => handleAddWater(750)}
                  >
                    <FiPlus /> 750 ml (Bottle)
                  </button>

                  {/* CUSTOM AMOUNT ADDER */}
                  <div className="water-custom-log-inline">
                    <input
                      type="number"
                      min="10"
                      max="3000"
                      step="50"
                      value={customAddInput}
                      onChange={(e) => setCustomAddInput(e.target.value)}
                      placeholder="Custom ml"
                      className="water-custom-log-input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddCustomAmount();
                      }}
                    />
                    <button
                      type="button"
                      className="water-btn custom-log-btn"
                      onClick={handleAddCustomAmount}
                      disabled={!customAddInput || Number(customAddInput) <= 0}
                    >
                      <FiPlus /> Add
                    </button>
                  </div>
                </div>

                <div className="water-action-buttons">
                  {waterIntake > 0 && (
                    <button
                      type="button"
                      className="water-btn minus-btn"
                      onClick={() => handleAddWater(-250)}
                      title="Remove 250ml"
                    >
                      <FiMinus /> 250ml
                    </button>
                  )}
                  <button
                    type="button"
                    className="water-btn reset-btn"
                    onClick={handleResetWater}
                    title="Reset today's hydration"
                  >
                    <FiRotateCcw /> Reset
                  </button>
                </div>
              </div>

              <p className="water-tip-text">
                {waterPercentage >= 100
                  ? "🏆 Hydration goal achieved! Muscle cells are fully saturated for optimal nutrient delivery & recovery."
                  : waterPercentage >= 65
                  ? "💪 Great hydration pace! Sustained cellular volume prevents fatigue and optimizes muscle pumps."
                  : waterPercentage >= 35
                  ? "⚡ Keep hydrating! Sip water consistently between meals and peri-workout windows."
                  : "💧 Tip: Drink at least 500ml before your training session to maintain high vascular output."}
              </p>
            </div>

            <div className="diet-grid">
              {currentDietPlan.meals.map((meal) => {
                const isWorkoutMeal =
                  meal.mealType === "Pre-Workout" || meal.mealType === "Post-Workout";
                const dynamicOptions = isWorkoutMeal
                  ? getDynamicMealOptions(meal, selectedGoal, selectedDiet, activeDietDay)
                  : [];
                const mealKey = `${activeDietDay}-${meal.id}`;
                const activeOptIdx = selectedMealOptions[mealKey] || 0;
                const activeMealData =
                  dynamicOptions.length > 0 ? dynamicOptions[activeOptIdx] || meal : meal;
                const synergy = dailyWorkoutSynergy[activeDietDay];

                return (
                  <div
                    className={`diet-card ${isWorkoutMeal ? "dynamic-workout-card" : ""}`}
                    key={meal.id}
                  >
                    <div className="diet-image-wrap">
                      <img src={activeMealData.image} alt={activeMealData.title} />
                      <span
                        className={`diet-chip ${meal.mealType
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                      >
                        {meal.mealType}
                      </span>
                      <span className="diet-time">{meal.time}</span>
                      {isWorkoutMeal && activeMealData.badge && (
                        <span className="diet-dynamic-badge">
                          ✨ {activeMealData.badge}
                        </span>
                      )}
                    </div>

                    <div className="diet-card-body">
                      {isWorkoutMeal && dynamicOptions.length > 0 ? (
                        <div className="dynamic-options-bar">
                          <div className="dynamic-options-header">
                            <span className="dynamic-options-label">
                              <FiZap /> DIFFERENT OPTIONS:
                            </span>
                            <button
                              type="button"
                              className="swap-option-btn"
                              onClick={() =>
                                handleCycleOption(mealKey, dynamicOptions.length)
                              }
                              title="Cycle to next meal option"
                            >
                              <FiRefreshCw /> Swap
                            </button>
                          </div>

                          <div className="option-pill-group">
                            {dynamicOptions.map((opt, oIdx) => (
                              <button
                                key={opt.id || oIdx}
                                type="button"
                                className={`option-pill ${
                                  activeOptIdx === oIdx ? "active" : ""
                                }`}
                                onClick={() => handleSelectMealOption(mealKey, oIdx)}
                              >
                                <span>{opt.icon}</span> {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="standard-meal-bar">
                          <div className="standard-meal-header">
                            <span className="standard-meal-label">
                              {meal.mealType === "Breakfast" ? (
                                <>
                                  <FiSun /> MORNING METABOLIC FUEL
                                </>
                              ) : meal.mealType === "Lunch" ? (
                                <>
                                  <FiActivity /> MID-DAY POWER FUEL
                                </>
                              ) : (
                                <>
                                  <FiMoon /> EVENING CELLULAR REPAIR
                                </>
                              )}
                            </span>
                            <span className="standard-macro-tag">
                              {meal.mealType === "Breakfast"
                                ? "High Bioavailability"
                                : meal.mealType === "Lunch"
                                ? "Sustained Glycogen"
                                : "Nocturnal Amino Recovery"}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="diet-card-header">
                        <h3>{activeMealData.title}</h3>
                        <span>{activeMealData.calories}</span>
                      </div>

                      <p className="diet-portion">{activeMealData.portion}</p>
                      <p className="diet-nutrients">{activeMealData.nutrients}</p>

                      {isWorkoutMeal && synergy ? (
                        <div className="workout-synergy-banner">
                          <span className="synergy-badge">
                            <FiZap /> {activeDietDay} WORKOUT SYNERGY
                          </span>
                          <p className="synergy-tip">
                            {meal.mealType === "Pre-Workout"
                              ? synergy.preTip
                              : synergy.postTip}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`standard-meal-footer ${meal.mealType
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-")}-footer`}
                        >
                          <span className="synergy-badge">
                            {meal.mealType === "Breakfast" ? (
                              <FiSun />
                            ) : meal.mealType === "Lunch" ? (
                              <FiActivity />
                            ) : (
                              <FiMoon />
                            )}{" "}
                            {meal.mealType.toUpperCase()} NUTRITION PURPOSE
                          </span>
                          <p className="synergy-tip">
                            {meal.mealType === "Breakfast"
                              ? "Restores overnight glycogen, balances morning cortisol, and primes muscle protein synthesis."
                              : meal.mealType === "Lunch"
                              ? "Stabilizes blood glucose and powers mid-day physical stamina with dense complex grains and lean proteins."
                              : "Supplies essential amino acids, zinc, and healthy fats for continuous tissue reconstruction during sleep."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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