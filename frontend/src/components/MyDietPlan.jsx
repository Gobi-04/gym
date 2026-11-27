import React, { useState } from "react";
import { FiCoffee } from "react-icons/fi";
import "../styles/MemberDashboard.css";

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
        title: "",
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
    description:
      "Balanced vegetarian meals with protein-rich ingredients for strength and energy.",
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

const days = [
  ["Mon", "Day 01"],
  ["Tue", "Day 02"],
  ["Wed", "Day 03"],
  ["Thu", "Day 04"],
  ["Fri", "Day 05"],
  ["Sat", "Day 06"],
  ["Sun", "Rest"],
];

function MyDietPlan() {
  const [selectedDiet, setSelectedDiet] = useState(() => {
    const saved = localStorage.getItem("fitguide-diet");
    return saved === "vegetarian" ? "vegetarian" : "non-vegetarian";
  });
  const [activeDietDay, setActiveDietDay] = useState("Mon");

  const handleDietChange = (dietType) => {
    setSelectedDiet(dietType);
    localStorage.setItem("fitguide-diet", dietType);
  };

  const currentDietPlan = dietPlanData[selectedDiet] || dietPlanData["non-vegetarian"];

  return (
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
            className={
              selectedDiet === "non-vegetarian"
                ? "diet-toggle active"
                : "diet-toggle"
            }
            onClick={() => handleDietChange("non-vegetarian")}
          >
            Non-Vegetarian
          </button>
          <button
            type="button"
            className={
              selectedDiet === "vegetarian"
                ? "diet-toggle active"
                : "diet-toggle"
            }
            onClick={() => handleDietChange("vegetarian")}
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
              activeDietDay === day ? "day-card active-day" : "day-card"
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
  );
}

export default MyDietPlan;
