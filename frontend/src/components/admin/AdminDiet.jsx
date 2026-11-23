import React from "react";
import "../../styles/AdminPortal.css";

function AdminDiet() {
  return (
    <div className="admin-panel">
      <h3>Diet Plan Management</h3>
      <p className="admin-panel-sub">
        Custom nutritional plans for Muscle Building &amp; Fat Loss.
      </p>
      <div className="admin-tier-rows">
        <div className="admin-tier-row">
          <div>
            <div className="admin-tier-name">
              Non-Vegetarian High Protein Fuel
            </div>
            <div className="admin-tier-price">
              3 Meals (Chicken Rice Bowl, Salmon Quinoa, Egg Toast)
            </div>
          </div>
          <button className="admin-action-link">Edit Diet</button>
        </div>
        <div className="admin-tier-row">
          <div>
            <div className="admin-tier-name">
              Vegetarian Plant Power Recovery
            </div>
            <div className="admin-tier-price">
              3 Meals (Paneer Oats, Soya Bowl, Tofu Stir-fry)
            </div>
          </div>
          <button className="admin-action-link">Edit Diet</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDiet;
