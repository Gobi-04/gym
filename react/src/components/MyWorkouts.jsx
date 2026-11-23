import React, { useState } from "react";
import { FiCalendar, FiCoffee, FiPlay } from "react-icons/fi";
import "../styles/MemberDashboard.css";

const defaultWorkouts = [
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
  {
    id: 4,
    title: "Seated Dumbbell Shoulder Press",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
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

function MyWorkouts({ onSelectWorkout }) {
  const [activeDay, setActiveDay] = useState("Mon");

  return (
    <section className="workout-content">
      <span className="section-label">ASSIGNED TRAINING SCHEDULE</span>

      <h1>MY WEEKLY WORKOUTS</h1>

      <p className="workout-description">
        Assigned strictly by your trainer. Follow sets, reps, and video technique
        cues.
      </p>

      {/* WEEKLY DAYS */}
      <div className="weekly-schedule">
        {days.map(([day, label]) => (
          <button
            key={day}
            className={
              activeDay === day ? "day-card active-day" : "day-card"
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
          <small>{activeDay.toUpperCase()} FOCUS</small>

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
            : `${defaultWorkouts.length} Exercises Assigned`}
        </span>
      </div>

      {/* EXERCISE CARDS / SUNDAY REST */}
      {activeDay === "Sun" ? (
        <div className="rest-message">
          <FiCoffee />
          <h2>Sunday is Rest & Recovery Day</h2>
          <p>
            No workout videos or exercises scheduled today. Focus on hydration,
            light stretching, and complete muscle recovery.
          </p>
        </div>
      ) : (
        <div className="workout-grid">
          {defaultWorkouts.map((workout) => (
            <div className="exercise-card" key={workout.id}>
              <div className="exercise-image">
                <img src={workout.image} alt={workout.title} />

                <span className="demo-label">DEMO VIDEO</span>

                <button
                  className="play-button"
                  onClick={() => onSelectWorkout && onSelectWorkout(workout)}
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
                  onClick={() => onSelectWorkout && onSelectWorkout(workout)}
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
  );
}

export default MyWorkouts;
