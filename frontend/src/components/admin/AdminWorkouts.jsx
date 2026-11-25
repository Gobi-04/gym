import React, { useState } from "react";
import {
  FiUsers,
  FiSave,
  FiTrash2,
  FiPlus,
  FiPlay,
  FiEdit2,
  FiCheck,
  FiX,
  FiSun,
  FiActivity,
} from "react-icons/fi";
import "../../styles/AdminPortal.css";

const initialSchedules = {
  "Fat Loss": {
    Monday: {
      name: "Metabolic Full-Body Ignition",
      exercises: [
        {
          id: "fl-m-1",
          name: "Kettlebell Power Swings",
          sets: "3",
          reps: "12 - 15 Reps",
          image:
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-m-2",
          name: "Flat Barbell Bench Press",
          sets: "3",
          reps: "10 - 12 Reps",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-m-3",
          name: "Standing Cable Fly",
          sets: "3",
          reps: "12 - 15 Reps",
          image:
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Tuesday: {
      name: "HIIT Core & Cardio Blast",
      exercises: [
        {
          id: "fl-t-1",
          name: "Incline Dumbbell Press",
          sets: "3",
          reps: "10 - 12 Reps",
          image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-t-2",
          name: "Medicine Ball Slams",
          sets: "4",
          reps: "15 Reps",
          image:
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-t-3",
          name: "Battle Ropes Circuit",
          sets: "4",
          reps: "45 Secs",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Wednesday: {
      name: "Lower Body Conditioning",
      exercises: [
        {
          id: "fl-w-1",
          name: "Barbell Back Squats",
          sets: "3",
          reps: "10 - 12 Reps",
          image:
            "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-w-2",
          name: "Walking Dumbbell Lunges",
          sets: "3",
          reps: "12 Reps / Leg",
          image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-w-3",
          name: "Leg Press Machine",
          sets: "3",
          reps: "12 - 15 Reps",
          image:
            "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Thursday: {
      name: "Upper Body Hypertrophy",
      exercises: [
        {
          id: "fl-th-1",
          name: "Lat Pulldown (Wide Grip)",
          sets: "3",
          reps: "10 - 12 Reps",
          image:
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-th-2",
          name: "Seated Cable Rows",
          sets: "3",
          reps: "12 Reps",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Friday: {
      name: "Cardio Shred & Abs",
      exercises: [
        {
          id: "fl-f-1",
          name: "Hanging Knee Raises",
          sets: "3",
          reps: "15 Reps",
          image:
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-f-2",
          name: "Treadmill Sprints Circuit",
          sets: "5",
          reps: "1 Min High",
          image:
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Saturday: {
      name: "Full-Body Strength Endurance",
      exercises: [
        {
          id: "fl-s-1",
          name: "Romanian Deadlifts",
          sets: "3",
          reps: "10 Reps",
          image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "fl-s-2",
          name: "Push-ups to Plank Hold",
          sets: "3",
          reps: "15 Reps",
          image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Sunday: {
      name: "Recovery & Rest",
      isRest: true,
      exercises: [],
    },
  },
  "Strength Training": {
    Monday: {
      name: "Heavy Chest & Triceps Surge",
      exercises: [
        {
          id: "st-m-1",
          name: "Barbell Bench Press",
          sets: "4",
          reps: "6 - 8 Reps",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "st-m-2",
          name: "Incline Dumbbell Press",
          sets: "3",
          reps: "8 - 10 Reps",
          image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Tuesday: {
      name: "Back & Pull Power",
      exercises: [
        {
          id: "st-t-1",
          name: "Barbell Deadlift",
          sets: "4",
          reps: "5 Reps",
          image:
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Wednesday: { name: "Active Deload", exercises: [] },
    Thursday: { name: "Leg Power Foundations", exercises: [] },
    Friday: { name: "Shoulders & Arms", exercises: [] },
    Saturday: { name: "Power Clean & Core", exercises: [] },
    Sunday: { name: "Rest & Muscle Repair", isRest: true, exercises: [] },
  },
  "Muscle Building": {
    Monday: {
      name: "Chest Hypertrophy Focus",
      exercises: [
        {
          id: "mb-m-1",
          name: "Flat Dumbbell Press",
          sets: "4",
          reps: "10 - 12 Reps",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Tuesday: { name: "Lats & Upper Back", exercises: [] },
    Wednesday: { name: "Quadriceps & Calves", exercises: [] },
    Thursday: { name: "Deltoids & Traps", exercises: [] },
    Friday: { name: "Biceps & Triceps Pump", exercises: [] },
    Saturday: { name: "Hamstrings & Glutes", exercises: [] },
    Sunday: { name: "Rest & Nutritive Recovery", isRest: true, exercises: [] },
  },
  "Weight Loss": {
    Monday: {
      name: "Calorie Torch Circuit",
      exercises: [
        {
          id: "wl-m-1",
          name: "Burpees to Box Jumps",
          sets: "4",
          reps: "12 Reps",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    Tuesday: { name: "Speed Intervals", exercises: [] },
    Wednesday: { name: "Full Body Resistance", exercises: [] },
    Thursday: { name: "Core & Mobility", exercises: [] },
    Friday: { name: "Metabolic Conditioning", exercises: [] },
    Saturday: { name: "Functional Stamina", exercises: [] },
    Sunday: { name: "Rest & Hydration", isRest: true, exercises: [] },
  },
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const categories = [
  "Fat Loss",
  "Strength Training",
  "Muscle Building",
  "Weight Loss",
];

function AdminWorkouts() {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem("fitguideAdminSchedules");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialSchedules;
  });

  const [selectedGoal, setSelectedGoal] = useState("Fat Loss");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [toastMessage, setToastMessage] = useState("");

  // Modals
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [exerciseModal, setExerciseModal] = useState(null); // { mode: "add" | "edit", data: {...} }

  // Current day data
  const currentDayData =
    schedules[selectedGoal]?.[selectedDay] || {
      name: `${selectedDay} Workout`,
      exercises: [],
    };

  const [workoutNameInput, setWorkoutNameInput] = useState(
    currentDayData.name || ""
  );

  // Sync workout name input when goal/day switches
  React.useEffect(() => {
    const dayData = schedules[selectedGoal]?.[selectedDay];
    setWorkoutNameInput(dayData?.name || "");
  }, [selectedGoal, selectedDay, schedules]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const persistSchedules = (newSchedules) => {
    setSchedules(newSchedules);
    localStorage.setItem(
      "fitguideAdminSchedules",
      JSON.stringify(newSchedules)
    );
  };

  // Save Workout Name
  const handleSaveWorkoutName = () => {
    const updated = {
      ...schedules,
      [selectedGoal]: {
        ...schedules[selectedGoal],
        [selectedDay]: {
          ...currentDayData,
          name: workoutNameInput,
        },
      },
    };
    persistSchedules(updated);
    showToast(`Saved workout name: "${workoutNameInput}"`);
  };

  // Clear Day
  const handleClearDay = () => {
    if (
      window.confirm(
        `Clear all exercises for ${selectedGoal} - ${selectedDay}?`
      )
    ) {
      const updated = {
        ...schedules,
        [selectedGoal]: {
          ...schedules[selectedGoal],
          [selectedDay]: {
            ...currentDayData,
            exercises: [],
          },
        },
      };
      persistSchedules(updated);
      showToast(`Cleared exercises for ${selectedDay}.`);
    }
  };

  // Delete an individual exercise
  const handleDeleteExercise = (exId) => {
    const updatedExercises = (currentDayData.exercises || []).filter(
      (e) => e.id !== exId
    );
    const updated = {
      ...schedules,
      [selectedGoal]: {
        ...schedules[selectedGoal],
        [selectedDay]: {
          ...currentDayData,
          exercises: updatedExercises,
        },
      },
    };
    persistSchedules(updated);
    showToast("Exercise removed from schedule.");
  };

  // Save Add/Edit Exercise Modal
  const handleSaveExerciseModal = (e) => {
    e.preventDefault();
    const { mode, data } = exerciseModal;
    let updatedExercises = [...(currentDayData.exercises || [])];

    if (mode === "add") {
      const newEx = {
        id: `ex-${Date.now()}`,
        name: data.name,
        sets: data.sets,
        reps: data.reps,
        image:
          data.image ||
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
      };
      updatedExercises.push(newEx);
      showToast(`Added ${newEx.name} to ${selectedDay}!`);
    } else {
      updatedExercises = updatedExercises.map((ex) =>
        ex.id === data.id ? data : ex
      );
      showToast(`Updated ${data.name}!`);
    }

    const updated = {
      ...schedules,
      [selectedGoal]: {
        ...schedules[selectedGoal],
        [selectedDay]: {
          ...currentDayData,
          exercises: updatedExercises,
        },
      },
    };

    persistSchedules(updated);
    setExerciseModal(null);
  };

  // Assign schedule to members
  const handleAssignToMembers = () => {
    setIsAssignModalOpen(false);
    showToast(
      `Weekly schedule for "${selectedGoal}" assigned to all matching members!`
    );
  };

  return (
    <div className="admin-workout-management-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <FiCheck /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="admin-workout-header-row">
        <div className="admin-heading-block">
          <h1>Workout Management</h1>
          <p>
            Manage Monday–Saturday training workouts and Sunday Rest Day for
            each member fitness goal.
          </p>
        </div>

        <button
          type="button"
          className="admin-assign-schedule-btn"
          onClick={() => setIsAssignModalOpen(true)}
        >
          <FiUsers />
          <span>Assign Weekly Schedule to Members</span>
        </button>
      </div>

      {/* Card 1: Goal Filter & Weekly Schedule */}
      <div className="admin-workout-filter-card">
        {/* Fitness Goal Category */}
        <div className="admin-filter-group-block">
          <label className="admin-section-micro-label">
            Fitness Goal Category
          </label>
          <div className="admin-goal-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`admin-goal-pill ${
                  selectedGoal === cat ? "active" : ""
                }`}
                onClick={() => setSelectedGoal(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Days */}
        <div className="admin-filter-group-block" style={{ marginTop: "18px" }}>
          <label className="admin-section-micro-label">Weekly Schedule</label>
          <div className="admin-schedule-days-grid">
            {daysOfWeek.map((day) => {
              const dayObj = schedules[selectedGoal]?.[day] || {};
              const isSunday = day === "Sunday";
              const exCount = dayObj.exercises?.length || 0;
              const isActive = selectedDay === day;

              return (
                <div
                  key={day}
                  className={`admin-day-card ${isActive ? "active" : ""} ${
                    isSunday ? "sunday-card" : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="admin-day-card-name">{day}</div>
                  <div className="admin-day-card-count">
                    {isSunday
                      ? "Rest Day"
                      : `${exCount} exercise${exCount === 1 ? "" : "s"}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card 2: Daily Workout Action Bar */}
      <div className="admin-workout-action-bar">
        <div className="admin-workout-name-section">
          <label className="admin-micro-label">
            {selectedGoal} · {selectedDay} Workout Name
          </label>
          <div className="admin-workout-name-input-group">
            <input
              type="text"
              value={workoutNameInput}
              onChange={(e) => setWorkoutNameInput(e.target.value)}
              placeholder="e.g. Metabolic Full-Body Ignition"
            />
            <button
              type="button"
              className="admin-save-name-btn"
              onClick={handleSaveWorkoutName}
            >
              <FiSave />
              <span>Save Name</span>
            </button>
          </div>
        </div>

        {selectedDay !== "Sunday" && (
          <div className="admin-workout-action-buttons">
            <button
              type="button"
              className="admin-clear-day-btn"
              onClick={handleClearDay}
            >
              <FiTrash2 />
              <span>Clear Day Workout</span>
            </button>
            <button
              type="button"
              className="admin-add-exercise-btn"
              onClick={() =>
                setExerciseModal({
                  mode: "add",
                  data: {
                    name: "",
                    sets: "3",
                    reps: "10 - 12 Reps",
                    image: "",
                  },
                })
              }
            >
              <FiPlus />
              <span>Add Exercise</span>
            </button>
          </div>
        )}
      </div>

      {/* Card 3: Exercises Grid */}
      {selectedDay === "Sunday" ? (
        <div className="admin-sunday-rest-box">
          <div className="admin-sunday-icon-wrap">
            <FiSun />
          </div>
          <h3>Recovery &amp; Rest Day</h3>
          <p>
            Sunday is configured as an athlete recovery period. Muscle repair,
            sleep, and optimal nutrition occur on this day with zero gym training
            assigned.
          </p>
        </div>
      ) : (
        <div className="admin-exercises-grid">
          {currentDayData.exercises && currentDayData.exercises.length > 0 ? (
            currentDayData.exercises.map((ex) => (
              <div key={ex.id} className="admin-exercise-card">
                {/* Thumbnail Container */}
                <div className="admin-exercise-img-wrap">
                  <img src={ex.image} alt={ex.name} />
                  <span className="admin-demo-badge">DEMO VIDEO</span>
                  <div className="admin-demo-play-overlay">
                    <FiPlay />
                  </div>
                </div>

                {/* Card Content */}
                <div className="admin-exercise-card-content">
                  <h4>{ex.name}</h4>

                  <div className="admin-exercise-metrics-row">
                    <div className="admin-metric-box">
                      <span className="metric-lbl">Sets</span>
                      <span className="metric-val">{ex.sets}</span>
                    </div>
                    <div className="admin-metric-box">
                      <span className="metric-lbl">Reps</span>
                      <span className="metric-val">{ex.reps}</span>
                    </div>
                  </div>

                  <div className="admin-exercise-card-actions">
                    <button
                      type="button"
                      className="admin-card-action-btn edit"
                      onClick={() =>
                        setExerciseModal({
                          mode: "edit",
                          data: { ...ex },
                        })
                      }
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      type="button"
                      className="admin-card-action-btn delete"
                      onClick={() => handleDeleteExercise(ex.id)}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="admin-no-exercises-card">
              <FiActivity />
              <p>No exercises added for {selectedDay} yet.</p>
              <button
                type="button"
                className="admin-add-exercise-btn"
                onClick={() =>
                  setExerciseModal({
                    mode: "add",
                    data: {
                      name: "",
                      sets: "3",
                      reps: "10 - 12 Reps",
                      image: "",
                    },
                  })
                }
              >
                <FiPlus /> Add First Exercise
              </button>
            </div>
          )}
        </div>
      )}

      {/* ASSIGN SCHEDULE MODAL */}
      {isAssignModalOpen && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setIsAssignModalOpen(false)}
        >
          <div
            className="admin-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-top">
              <div className="admin-modal-title-wrap">
                <h2>Assign Schedule to Members</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setIsAssignModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: 0 }}>
                This will synchronize the current{" "}
                <strong style={{ color: "#c5ff16" }}>{selectedGoal}</strong>{" "}
                weekly training schedule to all active members enrolled with
                this fitness goal.
              </p>

              <div
                style={{
                  background: "#090c0a",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Selected Goal:
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginTop: "2px",
                  }}
                >
                  {selectedGoal}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    marginTop: "12px",
                  }}
                >
                  Days Configured:
                </div>
                <div style={{ fontSize: "13px", color: "#ffffff", marginTop: "2px" }}>
                  Monday through Saturday + Sunday Rest Day
                </div>
              </div>
            </div>

            <div className="admin-modal-foot">
              <button
                type="button"
                className="admin-modal-secondary-btn"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-modal-primary-btn"
                onClick={handleAssignToMembers}
              >
                <FiCheck /> Confirm &amp; Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT EXERCISE MODAL */}
      {exerciseModal && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setExerciseModal(null)}
        >
          <div
            className="admin-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-top">
              <div className="admin-modal-title-wrap">
                <h2>
                  {exerciseModal.mode === "add"
                    ? `Add Exercise to ${selectedDay}`
                    : "Edit Exercise"}
                </h2>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setExerciseModal(null)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveExerciseModal}>
              <div className="admin-modal-body">
                <div
                  className="admin-modal-edit-fields"
                  style={{ gridTemplateColumns: "1fr" }}
                >
                  <div className="admin-edit-field">
                    <label>Exercise Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Flat Barbell Bench Press"
                      value={exerciseModal.data.name}
                      onChange={(e) =>
                        setExerciseModal({
                          ...exerciseModal,
                          data: { ...exerciseModal.data, name: e.target.value },
                        })
                      }
                      required
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <div className="admin-edit-field">
                      <label>Sets</label>
                      <input
                        type="text"
                        placeholder="3"
                        value={exerciseModal.data.sets}
                        onChange={(e) =>
                          setExerciseModal({
                            ...exerciseModal,
                            data: {
                              ...exerciseModal.data,
                              sets: e.target.value,
                            },
                          })
                        }
                        required
                      />
                    </div>
                    <div className="admin-edit-field">
                      <label>Reps / Duration</label>
                      <input
                        type="text"
                        placeholder="10 - 12 Reps"
                        value={exerciseModal.data.reps}
                        onChange={(e) =>
                          setExerciseModal({
                            ...exerciseModal,
                            data: {
                              ...exerciseModal.data,
                              reps: e.target.value,
                            },
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-edit-field">
                    <label>Demo Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={exerciseModal.data.image}
                      onChange={(e) =>
                        setExerciseModal({
                          ...exerciseModal,
                          data: {
                            ...exerciseModal.data,
                            image: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  className="admin-modal-secondary-btn"
                  onClick={() => setExerciseModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-primary-btn">
                  <FiCheck />
                  {exerciseModal.mode === "add"
                    ? "Add to Day"
                    : "Save Exercise"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminWorkouts;
