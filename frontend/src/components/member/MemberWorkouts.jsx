import React from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiPlay,
} from "react-icons/fi";
import { VideoPlayer, HoverPreview } from "./dashboardHelpers";

export default function MemberWorkouts({
  workouts,
  days,
  activeDay,
  setActiveDay,
  selectedWorkout,
  setSelectedWorkout,
  playingId,
  setPlayingId,
  hoverId,
  setHoverId,
  detailPlaying,
  setDetailPlaying,
  completed,
  toggleComplete,
}) {
  const openWorkout = (workout) => {
    setSelectedWorkout(workout);
    setDetailPlaying(false);
    setHoverId(null);
  };

  const goBack = () => {
    setSelectedWorkout(null);
    setDetailPlaying(false);
  };

  /* ---------- WORKOUT DETAIL VIEW ---------- */
  if (selectedWorkout) {
    return (
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
          <span className="muscle-badge">{selectedWorkout.muscle}</span>
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
                  <span className="demo-label">EXERCISE DEMO</span>
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
            <span className="section-label">WORKOUT GUIDE</span>
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
    );
  }

  /* ---------- WORKOUT LIST VIEW ---------- */
  return (
    <section className="workout-content">
      <span className="section-label">ASSIGNED TRAINING SCHEDULE</span>
      <h1>MY WEEKLY WORKOUTS</h1>
      <p className="workout-description">
        Assigned strictly by your trainer. Follow sets, reps, and video
        technique cues.
      </p>

      {/* WEEKLY DAYS */}
      <div className="weekly-schedule">
        {days.map(([day, label]) => (
          <button
            key={day}
            className={
              activeDay === day ? "day-card active-day" : "day-card"
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
            : `${workouts.length} Exercises Assigned`}
        </span>
      </div>

      {/* EXERCISE CARDS */}
      {activeDay === "Sun" ? (
        <div className="rest-message">
          <FiCoffee />
          <h2>Sunday is Rest &amp; Recovery Day</h2>
          <p>
            No workout videos or exercises scheduled today. Focus on
            hydration, light stretching, and complete muscle recovery.
          </p>
        </div>
      ) : (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <div className="exercise-card" key={workout.id}>
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
                    <img src={workout.image} alt={workout.title} />
                    {hoverId === workout.id && (
                      <HoverPreview
                        url={workout.videoUrl}
                        title={workout.title}
                      />
                    )}
                    <span className="demo-label">DEMO VIDEO</span>
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
  );
}
