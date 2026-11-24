import React, { useState, useEffect, useRef } from "react";
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

/* ---------- HOVER VIDEO (plays when the cursor is on the card) ---------- */
function HoverVideo({ url, poster, onOpen }) {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const start = () => {
    setHovering(true);
    const video = videoRef.current;
    if (video) {
      const promise = video.play();
      if (promise && promise.catch) promise.catch(() => {});
    }
  };

  const stop = () => {
    setHovering(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      className={hovering ? "exercise-image is-playing" : "exercise-image"}
      onMouseEnter={start}
      onMouseLeave={stop}
      onClick={onOpen}
    >
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <span className="demo-label">DEMO VIDEO</span>

      <button className="play-button" type="button" aria-label="Open workout">
        <FiPlay />
      </button>
    </div>
  );
}

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

/* ---------- WORKOUT PLANS (one list per day) ----------
   Save each video in public/videos/ with the workout name (lowercase, spaces -> hyphens)
   Thumbnail images are only the cover before the video plays. */
const IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
];

// Video file name is made from the workout name automatically:
// "Lat Pulldown" -> /videos/lat-pulldown.mp4
const videoFileName = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + ".mp4";

const ex = (id, title, sets, reps, duration, muscle, description, steps) => ({
  id,
  title,
  image: IMAGES[id % IMAGES.length],
  videoUrl: `/videos/${videoFileName(title)}`,
  sets,
  reps,
  duration,
  muscle,
  description,
  steps,
});

