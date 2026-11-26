import React, { useState } from "react";
import {
  FiUsers,
  FiEdit2,
  FiSave,
  FiPlus,
  FiTrash2,
  FiX,
  FiCheck,
  FiDroplet,
} from "react-icons/fi";
import "../../styles/AdminDiet.css";

/* ─────────────────────────────────────────────
   INITIAL DATA
───────────────────────────────────────────── */
const FITNESS_GOALS = ["Fat Loss", "Strength Training", "Muscle Building", "Weight Loss"];
const DIET_TYPES    = ["Non-Vegetarian", "Vegetarian"];
const DAYS          = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_TYPES    = ["Breakfast", "Lunch", "Dinner", "Snack"];

const hydrationDefaults = {
  "Fat Loss": {
    "Non-Vegetarian": "3.5 – 4.0 Liters daily (500ml warm water upon waking + 500ml pre-workout with electrolytes).",
    Vegetarian:       "3.0 – 3.5 Liters daily (500ml warm water upon waking + coconut water post-workout).",
  },
  "Strength Training": {
    "Non-Vegetarian": "4.0 – 5.0 Liters daily (pre/intra/post-workout hydration with BCAA electrolytes).",
    Vegetarian:       "3.5 – 4.5 Liters daily (hydration with plant-based electrolytes and coconut water).",
  },
  "Muscle Building": {
    "Non-Vegetarian": "3.5 – 4.5 Liters daily (1 Liter pre-workout + 500ml with creatine post-workout).",
    Vegetarian:       "3.0 – 4.0 Liters daily (500ml warm water morning + 500ml lemon electrolyte post-workout).",
  },
  "Weight Loss": {
    "Non-Vegetarian": "3.0 – 4.0 Liters daily (500ml before every meal to reduce appetite).",
    Vegetarian:       "3.0 – 3.5 Liters daily (infused water with lemon & mint throughout the day).",
  },
};

