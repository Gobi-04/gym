import { useState } from "react";
import { FiCheck, FiArrowRight, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/FitnessOnboarding.css";

const fitnessGoals = [
  {
    id: "fat-loss",
    title: "FAT LOSS",
    category: "METABOLIC & CONDITIONING",
    description: "Focus on improving fitness and reducing body fat.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "strength",
    title: "STRENGTH TRAINING",
    category: "POWER & COMPOUND LIFTS",
    description: "Focus on developing strength and performance.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "muscle-building",
    title: "MUSCLE BUILDING",
    category: "POWER & COMPOUND LIFTS",
    description: "Focus on developing strength and performance.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  },
];

function FitnessOnboarding() {
  const [selectedGoal, setSelectedGoal] = useState("muscle-building");
  const [diet, setDiet] = useState(() => localStorage.getItem("fitguide-diet") || "");
  const navigate = useNavigate();

  const handleDietChange = (value) => {
    setDiet(value);
    localStorage.setItem("fitguide-diet", value);
  };

  return (
    <main className="fitness-onboarding">
      <div className="onboarding-brand" aria-label="FitGuide">
        <FiActivity />
        <span>FITGUIDE</span>
      </div>

      <header className="onboarding-heading">
        <h1>LET’S BUILD YOUR <span>FITNESS JOURNEY</span></h1>
        <p>Choose your fitness goal so we can show you a workout and diet plan that matches your preferences.</p>
      </header>

      <section className="goal-grid" aria-label="Choose your fitness goal">
        {fitnessGoals.map((goal) => (
          <button
            className={`goal-card ${selectedGoal === goal.id ? "goal-selected" : ""}`}
            key={goal.id}
            type="button"
            aria-pressed={selectedGoal === goal.id}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <div className="goal-image-wrap">
              <img src={goal.image} alt="" />
              <span className="goal-check" aria-hidden="true">
                {selectedGoal === goal.id && <FiCheck />}
              </span>
              <span className="goal-category">{goal.category}</span>
            </div>
            <span className="goal-copy">
              <strong>{goal.title}</strong>
              <span>{goal.description}</span>
              <small>{selectedGoal === goal.id ? "Selected" : "Click to Select"}</small>
            </span>
          </button>
        ))}
      </section>

      <fieldset className="diet-section">
        <legend><FiActivity /> Dietary Preference &amp; Nutrition Profile</legend>
        <div className="diet-options">
          <label className={diet === "non-vegetarian" ? "diet-selected" : ""}>
            <input
              type="radio"
              name="diet"
              value="non-vegetarian"
              checked={diet === "non-vegetarian"}
              onChange={() => handleDietChange("non-vegetarian")}
            />
            <span><strong>Non-Vegetarian</strong><small>Chicken, Eggs, Fish, Paneer &amp; Dal</small></span>
          </label>
          <label className={diet === "vegetarian" ? "diet-selected" : ""}>
            <input
              type="radio"
              name="diet"
              value="vegetarian"
              checked={diet === "vegetarian"}
              onChange={() => handleDietChange("vegetarian")}
            />
            <span><strong>Vegetarian</strong><small>Paneer, Dal, Soya Chunks, Legumes</small></span>
          </label>
        </div>
      </fieldset>

      <footer className="onboarding-footer">
        <p>Your goal can be updated anytime from your profile settings.</p>
        <button type="button" disabled={!selectedGoal || !diet} onClick={() => navigate("/dashboard")}>
          CONTINUE TO DASHBOARD <FiArrowRight />
        </button>
      </footer>
    </main>
  );
}

export default FitnessOnboarding;