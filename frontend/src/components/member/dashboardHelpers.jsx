// Shared helpers used by all MemberDashboard section components

/* ---------- VIDEO HELPERS ---------- */
export const getEmbedUrl = (url, { muted = false } = {}) => {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  if (!yt) return null;
  const id = yt[1];
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${
    muted ? `&mute=1&controls=0&loop=1&playlist=${id}` : ""
  }`;
};

export function VideoPlayer({ url, title }) {
  const embed = getEmbedUrl(url);
  return embed ? (
    <iframe
      src={embed}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video src={url} controls autoPlay />
  );
}

export function HoverPreview({ url, title }) {
  const embed = getEmbedUrl(url, { muted: true });
  return embed ? (
    <iframe
      className="hover-preview"
      src={embed}
      title={title}
      allow="autoplay; encrypted-media"
    />
  ) : (
    <video
      className="hover-preview"
      src={url}
      muted
      loop
      autoPlay
      playsInline
    />
  );
}

export const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const dietPlanData = {
  "non-vegetarian": {
    label: "Non-Vegetarian",
    focus: "Chest & Triceps Hypertrophy",
    description: "High-protein meals designed to build muscle and recover faster.",
    meals: [
      {
        id: 1,
        time: "08:00 AM - 8:30 AM",
        mealType: "Breakfast",
        title: "Chicken & Egg Power Breakfast",
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
    description: "Balanced vegetarian meals with protein-rich ingredients for strength and energy.",
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

export const workoutsData = [
  {
    id: 1,
    title: "Flat Barbell Bench Press",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
    videoUrl: "/videos/bench-press.mp4",
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
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900",
    videoUrl: "/videos/incline-press.mp4",
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
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
    videoUrl: "/videos/cable-fly.mp4",
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
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900",
    videoUrl: "/videos/shoulder-press.mp4",
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
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900",
    videoUrl: "/videos/triceps-pushdown.mp4",
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
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900",
    videoUrl: "/videos/dips.mp4",
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

export const days = [
  ["Mon", "Day 01"],
  ["Tue", "Day 02"],
  ["Wed", "Day 03"],
  ["Thu", "Day 04"],
  ["Fri", "Day 05"],
  ["Sat", "Day 06"],
  ["Sun", "Rest"],
];