const initialMeals = {
  "Fat Loss": {
    "Non-Vegetarian": {
      Mon: [
        { id: "fl-nv-mon-1", type: "Breakfast", time: "08:00 AM", protein: "28g Protein", name: "Egg White & Spinach Omelette with Multigrain Toast", portion: "Portion: 4 egg whites + 1 whole egg, 1 cup spinach, 1 slice toasted multigrain bread.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80" },
        { id: "fl-nv-mon-2", type: "Lunch",     time: "01:15 PM", protein: "42g Protein", name: "Grilled Herb Chicken Breast & Quinoa Salad Bowl",   portion: "Portion: 160g grilled chicken breast, 100g cooked quinoa, 150g charred greens.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" },
        { id: "fl-nv-mon-3", type: "Dinner",    time: "07:30 PM", protein: "35g Protein", name: "Baked Salmon with Steamed Broccoli & Brown Rice",   portion: "Portion: 150g salmon fillet, 1 cup brown rice, 200g broccoli florets.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=80" },
      ],
      Tue: [
        { id: "fl-nv-tue-1", type: "Breakfast", time: "08:00 AM", protein: "24g Protein", name: "Scrambled Eggs with Avocado Toast", portion: "Portion: 3 eggs, 1 slice whole wheat toast, half avocado.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80" },
        { id: "fl-nv-tue-2", type: "Lunch",     time: "01:00 PM", protein: "38g Protein", name: "Tuna Salad with Mixed Greens",                      portion: "Portion: 150g canned tuna, 100g mixed greens, olive oil dressing.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" },
      ],
    },
    Vegetarian: {
      Mon: [
        { id: "fl-v-mon-1", type: "Breakfast", time: "08:00 AM", protein: "22g Protein", name: "Paneer Bhurji with Whole Wheat Roti",    portion: "Portion: 100g paneer, 2 rotis, 1 cup veggies.",                           image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80" },
        { id: "fl-v-mon-2", type: "Lunch",     time: "01:00 PM", protein: "28g Protein", name: "Soya Chunks & Brown Rice Bowl",         portion: "Portion: 1 cup soya chunks, 1 cup brown rice, dal.",                     image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80" },
        { id: "fl-v-mon-3", type: "Dinner",    time: "07:30 PM", protein: "20g Protein", name: "Tofu Stir-Fry with Quinoa",             portion: "Portion: 150g tofu, 1 cup quinoa, mixed vegetables.",                    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80" },
      ],
    },
  },
  "Muscle Building": {
    "Non-Vegetarian": {
      Mon: [
        { id: "mb-nv-mon-1", type: "Breakfast", time: "08:00 AM", protein: "36g Protein", name: "Chicken & Egg Power Breakfast",        portion: "Portion: 3 whole eggs + 4 egg whites + 2 whole wheat toast.",            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80" },
        { id: "mb-nv-mon-2", type: "Lunch",     time: "12:30 PM", protein: "45g Protein", name: "Chicken Rice Bowl",                   portion: "Portion: 150g grilled chicken + 1 cup steamed rice + dal.",              image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80" },
        { id: "mb-nv-mon-3", type: "Dinner",    time: "07:00 PM", protein: "40g Protein", name: "Salmon & Quinoa Plate",               portion: "Portion: 150g salmon + quinoa + roasted veggies.",                       image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=80" },
      ],
    },
    Vegetarian: {
      Mon: [
        { id: "mb-v-mon-1", type: "Breakfast", time: "08:00 AM", protein: "24g Protein", name: "Paneer Oats Bowl",                     portion: "Portion: Oats + Paneer + Chia Seeds + Banana.",                         image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80" },
        { id: "mb-v-mon-2", type: "Lunch",     time: "12:30 PM", protein: "30g Protein", name: "Soya Chunks Rice Bowl",                portion: "Portion: 1 cup soya chunks + brown rice + lentils.",                     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" },
        { id: "mb-v-mon-3", type: "Dinner",    time: "07:00 PM", protein: "26g Protein", name: "Tofu & Veggie Stir-Fry",              portion: "Portion: Tofu + mixed veggies + quinoa + olive oil.",                    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80" },
      ],
    },
  },
  "Strength Training": {
    "Non-Vegetarian": {
      Mon: [
        { id: "st-nv-mon-1", type: "Breakfast", time: "07:30 AM", protein: "40g Protein", name: "High-Protein Omelette & Sweet Potato", portion: "Portion: 5 eggs, 1 medium sweet potato, spinach.",                       image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80" },
        { id: "st-nv-mon-2", type: "Lunch",     time: "01:00 PM", protein: "50g Protein", name: "Beef & Rice Performance Bowl",         portion: "Portion: 180g lean beef, 1.5 cups rice, greens.",                       image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" },
      ],
    },
    Vegetarian: {
      Mon: [
        { id: "st-v-mon-1", type: "Breakfast", time: "07:30 AM", protein: "32g Protein", name: "Greek Yogurt Parfait with Nuts",       portion: "Portion: 200g Greek yogurt, mixed nuts, 1 banana.",                     image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80" },
        { id: "st-v-mon-2", type: "Lunch",     time: "01:00 PM", protein: "35g Protein", name: "Chickpea & Paneer Masala Rice",        portion: "Portion: 1 cup chickpeas, 100g paneer, 1 cup brown rice.",              image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80" },
      ],
    },
  },
  "Weight Loss": {
    "Non-Vegetarian": {
      Mon: [
        { id: "wl-nv-mon-1", type: "Breakfast", time: "08:00 AM", protein: "20g Protein", name: "Boiled Eggs with Fruit Bowl",          portion: "Portion: 2 boiled eggs, 1 cup mixed fruits.",                           image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80" },
        { id: "wl-nv-mon-2", type: "Lunch",     time: "01:00 PM", protein: "30g Protein", name: "Grilled Chicken Salad",                portion: "Portion: 120g chicken, 200g salad, light dressing.",                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" },
      ],
    },
    Vegetarian: {
      Mon: [
        { id: "wl-v-mon-1", type: "Breakfast", time: "08:00 AM", protein: "15g Protein", name: "Oats with Chia Seeds & Berries",       portion: "Portion: 1 cup oats, 2 tbsp chia seeds, 1 cup berries.",               image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80" },
        { id: "wl-v-mon-2", type: "Lunch",     time: "01:00 PM", protein: "22g Protein", name: "Dal Soup with Vegetable Khichdi",      portion: "Portion: 1 cup dal, 1 cup vegetable khichdi.",                          image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80" },
      ],
    },
  },
};

/* ─────────────────────────────────────────────
   EDIT MEAL MODAL
───────────────────────────────────────────── */
function EditMealModal({ meal, onSave, onClose }) {
  const [form, setForm] = useState({ ...meal });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="adiet-modal-backdrop" onClick={onClose}>
      <div className="adiet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adiet-modal-header">
          <h3>Edit {meal.type}</h3>
          <button className="adiet-modal-close" onClick={onClose}><FiX /></button>
        </div>
        <div className="adiet-modal-body">
          <label>Meal Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          <label>Time</label>
          <input name="time" value={form.time} onChange={handleChange} placeholder="08:00 AM" />
          <label>Protein</label>
          <input name="protein" value={form.protein} onChange={handleChange} placeholder="28g Protein" />
          <label>Portion / Description</label>
          <textarea name="portion" value={form.portion} onChange={handleChange} rows={3} />
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} />
          {form.image && <img src={form.image} alt="preview" className="adiet-img-preview" />}
        </div>
        <div className="adiet-modal-footer">
          <button className="adiet-btn-cancel" onClick={onClose}><FiX /> Cancel</button>
          <button className="adiet-btn-save" onClick={() => onSave(form)}><FiCheck /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADD MEAL MODAL
───────────────────────────────────────────── */
function AddMealModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    type: "Breakfast", time: "", protein: "", name: "", portion: "", image: "",
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="adiet-modal-backdrop" onClick={onClose}>
      <div className="adiet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adiet-modal-header">
          <h3>Add New Meal</h3>
          <button className="adiet-modal-close" onClick={onClose}><FiX /></button>
        </div>
        <div className="adiet-modal-body">
          <label>Meal Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {MEAL_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <label>Meal Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Chicken Rice Bowl" />
          <label>Time</label>
          <input name="time" value={form.time} onChange={handleChange} placeholder="08:00 AM" />
          <label>Protein</label>
          <input name="protein" value={form.protein} onChange={handleChange} placeholder="28g Protein" />
          <label>Portion / Description</label>
          <textarea name="portion" value={form.portion} onChange={handleChange} rows={3} />
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} />
          {form.image && <img src={form.image} alt="preview" className="adiet-img-preview" />}
        </div>
        <div className="adiet-modal-footer">
          <button className="adiet-btn-cancel" onClick={onClose}><FiX /> Cancel</button>
          <button className="adiet-btn-save" onClick={() => onSave(form)}><FiCheck /> Add Meal</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function AdminDiet() {
  const [activeGoal, setActiveGoal]   = useState("Fat Loss");
  const [activeDiet, setActiveDiet]   = useState("Non-Vegetarian");
  const [activeDay,  setActiveDay]    = useState("Mon");
  const [meals, setMeals]             = useState(initialMeals);
  const [hydration, setHydration]     = useState(hydrationDefaults);
  const [hydrationEdit, setHydrationEdit] = useState(false);
  const [hydrationTemp, setHydrationTemp] = useState("");
  const [editingMeal, setEditingMeal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [savedMsg, setSavedMsg]       = useState("");

  /* helpers */
  const currentMeals = () => {
    return meals?.[activeGoal]?.[activeDiet]?.[activeDay] || [];
  };

  const currentHydration = () =>
    hydration?.[activeGoal]?.[activeDiet] ||
    "3.0 – 3.5 Liters daily (500ml warm water upon waking).";

  const showSaved = (msg) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  };

  /* edit meal */
  const handleEditSave = (updated) => {
    setMeals((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const list = copy[activeGoal]?.[activeDiet]?.[activeDay] || [];
      const idx  = list.findIndex((m) => m.id === updated.id);
      if (idx !== -1) list[idx] = updated;
      if (!copy[activeGoal]) copy[activeGoal] = {};
      if (!copy[activeGoal][activeDiet]) copy[activeGoal][activeDiet] = {};
      copy[activeGoal][activeDiet][activeDay] = list;
      return copy;
    });
    setEditingMeal(null);
    showSaved("Meal updated!");
  };

  /* add meal */
  const handleAddSave = (form) => {
    const newMeal = {
      ...form,
      id: `custom-${Date.now()}`,
    };
    setMeals((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[activeGoal]) copy[activeGoal] = {};
      if (!copy[activeGoal][activeDiet]) copy[activeGoal][activeDiet] = {};
      if (!copy[activeGoal][activeDiet][activeDay]) copy[activeGoal][activeDiet][activeDay] = [];
      copy[activeGoal][activeDiet][activeDay].push(newMeal);
      return copy;
    });
    setShowAddModal(false);
    showSaved("New meal added!");
  };

  /* delete meal */
  const handleDelete = (id) => {
    setMeals((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const list = copy[activeGoal]?.[activeDiet]?.[activeDay] || [];
      copy[activeGoal][activeDiet][activeDay] = list.filter((m) => m.id !== id);
      return copy;
    });
    showSaved("Meal removed.");
  };

  /* save hydration */
  const handleSaveHydration = () => {
    setHydration((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[activeGoal]) copy[activeGoal] = {};
      copy[activeGoal][activeDiet] = hydrationTemp;
      return copy;
    });
    setHydrationEdit(false);
    showSaved("Hydration saved!");
  };

  /* ─── RENDER ─── */
  return (
    <div className="adiet-root">

      {/* ── PAGE HEADER ── */}
      <div className="adiet-page-header">
        <div>
          <h1 className="adiet-page-title">Diet Plan Management</h1>
          <p className="adiet-page-sub">
            Personalize meals, portions, timing, protein targets, and hydration guidance by fitness goal and dietary preference.
          </p>
        </div>
        <button className="adiet-assign-btn">
          <FiUsers /> Assign Meal Plan to Members
        </button>
      </div>

      {/* ── FILTER ROW ── */}
      <div className="adiet-filter-card">
        <div className="adiet-filter-group">
          <span className="adiet-filter-label">Fitness Goal</span>
          <div className="adiet-filter-tabs">
            {FITNESS_GOALS.map((g) => (
              <button
                key={g}
                className={activeGoal === g ? "adiet-tab active" : "adiet-tab"}
                onClick={() => { setActiveGoal(g); setActiveDay("Mon"); }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="adiet-filter-group">
          <span className="adiet-filter-label">Dietary Preference</span>
          <div className="adiet-filter-tabs">
            {DIET_TYPES.map((d) => (
              <button
                key={d}
                className={activeDiet === d ? "adiet-tab active" : "adiet-tab"}
                onClick={() => { setActiveDiet(d); setActiveDay("Mon"); }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DAY SELECTOR ── */}
      <div className="adiet-day-row">
        {DAYS.map((d) => (
          <button
            key={d}
            className={activeDay === d ? "adiet-day active" : "adiet-day"}
            onClick={() => setActiveDay(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ── HYDRATION RECOMMENDATION ── */}
      <div className="adiet-hydration-card">
        <div className="adiet-hydration-left">
          <span className="adiet-hydration-label">
            <FiDroplet className="adiet-drop-icon" />
            Hydration Recommendation ({activeGoal} · {activeDiet})
          </span>
          {hydrationEdit ? (
            <input
              className="adiet-hydration-input"
              value={hydrationTemp}
              onChange={(e) => setHydrationTemp(e.target.value)}
              autoFocus
            />
          ) : (
            <p className="adiet-hydration-text">{currentHydration()}</p>
          )}
        </div>
        {hydrationEdit ? (
          <div className="adiet-hydration-actions">
            <button className="adiet-btn-cancel sm" onClick={() => setHydrationEdit(false)}><FiX /></button>
            <button className="adiet-btn-save sm" onClick={handleSaveHydration}><FiSave /> Save Hydration</button>
          </div>
        ) : (
          <button
            className="adiet-hydration-edit-btn"
            onClick={() => { setHydrationEdit(true); setHydrationTemp(currentHydration()); }}
          >
            <FiEdit2 /> Edit
          </button>
        )}
      </div>

      {/* ── SUCCESS TOAST ── */}
      {savedMsg && (
        <div className="adiet-toast">
          <FiCheck /> {savedMsg}
        </div>
      )}

      {/* ── MEAL GRID ── */}
      {currentMeals().length === 0 ? (
        <div className="adiet-empty">
          <p>No meals added for {activeGoal} · {activeDiet} · {activeDay}.</p>
          <button className="adiet-add-first-btn" onClick={() => setShowAddModal(true)}>
            <FiPlus /> Add First Meal
          </button>
        </div>
      ) : (
        <div className="adiet-meal-grid">
          {currentMeals().map((meal, idx) => (
            <div className="adiet-meal-card" key={meal.id}>

              {/* Card Header */}
              <div className="adiet-meal-card-header">
                <span className="adiet-meal-num">{idx + 1}. {meal.type}</span>
                <div className="adiet-meal-actions">
                  <button className="adiet-edit-btn" onClick={() => setEditingMeal(meal)}>
                    <FiEdit2 /> Edit
                  </button>
                  <button className="adiet-delete-btn" onClick={() => handleDelete(meal.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="adiet-meal-body">
                {meal.image && (
                  <img src={meal.image} alt={meal.name} className="adiet-meal-img" />
                )}
                <div className="adiet-meal-info">
                  <div className="adiet-meal-meta">
                    <span className="adiet-meal-time">{meal.time}</span>
                    <span className="adiet-protein-badge">{meal.protein}</span>
                  </div>
                  <h3 className="adiet-meal-name">{meal.name}</h3>
                  <p className="adiet-meal-portion">{meal.portion}</p>
                </div>
              </div>

            </div>
          ))}

          {/* Add Meal Card */}
          <div className="adiet-add-card" onClick={() => setShowAddModal(true)}>
            <FiPlus className="adiet-add-icon" />
            <span>Add Meal</span>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {editingMeal && (
        <EditMealModal
          meal={editingMeal}
          onSave={handleEditSave}
          onClose={() => setEditingMeal(null)}
        />
      )}
      {showAddModal && (
        <AddMealModal
          onSave={handleAddSave}
          onClose={() => setShowAddModal(false)}
        />
      )}

    </div>
  );
}