const workoutPlans = {
  Mon: {
    focus: "Chest & Triceps Hypertrophy",
    exercises: [
      ex(1, "Flat Barbell Bench Press", 3, "10 - 12 Reps", "10 Minutes", "Chest",
        "The flat barbell bench press helps build chest strength and upper body muscles.",
        ["Lie flat on the bench.", "Hold the barbell slightly wider than shoulder width.", "Lower the bar slowly towards your chest.", "Push the bar upward until your arms are extended."]),
      ex(2, "Incline Dumbbell Press", 3, "10 - 12 Reps", "12 Minutes", "Upper Chest",
        "Incline dumbbell press focuses on developing the upper chest and shoulder muscles.",
        ["Set the bench at an incline angle.", "Hold one dumbbell in each hand.", "Lower the dumbbells towards your upper chest.", "Push both dumbbells upward with control."]),
      ex(3, "Standing Cable Fly", 3, "10 - 12 Reps", "10 Minutes", "Chest",
        "Standing cable fly helps improve chest muscle strength and control.",
        ["Stand between the cable machine handles.", "Hold both handles with your arms open.", "Bring your hands together in front of your chest.", "Slowly return to the starting position."]),
      ex(4, "Seated Dumbbell Shoulder Press", 3, "10 - 12 Reps", "10 Minutes", "Shoulders",
        "Seated dumbbell press builds overhead pushing strength and sculpted shoulders.",
        ["Sit upright with back support and dumbbells at shoulder height.", "Press the weights upward until arms are almost fully extended.", "Pause briefly at the top without banging the weights together.", "Lower under control back to ear level."]),
      ex(5, "Triceps Rope Pushdown", 3, "12 - 15 Reps", "8 Minutes", "Triceps",
        "Rope pushdowns isolate the lateral and long heads of the triceps.",
        ["Attach a rope to a high cable pulley.", "Keep elbows tucked tightly to your sides.", "Push downward and spread the rope apart at the bottom.", "Return slowly to 90-degree elbow flexion."]),
      ex(6, "Parallel Bar Dips", 3, "10 - 12 Reps", "10 Minutes", "Chest & Triceps",
        "Dips are an essential compound movement for chest and tricep power.",
        ["Grip the parallel bars and push yourself up to the starting position.", "Lean forward slightly to target the chest.", "Lower your body until elbows reach a 90-degree bend.", "Drive back up using your chest and triceps."]),
    ],
  },

  Tue: {
    focus: "Back Strength & Width",
    exercises: [
      ex(11, "Lat Pulldown", 3, "10 - 12 Reps", "10 Minutes", "Lats",
        "Lat pulldown builds back width and improves pulling strength.",
        ["Sit down and grip the bar wider than shoulder width.", "Pull the bar down to your upper chest.", "Squeeze your shoulder blades together.", "Return the bar slowly with control."]),
      ex(12, "Seated Cable Row", 3, "10 - 12 Reps", "10 Minutes", "Mid Back",
        "Seated cable row targets the middle back and improves posture.",
        ["Sit with your chest up and knees slightly bent.", "Pull the handle towards your stomach.", "Squeeze your back at the end of the pull.", "Extend your arms slowly."]),
      ex(13, "Bent-Over Barbell Row", 3, "8 - 10 Reps", "12 Minutes", "Back",
        "Barbell row is a heavy compound lift for back thickness.",
        ["Hinge forward at the hips with a flat back.", "Pull the bar towards your lower chest.", "Keep your elbows close to your body.", "Lower the bar under control."]),
      ex(14, "Single-Arm Dumbbell Row", 3, "10 - 12 Reps", "10 Minutes", "Lats",
        "Single-arm row fixes strength imbalances between both sides.",
        ["Place one knee and hand on a bench.", "Pull the dumbbell towards your hip.", "Keep your back flat and elbow close.", "Lower the weight slowly."]),
      ex(15, "Pull-Ups", 3, "6 - 10 Reps", "8 Minutes", "Lats & Biceps",
        "Pull-ups build a wide, strong back using your body weight.",
        ["Hang from the bar with an overhand grip.", "Pull your chin above the bar.", "Keep your core tight.", "Lower yourself fully with control."]),
      ex(16, "Face Pull", 3, "12 - 15 Reps", "8 Minutes", "Rear Delts",
        "Face pulls strengthen the upper back and protect the shoulders.",
        ["Set a rope at face height on a cable machine.", "Pull the rope towards your face.", "Spread your hands apart at the end.", "Return slowly to the start."]),
    ],
  },

  Wed: {
    focus: "Shoulder Strength & Definition",
    exercises: [
      ex(21, "Barbell Overhead Press", 3, "8 - 10 Reps", "12 Minutes", "Shoulders",
        "Overhead press builds overall shoulder strength and size.",
        ["Hold the bar at shoulder height.", "Press the bar straight overhead.", "Keep your core tight and glutes squeezed.", "Lower the bar back to your shoulders."]),
      ex(22, "Dumbbell Lateral Raise", 3, "12 - 15 Reps", "8 Minutes", "Side Delts",
        "Lateral raises create wider, rounder shoulders.",
        ["Stand with dumbbells at your sides.", "Raise your arms out to shoulder height.", "Keep a slight bend in your elbows.", "Lower the weights slowly."]),
      ex(23, "Front Raise", 3, "12 - 15 Reps", "8 Minutes", "Front Delts",
        "Front raises target the front part of the shoulders.",
        ["Hold dumbbells in front of your thighs.", "Raise one or both arms to shoulder height.", "Avoid swinging your body.", "Lower with control."]),
      ex(24, "Rear Delt Fly", 3, "12 - 15 Reps", "8 Minutes", "Rear Delts",
        "Rear delt fly improves shoulder balance and posture.",
        ["Bend forward with a flat back.", "Raise the dumbbells out to the sides.", "Squeeze your shoulder blades.", "Lower slowly."]),
      ex(25, "Arnold Press", 3, "10 - 12 Reps", "10 Minutes", "Shoulders",
        "Arnold press works all three heads of the shoulder.",
        ["Start with palms facing you at chest height.", "Rotate your palms outward as you press up.", "Fully extend your arms overhead.", "Reverse the movement back down."]),
      ex(26, "Dumbbell Shrugs", 3, "12 - 15 Reps", "6 Minutes", "Traps",
        "Shrugs build the upper trapezius muscles.",
        ["Hold heavy dumbbells at your sides.", "Lift your shoulders straight up.", "Pause at the top for a second.", "Lower slowly without rolling the shoulders."]),
    ],
  },

  Thu: {
    focus: "Arms Biceps & Triceps Builder",
    exercises: [
      ex(31, "Barbell Curl", 3, "10 - 12 Reps", "8 Minutes", "Biceps",
        "Barbell curl is the classic mass builder for the biceps.",
        ["Stand tall holding the bar with an underhand grip.", "Curl the bar up to your shoulders.", "Keep your elbows fixed at your sides.", "Lower the bar slowly."]),
      ex(32, "Hammer Curl", 3, "10 - 12 Reps", "8 Minutes", "Biceps & Forearms",
        "Hammer curls build the brachialis and forearm muscles.",
        ["Hold dumbbells with palms facing each other.", "Curl the weights up without twisting.", "Squeeze at the top.", "Lower with control."]),
      ex(33, "Preacher Curl", 3, "10 - 12 Reps", "8 Minutes", "Biceps",
        "Preacher curl isolates the biceps and stops body swing.",
        ["Rest your upper arms on the pad.", "Curl the weight towards your shoulders.", "Pause at the top.", "Lower until your arms are almost straight."]),
      ex(34, "Skull Crushers", 3, "10 - 12 Reps", "10 Minutes", "Triceps",
        "Skull crushers target all three heads of the triceps.",
        ["Lie on a bench holding the bar above your chest.", "Bend your elbows to lower the bar towards your forehead.", "Keep your upper arms still.", "Extend your arms back up."]),
      ex(35, "Overhead Triceps Extension", 3, "10 - 12 Reps", "8 Minutes", "Triceps",
        "Overhead extension stretches and strengthens the long head of the triceps.",
        ["Hold one dumbbell overhead with both hands.", "Lower it behind your head.", "Keep your elbows pointing forward.", "Extend your arms back up."]),
      ex(36, "Triceps Kickback", 3, "12 - 15 Reps", "6 Minutes", "Triceps",
        "Kickbacks finish off the triceps with a strong squeeze.",
        ["Hinge forward with your elbow tucked to your side.", "Extend your arm straight back.", "Squeeze your triceps at the end.", "Return slowly."]),
    ],
  },

  Fri: {
    focus: "Leg Day Power & Mass",
    exercises: [
      ex(41, "Barbell Squat", 4, "8 - 10 Reps", "15 Minutes", "Quads & Glutes",
        "Squats are the king of leg exercises for strength and size.",
        ["Place the bar on your upper back.", "Lower your hips until thighs are parallel to the floor.", "Keep your chest up and knees in line with toes.", "Drive through your heels to stand up."]),
      ex(42, "Leg Press", 3, "10 - 12 Reps", "10 Minutes", "Quads",
        "Leg press builds leg strength with back support.",
        ["Sit and place your feet shoulder width on the platform.", "Lower the platform until knees reach 90 degrees.", "Press back up without locking your knees.", "Keep your lower back on the seat."]),
      ex(43, "Romanian Deadlift", 3, "8 - 10 Reps", "12 Minutes", "Hamstrings",
        "Romanian deadlift targets the hamstrings and glutes.",
        ["Hold the bar at your thighs.", "Push your hips back with a flat back.", "Lower the bar along your legs.", "Squeeze your glutes to stand tall."]),
      ex(44, "Leg Extension", 3, "12 - 15 Reps", "8 Minutes", "Quads",
        "Leg extension isolates the front of the thighs.",
        ["Sit with the pad on your lower shins.", "Extend your legs fully.", "Squeeze your quads at the top.", "Lower slowly."]),
      ex(45, "Lying Leg Curl", 3, "12 - 15 Reps", "8 Minutes", "Hamstrings",
        "Leg curl isolates the hamstrings.",
        ["Lie face down and place the pad above your heels.", "Curl your legs towards your glutes.", "Pause at the top.", "Lower with control."]),
      ex(46, "Standing Calf Raise", 4, "15 - 20 Reps", "8 Minutes", "Calves",
        "Calf raises build lower leg size and ankle strength.",
        ["Stand with the balls of your feet on a step.", "Rise as high as you can on your toes.", "Pause at the top.", "Lower your heels below the step."]),
    ],
  },

  Sat: {
    focus: "Abs & Core Stability",
    exercises: [
      ex(51, "Crunches", 3, "15 - 20 Reps", "6 Minutes", "Abs",
        "Crunches target the upper abdominal muscles.",
        ["Lie on your back with knees bent.", "Lift your shoulders off the floor.", "Squeeze your abs at the top.", "Lower slowly without pulling your neck."]),
      ex(52, "Plank", 3, "45 - 60 Sec", "5 Minutes", "Core",
        "Plank builds total core strength and stability.",
        ["Rest on your forearms and toes.", "Keep your body in a straight line.", "Tighten your abs and glutes.", "Breathe steadily and hold."]),
      ex(53, "Hanging Leg Raise", 3, "10 - 12 Reps", "8 Minutes", "Lower Abs",
        "Hanging leg raises target the lower abdominal muscles.",
        ["Hang from a bar with a firm grip.", "Raise your legs until parallel to the floor.", "Avoid swinging your body.", "Lower your legs slowly."]),
      ex(54, "Russian Twist", 3, "20 Twists", "6 Minutes", "Obliques",
        "Russian twists strengthen the obliques and rotation.",
        ["Sit with knees bent and lean back slightly.", "Hold a weight or clasp your hands.", "Twist your torso side to side.", "Keep your chest up."]),
      ex(55, "Cable Crunch", 3, "12 - 15 Reps", "8 Minutes", "Abs",
        "Cable crunch adds resistance for stronger abs.",
        ["Kneel under a high cable with the rope at your head.", "Crunch down, bringing elbows towards knees.", "Squeeze your abs.", "Return slowly."]),
      ex(56, "Mountain Climbers", 3, "30 Sec", "5 Minutes", "Core & Cardio",
        "Mountain climbers work the core while raising your heart rate.",
        ["Start in a high plank position.", "Drive one knee towards your chest.", "Switch legs quickly.", "Keep your hips low and core tight."]),
    ],
  },
};

const dayNames = {
  Mon: "MONDAY",
  Tue: "TUESDAY",
  Wed: "WEDNESDAY",
  Thu: "THURSDAY",
  Fri: "FRIDAY",
  Sat: "SATURDAY",
  Sun: "SUNDAY",
};

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

  const todaysPlan = workoutPlans[activeDay];
  const todaysWorkouts = todaysPlan ? todaysPlan.exercises : [];

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
                  {dayNames[activeDay]} WORKOUT / EXERCISE DETAILS
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
                  <video
                    key={selectedWorkout.id}
                    src={selectedWorkout.videoUrl}
                    poster={selectedWorkout.image}
                    controls
                    autoPlay
                    loop
                    playsInline
                  />

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
                  {activeDay === "Sun"
                    ? "Recovery & Rest"
                    : todaysPlan.focus}
                </h2>
              </div>

              <span className="exercise-count">
                {activeDay === "Sun"
                  ? "Rest Day"
                  : `${todaysWorkouts.length} Exercises Assigned`}
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

                {todaysWorkouts.map((workout) => (

                  <div className="exercise-card" key={workout.id}>

                    <HoverVideo
                      url={workout.videoUrl}
                      poster={workout.image}
                      onOpen={() => openWorkout(workout)}
                    />

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