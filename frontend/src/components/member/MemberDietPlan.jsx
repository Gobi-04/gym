import React from "react";
import { FiCoffee } from "react-icons/fi";

export default function MemberDietPlan({
  days,
  selectedDiet,
  setSelectedDiet,
  activeDietDay,
  setActiveDietDay,
  dietPlanData,
}) {
  const currentDietPlan = dietPlanData[selectedDiet];

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
            onClick={() => setSelectedDiet("non-vegetarian")}
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
