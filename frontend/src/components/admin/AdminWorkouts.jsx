import React from "react";
import "../../styles/AdminPortal.css";

function AdminWorkouts() {
  return (
    <div className="admin-panel">
      <h3>Workout Management</h3>
      <p className="admin-panel-sub">
        Assign and manage weekly training schedules across all members.
      </p>
      <div className="admin-tier-rows">
        <div className="admin-tier-row">
          <div>
            <div className="admin-tier-name">Chest &amp; Triceps Hypertrophy</div>
            <div className="admin-tier-price">
              6 Exercises (Flat Bench, Incline DB, Cable Fly, Dips)
            </div>
          </div>
          <button className="admin-action-link">Edit Routine</button>
        </div>
        <div className="admin-tier-row">
          <div>
            <div className="admin-tier-name">Back &amp; Biceps Power</div>
            <div className="admin-tier-price">
              6 Exercises (Deadlift, Lat Pulldowns, Barbell Rows)
            </div>
          </div>
          <button className="admin-action-link">Edit Routine</button>
        </div>
      </div>
    </div>
  );
}

export default AdminWorkouts;
