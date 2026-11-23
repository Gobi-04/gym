import React from "react";
import {
  FiArrowLeft,
  FiPlay,
  FiActivity,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import "../styles/MemberDashboard.css";

function WorkoutDetail({ workout, onBack, completed, onToggleComplete }) {
  if (!workout) return null;

  const isCompleted = completed.includes(workout.id);

  return (
    <section className="workout-detail">
      <button className="back-button" onClick={onBack}>
        <FiArrowLeft />
        Back to My Workouts
      </button>

      <div className="detail-heading">
        <div>
          <span className="section-label">
            WORKOUT GUIDE / EXERCISE DETAILS
          </span>
          <h1>{workout.title}</h1>
          <p>{workout.description}</p>
        </div>

        <span className="muscle-badge">{workout.muscle}</span>
      </div>

      <div className="detail-grid">
        {/* VIDEO / IMAGE CARD */}
        <div className="detail-image-card">
          <div className="detail-image">
            <img src={workout.image} alt={workout.title} />

            <button className="detail-play-button">
              <FiPlay />
            </button>

            <span className="demo-label">EXERCISE DEMO</span>
          </div>

          <div className="detail-stats">
            <div>
              <FiActivity />
              <span>Sets</span>
              <strong>{workout.sets}</strong>
            </div>

            <div>
              <FiCheckCircle />
              <span>Reps</span>
              <strong>{workout.reps}</strong>
            </div>

            <div>
              <FiClock />
              <span>Duration</span>
              <strong>{workout.duration}</strong>
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="instruction-card">
          <span className="section-label">WORKOUT GUIDE</span>
          <h2>How to Perform</h2>

          <div className="instruction-list">
            {workout.steps.map((step, index) => (
              <div className="instruction-item" key={index}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <button
            className={
              isCompleted
                ? "complete-button completed"
                : "complete-button"
            }
            onClick={() => onToggleComplete(workout.id)}
          >
            <FiCheckCircle />
            {isCompleted ? "Workout Completed" : "Mark as Completed"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default WorkoutDetail;
