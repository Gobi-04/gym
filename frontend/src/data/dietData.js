// 5-Meal Comprehensive Daily Athletic Diet Plan
// Covering Monday to Sunday for Bulking, Weight Loss, and Strength (Non-Veg & Veg)

export const dietPlanData = {
  bulking: {
    "non-vegetarian": {
      label: "Non-Vegetarian",
      focus: "High-Calorie Hypertrophy & Progressive Muscle Building",
      description: "Structured surplus with high bio-available animal proteins, complex carbs, and dedicated pre/post workout energy windows.",
      weeklyFocus: {
        Mon: "High Glycogen Push Day: Heavy Chest & Triceps Fuel",
        Tue: "Dense Protein Pull Day: Back & Biceps Hypertrophy",
        Wed: "Leg Day Surge: Maximum Calorie & Carb Delivery",
        Thu: "Shoulder Conditioning: Upper Body Volume Recovery",
        Fri: "Arm & Core Hypertrophy: Peak Blood Flow Nutrition",
        Sat: "Full Body Heavy Compound: Maximum Caloric Density",
        Sun: "Systemic Rest & Muscular Glycogen Replenishment"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Chicken Sausage & 4-Egg Scramble with Oats",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Calorie & Protein",
            nutrients: "4 Whole Eggs + 2 Slices Wholewheat Toast + 1 Cup Rolled Oats with Honey",
            calories: "680 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Chicken Breast with Brown Rice & Dal",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Hypertrophy Fuel",
            nutrients: "200g Chicken Breast + 1.5 Cups Brown Rice + Steamed Broccoli + Tadka Dal",
            calories: "760 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Peanut Butter Rice Cakes & Banana Fuel",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Glycogen Surge",
            nutrients: "3 Rice Cakes + 2 tbsp Natural Peanut Butter + 1 Ripe Banana + Black Coffee",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Recovery & 4 Boiled Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Anabolic Muscle Synthesis",
            nutrients: "1 Scoop Whey Isolate + 300ml Skim Milk + 4 Boiled Egg Whites + 1 Medjool Date",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Pan-Seared Salmon Fillet with Roasted Sweet Potato",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Healthy Fats & Slow Carbs",
            nutrients: "180g Salmon + 1 Large Baked Sweet Potato + Asparagus + Extra Virgin Olive Oil",
            calories: "700 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Turkey & Cheddar Omelet with Avocado Toast",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Protein Morning",
            nutrients: "3 Whole Eggs + 60g Turkey Ham + 1/2 Avocado on Sourdough + Fresh Orange Juice",
            calories: "650 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Lean Minced Chicken Bowl with Basmati Rice",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Hypertrophy Fuel",
            nutrients: "220g Chicken Keema + 1.5 Cups Steamed Basmati + Cucumber Tomato Salad",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Oatmeal Energy Bowl with Blueberries & Honey",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Carb Release",
            nutrients: "60g Rolled Oats + 1 tbsp Honey + Handful Fresh Blueberries + Double Espresso",
            calories: "320 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Hydrolyzed Whey Shake & Jam Toast",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Muscle Glycogen Load",
            nutrients: "1.5 Scoops Whey Protein + 2 Slices White Toast with Fruit Jam",
            calories: "430 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Chicken Thighs with Quinoa & Steamed Greens",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Recovery Meal",
            nutrients: "200g Skinless Chicken Thighs + 1 Cup Cooked Quinoa + Sauteed Zucchini",
            calories: "690 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Fluffy Protein Pancakes with Maple Syrup & Eggs",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Leg Day Carb Loading",
            nutrients: "3 Oat Flour Protein Pancakes + 2 Boiled Eggs + 1 tbsp Pure Maple Syrup",
            calories: "670 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Steak Strips & Roasted Sweet Potato Power Bowl",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Maximum Density",
            nutrients: "180g Lean Tenderloin / Chicken + 250g Sweet Potato Wedges + Sauteed Beans",
            calories: "770 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Sourdough Toast with Honey & Sliced Banana",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Glycemic Carb Pre-load",
            nutrients: "2 Sourdough Slices + 1 tbsp Honey + 1 Banana + Black Coffee",
            calories: "350 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Mass Gainer Protein Shake with Skim Milk",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deep Quad & Hamstring Recovery",
            nutrients: "1 Serving Lean Mass Shake + 350ml Milk + 5g Creatine Monohydrate",
            calories: "450 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Baked White Fish with Jasmine Rice & Broccoli",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Lean Rebuild",
            nutrients: "220g Basa/Cod Fillet + 1.5 Cups Jasmine Rice + Garlic Broccoli",
            calories: "660 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Shredded Chicken Breast & Sunny Eggs on Sourdough",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Bio-Availability Start",
            nutrients: "3 Sunny Eggs + 80g Poached Chicken + 2 Sourdough Slices + 1 Apple",
            calories: "660 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Turkey Patties with Mashed Potatoes & Peas",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Caloric Surplus Fuel",
            nutrients: "2 Lean Turkey Patties (200g) + 200g Mashed Potatoes + Green Peas Gravy",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Greek Yogurt Bowl with Granola & Chia Seeds",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Digestive Ease & Fuel",
            nutrients: "150g Greek Yogurt + 30g Granola + 1 tsp Chia Seeds + Black Coffee",
            calories: "310 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Isolate & Boiled Sweet Potato",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deltoid Micro-Tear Repair",
            nutrients: "1.5 Scoops Whey + 150g Steamed Sweet Potato + Water",
            calories: "390 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Tandoori Spiced Chicken Breast with Brown Rice",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Amino Acid Rebuild",
            nutrients: "200g Tandoori Chicken + 1 Cup Brown Rice + Grilled Bell Peppers",
            calories: "680 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Egg White Veggie Scramble with Peanut Butter Toast",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Pure Protein Influx",
            nutrients: "5 Egg Whites + 2 Whole Eggs + 2 Slices Toast with Peanut Butter",
            calories: "640 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Prawns & Chicken Skewers with Lemon Herb Rice",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rich Micronutrient Protein",
            nutrients: "150g Prawns + 100g Chicken Breast + 1.5 Cups Herbed Rice + Mixed Salad",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Whole Wheat Bagel with Fruit Jam & Black Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Pump Fuel",
            nutrients: "1 Whole Wheat Bagel + 2 tbsp Strawberry Jam + Espresso Shot",
            calories: "330 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Shake & 3 Whole Hard-Boiled Eggs",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Arm Hypertrophy Rebuild",
            nutrients: "1 Scoop Whey Isolate + 3 Boiled Eggs + 1 Ripe Banana",
            calories: "440 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Slow Cooked Chicken Stew with Sweet Potato & Corn",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Recovery Meal",
            nutrients: "200g Chicken Breast Stew + Sweet Potato Chunks + Sweet Corn Bowl",
            calories: "690 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Smoked Turkey, Cheese & Scrambled Eggs on Bagel",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Power Breakfast",
            nutrients: "3 Whole Eggs + 70g Turkey + 1 Slice Cheddar on Toasted Bagel",
            calories: "670 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "High-Protein Chicken Biryani with Boiled Eggs & Raita",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Compound Fuel",
            nutrients: "200g Chicken + 2 Boiled Eggs + Basmati Biryani Rice + Mint Raita",
            calories: "810 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Energy Shake with Banana, Rolled Oats & Honey",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Liquid Carbs",
            nutrients: "1 Banana + 40g Oats blended in Water + 1 tbsp Honey + Double Espresso",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Hydrolyzed Whey with Coconut Water & Rice Cakes",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Electrolyte & Amino Hydration",
            nutrients: "1.5 Scoops Whey Isolate in 300ml Fresh Coconut Water + 2 Rice Cakes",
            calories: "390 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Fish Fillet with Roasted Potatoes & Green Salad",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Full-Body Repair",
            nutrients: "200g Grilled White Fish + 200g Baked Herb Potato + Garden Greens",
            calories: "680 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Loaded Scrambled Eggs with Sourdough & Fresh Fruit",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rest Day Nutrition",
            nutrients: "4 Whole Eggs + 2 Slices Sourdough + 1 Sliced Kiwi + Green Tea",
            calories: "630 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Roast Chicken Breast with Brown Rice & Dal Gravy",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Glycogen Store",
            nutrients: "200g Roast Chicken + 1.5 Cups Brown Rice + Yellow Dal Bowl + Beet Salad",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Greek Yogurt with Mixed Berries & Almonds",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Metabolic Boost",
            nutrients: "150g Greek Yogurt + 10 Raw Almonds + Fresh Strawberries",
            calories: "280 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Slow-Digesting Casein / Whey Protein Milkshake",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Recovery Influx",
            nutrients: "1 Scoop Protein + 300ml Milk + 1 Banana + 1 tbsp Flaxseed Powder",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Herb Crusted Chicken with Sweet Potato Mash & Asparagus",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sunday Systemic Repair",
            nutrients: "180g Baked Chicken + 200g Creamy Mashed Sweet Potato + Steamed Asparagus",
            calories: "670 kcal"
          }
        ]
      }
    },
    "vegetarian": {
      label: "Vegetarian",
      focus: "Plant-Dense Mass Building & Sustained Amino Supply",
      description: "Clean surplus powered by paneer, whey, lentils, legumes, seeds, and targeted peri-workout nutrition.",
      weeklyFocus: {
        Mon: "High Protein Paneer & Push Workout Glycogen Surge",
        Tue: "Soya & Legume Pull Day: Back Hypertrophy Fuel",
        Wed: "Complex Carb Mid-Week Leg Power Delivery",
        Thu: "Tofu & Lentil Recovery: Upper Body Conditioning",
        Fri: "High Protein Whey & Dal: Peak Metabolic Delivery",
        Sat: "Full Body Mass: High Caloric Plant Density",
        Sun: "Digestive Rest & Deep Plant Amino Restoration"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Paneer Bhurji with 3 Multigrain Phulkas & Sprouts",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Plant Protein Morning",
            nutrients: "140g Fresh Paneer Scramble + 3 Multigrain Phulkas + 1 Cup Steamed Moong Sprouts",
            calories: "630 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Rajma Masala with Brown Rice & Paneer Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Hypertrophy Fuel",
            nutrients: "1.5 Cups Red Kidney Bean Curry + 1 Cup Brown Rice + 80g Grilled Paneer Cubes",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Peanut Butter Rice Cakes & Banana Slices",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Energy Pre-Load",
            nutrients: "3 Rice Cakes + 2 tbsp Natural Peanut Butter + 1 Ripe Banana + Black Coffee",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Shake with Dextrose & Soaked Almonds",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Recovery Synthesis",
            nutrients: "1 Scoop Whey Isolate + 300ml Skim Milk + 10 Soaked Almonds + 1 Date",
            calories: "390 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Tofu Steak with Quinoa & Steamed Broccoli",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Recovery Meal",
            nutrients: "180g Firm Tofu Steak + 1 Cup Cooked Quinoa + Stir-Fried Greens",
            calories: "650 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "High-Protein Moong Dal Chilla stuffed with Paneer",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dense Plant Fuel",
            nutrients: "3 Moong Dal Chillas + 100g Grated Paneer filling + Green Mint Chutney",
            calories: "620 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chole Masala with Soya Chunks & Jeera Rice",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Complete Amino Influx",
            nutrients: "1.5 Cups Chickpeas + 50g Soya Chunks Gravy + 1 Cup Steamed Jeera Rice",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Rolled Oats with Honey, Chia & Apple Slices",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Steady Glycogen Release",
            nutrients: "50g Oats + 1 tbsp Pure Honey + 1 tsp Chia Seeds + Green Tea / Espresso",
            calories: "320 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Protein Smoothie with Banana & Peanut Butter",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Glycogen & Amino Load",
            nutrients: "1 Scoop Plant/Whey Protein + 1 Banana + 1 tbsp Peanut Butter + Water",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer Tikka with 3 Whole Wheat Rotis & Salad",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Hypertrophy Repair",
            nutrients: "150g Roasted Paneer Tikka + 3 Phulkas + Cucumber Tomato Salad",
            calories: "670 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Overnight Chia Protein Pudding with Kiwi & Nuts",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Morning Energy",
            nutrients: "3 tbsp Chia Seeds in Soy Milk + 1 Scoop Protein + Sliced Kiwi + 10 Walnuts",
            calories: "600 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Soya Granule & Pea Pulao with Sprouted Moong",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Plant Protein Density",
            nutrients: "60g Soya Granules + 1 Cup Basmati Rice + Green Peas + 1 Cup Fresh Curd",
            calories: "730 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Whole Wheat Toast with Almond Butter & Honey",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Pre-Lift Performance",
            nutrients: "2 Slices Toast + 1.5 tbsp Almond Butter + 1 tsp Honey + Espresso",
            calories: "330 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Shake & 2 Medjool Dates",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Insulin Spike & Amino Delivery",
            nutrients: "1.5 Scoops Whey + 300ml Water + 2 Large Medjool Dates",
            calories: "380 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Dal Makhani (Light Cream) with Jeera Brown Rice & Paneer",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Complete Muscle Recovery",
            nutrients: "1 Cup Black Urad Dal + 1 Cup Jeera Rice + 100g Tawa Grilled Paneer",
            calories: "680 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Masala Scrambled Tofu with Multigrain Sourdough",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean Plant Protein",
            nutrients: "150g Organic Tofu Bhurji + 2 Toasted Sourdough Slices + 1 Glass Almond Milk",
            calories: "590 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Black Eyed Peas (Lobia) Curry with Quinoa & Raita",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Satiety & Muscle Building",
            nutrients: "1.5 Cups Lobia Curry + 1 Cup Steamed Quinoa + Cucumber Raita + Salad",
            calories: "720 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Baked Cinnamon Sweet Potato Cubes & Black Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Workout Carbohydrate",
            nutrients: "180g Baked Sweet Potato with Cinnamon + Double Shot Espresso",
            calories: "290 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Greek Yogurt Bowl with Granola & Whey Isolate",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dual Stage Amino Absorption",
            nutrients: "150g Greek Yogurt + 1 Scoop Whey + 25g High-Protein Granola",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer & Capsicum Kadai with 3 Phulkas",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dense Night Recovery",
            nutrients: "140g Paneer cooked with Capsicum & Tomato + 3 Phulkas + Fresh Greens",
            calories: "670 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Sprouted Moong & Paneer Salad with Wholewheat Toast",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Micronutrient Rich Start",
            nutrients: "1 Cup Boiled Moong + 100g Paneer Cubes + 2 Toast Slices + Fresh Orange",
            calories: "610 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Yellow Dal Tadka with Paneer Bhurji & Brown Rice",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Hypertrophy Fuel",
            nutrients: "1 Cup Dal + 100g Paneer Bhurji + 1 Cup Brown Rice + Fresh Radish Salad",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Fresh Fruit Bowl with Honey & Walnuts",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Cellular Hydration & Fructose",
            nutrients: "1 Apple + 1 Banana + 1 tbsp Honey + 6 Walnut Halves + Black Coffee",
            calories: "320 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Shake with Skim Milk & 2 Dates",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Immediate Re-Synthesis",
            nutrients: "1 Scoop Whey Isolate + 300ml Skim Milk + 2 Soft Medjool Dates",
            calories: "400 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Soya Chaap with Mint Dip & Stir-Fried Beans",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Amino Density Rebuild",
            nutrients: "160g Tandoori Soya Chaap + Mint Yogurt Dip + Sauteed Green Beans",
            calories: "650 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Fluffy Oatmeal Protein Pancakes with Chia & Berries",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Power Loading",
            nutrients: "3 Oat & Whey Pancakes + 1 tbsp Maple Syrup + Fresh Blueberries + Almond Milk",
            calories: "630 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chickpea Quinoa Power Bowl with Tahini & Avocado",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Plant Heavy Lifting Fuel",
            nutrients: "1.5 Cups Chickpeas + 1 Cup Quinoa + 1/2 Avocado + 2 tbsp Sesame Tahini",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Dark Chocolate (85%) with Banana & Double Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Vasodilation & Nitric Oxide Boost",
            nutrients: "25g Dark Chocolate + 1 Banana + Double Espresso",
            calories: "310 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Pea & Rice Protein Isolate in Fresh Coconut Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Electrolyte & Muscle Hydration",
            nutrients: "1.5 Scoops Plant Protein + 350ml Pure Coconut Water + 1 Rice Cake",
            calories: "380 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer Jalfrezi with 3 Whole Wheat Phulkas & Salad",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Full Weekend Hypertrophy",
            nutrients: "150g Paneer with Onion, Bell Peppers & Spices + 3 Phulkas + Fresh Salad",
            calories: "670 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Avocado & Crumbled Paneer Toast on Artisan Sourdough",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Gentle Rest Day Fuel",
            nutrients: "80g Crumbled Paneer + 1/2 Avocado on 2 Sourdough Slices + Green Tea",
            calories: "600 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Five-Lentil Panchratna Dal with Brown Rice & Paneer",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Complete 5-Lentil Protein",
            nutrients: "1.5 Cups Panchratna Dal + 1 Cup Brown Rice + 80g Tawa Paneer + Salad",
            calories: "720 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Medjool Dates filled with Almond Butter",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Quick Restorative Fuel",
            nutrients: "2 Large Dates + 1 tbsp Almond Butter + Chamomile or Green Tea",
            calories: "280 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "High-Protein Milkshake with Whey & Flaxseeds",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Restorative Recovery",
            nutrients: "1 Scoop Whey + 300ml Milk + 1 Banana + 1 tbsp Ground Flaxseeds",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Tofu & Edamame Noodle Bowl with Sesame Soy Dressing",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Digesting Amino Replenishment",
            nutrients: "150g Grilled Tofu + 50g Edamame Beans + Buckwheat Soba Noodles + Greens",
            calories: "640 kcal"
          }
        ]
      }
    }
  },
  weightLoss: {
    "non-vegetarian": {
      label: "Non-Vegetarian",
      focus: "Lean Protein Shred & Caloric Deficit Protocol",
      description: "Controlled caloric deficit with thermogenic whole foods, targeted pre-workout fuel, and zero-sugar post-workout recovery.",
      weeklyFocus: {
        Mon: "Metabolic Chest & HIIT Shred Nutrition",
        Tue: "High Satiety Back & Core Deficit Fuel",
        Wed: "Fat Oxidation Leg Day Energy Focus",
        Thu: "Lean Deltoid Sculpting & Fiber Satiety",
        Fri: "Calorie Burn Conditioning & Clean Protein",
        Sat: "Weekend Full-Body High Thermic Deficit",
        Sun: "Metabolic Reset & Digestive Cleansing"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "5 Egg White Omelet with Spinach & Tomato",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean High-Protein Morning",
            nutrients: "5 Egg Whites + 1 Whole Egg + Baby Spinach + 1 Slice Multigrain Toast",
            calories: "360 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Lemon Herb Grilled Chicken with Cauliflower Rice",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Low Carb High Satiety",
            nutrients: "180g Chicken Breast + 1.5 Cups Cauliflower Mash + Steamed Broccoli",
            calories: "450 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Apple Slices & Black Coffee with Cinnamon",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Thermogenic Pre-Fuel",
            nutrients: "1 Crisp Green Apple + 1 Black Americano + Pinch of Ceylon Cinnamon",
            calories: "95 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Zero-Carb Whey Isolate in Water & 3 Boiled Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Pure Protein Preservation",
            nutrients: "1 Scoop Whey Isolate (25g Protein) in 300ml Chilled Water + 3 Egg Whites",
            calories: "180 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Steamed White Basa Fillet with Asparagus & Garlic",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Night Deficit",
            nutrients: "180g White Fish + 150g Steamed Asparagus + Lemon Squeeze + Greens",
            calories: "380 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Smoked Turkey Breast Wrap in Lettuce with Boiled Eggs",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Ultra-Lean Starter",
            nutrients: "80g Turkey Ham + 4 Egg Whites + Romaine Leaves + Dijon Mustard",
            calories: "340 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Chicken Breast with Quinoa & Cucumber Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean Muscle Retaining",
            nutrients: "170g Grilled Chicken + 1/2 Cup Cooked Quinoa + Tossed Bell Pepper Greens",
            calories: "460 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "1 Rice Cake with 1 tsp Peanut Butter & Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Minimal Calorie Energy",
            nutrients: "1 Whole Grain Rice Cake + 1 tsp Pure Peanut Butter + Black Coffee",
            calories: "120 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Shake with 5g Glutamine",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Zero Sugar Muscle Shield",
            nutrients: "1 Scoop Whey Isolate in Water + 5g L-Glutamine",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Pan-Seared Tuna Steak with Steamed Green Beans",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Thermic Breakdown",
            nutrients: "160g Lean Tuna + 1 Cup Steamed Beans + Olive Oil Spray",
            calories: "390 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Greek Yogurt Bowl with Flaxseed & Half Grapefruit",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Probiotic Deficit Fuel",
            nutrients: "180g Non-Fat Greek Yogurt + 1 tbsp Ground Flaxseed + 1/2 Pink Grapefruit",
            calories: "320 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chicken Tikka Skewers with Mint Raita & Garden Salad",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Satiating Spiced Protein",
            nutrients: "180g Boneless Chicken Tikka + 2 tbsp Mint Yogurt Dip + Shredded Cabbage Salad",
            calories: "440 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Half Banana with Black Iced Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Workout Spark",
            nutrients: "1/2 Ripe Banana (Potassium boost) + 1 Cold Brew Coffee",
            calories: "60 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Shake & 4 Boiled Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Nitrogen Balance Recovery",
            nutrients: "1 Scoop Whey Isolate + 4 Hard-Boiled Egg Whites with pinch of pepper",
            calories: "190 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Baked Herb Chicken with Roasted Zucchini & Capsicum",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean Evening Repair",
            nutrients: "170g Oven-Baked Chicken Breast + Roasted Zucchini + Red Bell Pepper",
            calories: "370 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Boiled Eggs with Avocado Slice & Cherry Tomatoes",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Essential Healthy Fats",
            nutrients: "2 Whole Boiled Eggs + 2 Egg Whites + 1/4 Avocado + Handful Cherry Tomatoes",
            calories: "350 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Steamed White Fish with Brown Rice & Lemon Asparagus",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Shred Plate",
            nutrients: "180g White Fish + 1/2 Cup Brown Rice + Steamed Lemon Asparagus",
            calories: "430 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Tea with Lemon & 5 Soaked Almonds",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: EGCG Fat Oxidation Pre-load",
            nutrients: "1 Cup Pure Brewed Green Tea + 5 Soaked Almonds",
            calories: "70 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Zero-Carb Whey Isolate in Cold Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Amino Shuttling",
            nutrients: "1.2 Scoops Whey Isolate in 300ml Ice Cold Water",
            calories: "140 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Turkey Ham / Chicken Salad with Balsamic Glaze",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Low-Glycemic Dinner",
            nutrients: "170g Lean Sliced Turkey/Chicken + Mixed Lettuce + Balsamic Dressing",
            calories: "360 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Scrambled Egg Whites with Mushrooms & 1 Toast",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Low Calorie High Satiety",
            nutrients: "5 Egg Whites + Button Mushrooms + 1 Slice Wholewheat Bread",
            calories: "320 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chicken Salad with Olive Oil & Cucumber Sticks",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Cutting Lunch",
            nutrients: "190g Shredded Poached Chicken + Crisp Greens + 1 tsp Cold-Pressed Olive Oil",
            calories: "440 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Black Americano & 1 Rice Cake with Sea Salt",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Metabolic Catalyst",
            nutrients: "Double Shot Espresso + 1 Plain Brown Rice Cake",
            calories: "50 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake & 3 Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Muscle Sparing",
            nutrients: "1 Scoop Whey Protein + 3 Hard Boiled Egg Whites",
            calories: "175 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Salmon (Small Portion) with Steamed Asparagus",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Omega-3 Anti-Inflammatory",
            nutrients: "140g Wild Salmon + 150g Steamed Asparagus + Lemon Wedges",
            calories: "410 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Egg White Veggie Scramble with Half Avocado",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Clean Energy",
            nutrients: "5 Egg Whites + Diced Bell Peppers + 1/2 Hass Avocado",
            calories: "340 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Herb Crusted Chicken Breast with Mashed Cauliflower",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Thermic Lean Meal",
            nutrients: "190g Roast Chicken Breast + Garlic Whipped Cauliflower + Greens",
            calories: "430 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Apple Slices with Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Natural Pre-Session Energy",
            nutrients: "1 Crisp Green Apple + Double Shot Espresso",
            calories: "85 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake in Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Amino Supply",
            nutrients: "1 Scoop Whey Isolate + 5g BCAAs in 300ml Water",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Steamed White Cod with Stir-Fried Bok Choy & Broccoli",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Volume Low Calorie",
            nutrients: "180g Steamed Cod Fillet + Bok Choy + Broccoli Florets",
            calories: "350 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Poached Eggs on Sautéed Spinach with Fresh Orange",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rest Day Low-Cal Starter",
            nutrients: "2 Whole Poached Eggs + 2 Egg Whites + Steamed Spinach + 1/2 Fresh Orange",
            calories: "310 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Lemon Pepper Chicken Stew with Veggies & Salad",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Metabolic Rest Lunch",
            nutrients: "180g Chicken Breast in Herb Broth + Carrots & Celery + Large Cucumber Salad",
            calories: "410 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Chamomile Tea with 6 Raw Almonds",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Restorative Light Sustenance",
            nutrients: "1 Cup Herbal Tea + 6 Raw Almonds",
            calories: "50 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake with Ice",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Pure Protein Influx",
            nutrients: "1 Scoop Whey Isolate + 300ml Cold Water with Crushed Ice",
            calories: "115 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Chicken Breast with Steamed French Beans",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Caloric Deficit Night Closure",
            nutrients: "170g Grilled Chicken + 150g French Beans + Lemon Pepper Seasoning",
            calories: "350 kcal"
          }
        ]
      }
    },
    "vegetarian": {
      label: "Vegetarian",
      focus: "Plant-Based Lean Definition & Calorie Deficit",
      description: "Metabolic boost through high-protein tofu, paneer, sprouts, and light peri-workout sustenance.",
      weeklyFocus: {
        Mon: "High Fiber Sprout & Tofu Metabolic Burn",
        Tue: "Soya Chunk & Paneer Lean Retention",
        Wed: "Legume Satiety & Low Glycemic Mid-Week",
        Thu: "High Protein Lentil Conditioning & Greens",
        Fri: "Tofu Stir-Fry & Metabolic Fat Oxidation",
        Sat: "Weekend Plant Deficit & Clean Recovery",
        Sun: "Systemic Cleansing & Digestive Rest"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Moong Sprouts & Low-Fat Paneer Salad with Mint Chutney",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Fiber Plant Protein",
            nutrients: "1 Cup Sprouted Green Moong + 80g Low-Fat Paneer + Cucumber & Lemon",
            calories: "340 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Soya Chunk Curry with 2 Phulkas & Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deficit Muscle Retention",
            nutrients: "50g Soya Chunks (dry wt, 26g protein) cooked in Tomato Gravy + 2 Phulkas + Greens",
            calories: "450 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Apple & Black Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Pre-Workout Focus",
            nutrients: "1 Medium Green Apple + 1 Freshly Brewed Black Coffee",
            calories: "80 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Plant Protein Isolate in Water & Soaked Almonds",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Zero Sugar Plant Repair",
            nutrients: "1 Scoop Pea/Rice Protein Isolate in 300ml Water + 6 Soaked Almonds",
            calories: "170 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Tofu with Steamed Broccoli & Zucchini",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Low Carb Night Satiety",
            nutrients: "160g Firm Tofu + Steamed Broccoli Florets + Sauteed Zucchini",
            calories: "370 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Besan Chilla with Grated Paneer & Mint Chutney",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean Plant Starter",
            nutrients: "2 Besan Chillas + 50g Grated Low-Fat Paneer filling + Green Tea",
            calories: "350 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Yellow Dal Tadka with 1 Cup Quinoa & Curd",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Satiety Clean Carbs",
            nutrients: "1 Cup Moong Dal + 1/2 Cup Cooked Quinoa + 100g Fresh Curd + Cucumber",
            calories: "440 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "1 Plain Rice Cake & Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Clean Spark",
            nutrients: "1 Brown Rice Cake + Double Espresso Shot",
            calories: "45 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake in Water",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Amino Delivery",
            nutrients: "1 Scoop Whey Isolate + 300ml Water",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Pan-Grilled Paneer Tikka with Sautéed Bell Peppers",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Caloric Deficit Repair",
            nutrients: "130g Low-Fat Paneer Tikka + Sautéed Capsicum & Onions + Garden Salad",
            calories: "380 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Greek Yogurt Bowl with Chia Seeds & Fresh Berries",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Protein Rich Deficit Morning",
            nutrients: "180g Greek Yogurt + 1 tsp Chia Seeds + Fresh Strawberries",
            calories: "310 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chickpea & Spinach Salad Bowl with Lemon Dressing",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Micronutrient Fiber",
            nutrients: "1 Cup Boiled Chickpeas + Baby Spinach + 50g Tofu Cubes + Lemon Dressing",
            calories: "430 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Half Banana with Black Iced Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Glycogen Spark",
            nutrients: "1/2 Banana + 1 Cold Brew Coffee",
            calories: "60 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Plant Protein Shake with 5g Glutamine",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Cellular Hydration",
            nutrients: "1 Scoop Pea Protein Isolate in 300ml Water + 5g Glutamine",
            calories: "125 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Soya Keema Matar with 1 Phulka & Cucumber Salad",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dense Night Plant Protein",
            nutrients: "50g Soya Keema + Green Peas + 1 Phulka + Fresh Tomato & Cucumber",
            calories: "370 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Masala Scrambled Tofu with Multigrain Toast",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Vegan High-Protein Breakfast",
            nutrients: "140g Tofu Bhurji + 1 Multigrain Toast Slice + Green Tea",
            calories: "330 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Mixed Dal with Cauliflower Rice & Low-Fat Paneer",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Ultra Low Carb Deficit",
            nutrients: "1 Cup Mixed Dal + 1.5 Cups Cauliflower Rice + 70g Paneer Cubes",
            calories: "420 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Tea with Lemon & 5 Walnuts",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Antioxidant & Healthy Fat Fuel",
            nutrients: "1 Cup Hot Green Tea + 5 Walnut halves",
            calories: "85 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Zero-Carb Whey Protein Shake in Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Lean Rebuild Influx",
            nutrients: "1 Scoop Whey Isolate + 300ml Water",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Tofu & Mushroom Stir-Fry with Sesame Seeds",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Micronutrient Dinner",
            nutrients: "160g Firm Tofu + Button Mushrooms + 1 tsp Sesame Seeds + Soy Ginger Dressing",
            calories: "360 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Moong Dal Sprouts Chaat with Pomegranate & Paneer",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fresh Morning Fiber",
            nutrients: "1 Cup Steamed Sprouts + 60g Low-Fat Paneer + Pomegranate Seeds + Lemon",
            calories: "340 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Paneer Bhurji with 2 Phulkas & Green Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Balanced Muscle Fuel",
            nutrients: "120g Low-Fat Paneer Bhurji + 2 Whole Wheat Phulkas + Cucumber Slices",
            calories: "450 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Black Americano & 1 Plain Rice Cake",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Pre-Workout Energy",
            nutrients: "Double Shot Espresso + 1 Plain Rice Cake",
            calories: "45 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Pea & Rice Protein Isolate in Cold Water",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Plant Amino Delivery",
            nutrients: "1 Scoop Organic Plant Protein + 300ml Cold Water",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Soya Chunks with Roasted Capsicum & Curd",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Satiety Lean Protein",
            nutrients: "50g Soya Chunks roasted in spices + Roasted Bell Peppers + 100g Curd",
            calories: "380 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Avocado & Low-Fat Paneer on Sourdough Slice",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Essential Healthy Fats",
            nutrients: "60g Paneer + 1/4 Avocado mashed on 1 Sourdough Slice + Black Coffee",
            calories: "350 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chole Palak (Chickpeas in Spinach) with Brown Rice",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Plant Shred Meal",
            nutrients: "1 Cup Chickpeas in Pureed Spinach Gravy + 1/2 Cup Brown Rice + Salad",
            calories: "440 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Green Apple Slices with Ceylon Cinnamon",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Blood Sugar Stabilizing Pre-Fuel",
            nutrients: "1 Crisp Green Apple + Cinnamon + Espresso",
            calories: "85 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake in Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Pure Protein Repair",
            nutrients: "1 Scoop Whey Isolate + 300ml Water",
            calories: "120 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Steamed Edamame & Tofu Salad with Sesame Vinaigrette",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Ultra-Light Night Caloric Deficit",
            nutrients: "140g Tofu + 50g Edamame Beans + Mixed Greens + Light Soy Dressing",
            calories: "360 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Vegetable Poha with Roasted Peanuts & Paneer Cubes",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rest Day Light Carb Start",
            nutrients: "1 Cup Flattened Rice with Veggies + 50g Paneer Cubes + 10 Peanuts",
            calories: "340 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Steamed Moong Dal with Vegetable Stir-Fry & Curd",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Digestive Rest Lunch",
            nutrients: "1.5 Cups Moong Dal Soup + Stir-Fried French Beans + 100g Fresh Curd",
            calories: "410 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Chamomile or Mint Tea with 5 Almonds",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Restorative Light Snack",
            nutrients: "1 Cup Herbal Tea + 5 Soaked Almonds",
            calories: "50 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Plant Protein Isolate in Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Low Calorie Amino Replenish",
            nutrients: "1 Scoop Plant Protein + 300ml Cold Water",
            calories: "115 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Paneer & Asparagus with Mixed Herb Seasoning",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Evening Closure",
            nutrients: "130g Low-Fat Paneer + 150g Steamed Asparagus + Lemon Squeeze",
            calories: "350 kcal"
          }
        ]
      }
    }
  },
  strength: {
    "non-vegetarian": {
      label: "Non-Vegetarian",
      focus: "Maximal Power & CNS Recovery Protocol",
      description: "Nutrient-dense nutrition designed for powerlifters and strength athletes with heavy peri-workout performance meals.",
      weeklyFocus: {
        Mon: "Heavy Squat Day: Peak Glycogen & Electrolyte Delivery",
        Tue: "Bench Press Power: Dense Animal Protein & Creatine Fuel",
        Wed: "Active CNS Recovery & Muscular Remodeling",
        Thu: "Deadlift Max Effort: Maximum ATP Regeneration",
        Fri: "Overhead Press & Explosive Power Fuel",
        Sat: "Strongman / Accessory Compound Volume Rebuild",
        Sun: "Deep Neurological & Tendon Recovery"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "4 Whole Eggs & Steak Strips with Oatmeal Bowl",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Maximum Power Breakfast",
            nutrients: "4 Whole Eggs + 100g Lean Beef / Turkey + 1 Cup Oatmeal with Honey & Banana",
            calories: "720 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chicken Breast with Sweet Potato Mash & Dal",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Squat Fueling Load",
            nutrients: "220g Chicken Breast + 300g Sweet Potato Mash + Yellow Dal Bowl",
            calories: "780 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Rice Krispies / Honey Toast with Salt & Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Explosive Intra-Cellular Energy",
            nutrients: "2 Slices Toast with 2 tbsp Raw Honey + Pink Himalayan Salt + Double Espresso",
            calories: "360 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate, 5g Creatine & 4 Boiled Eggs",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Neurological & ATP Replenishment",
            nutrients: "1.5 Scoops Whey + 5g Creatine Monohydrate + 4 Boiled Eggs + 1 Banana",
            calories: "480 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Wild Salmon Fillet with Jasmine Rice & Roasted Veggies",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Joint & Tendon Night Repair",
            nutrients: "200g Salmon + 1.5 Cups Jasmine Rice + Asparagus + Extra Virgin Olive Oil",
            calories: "720 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Smoked Turkey, Cheddar & 3-Egg Scramble on Sourdough",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Density Amino Start",
            nutrients: "3 Whole Eggs + 80g Turkey + 30g Aged Cheddar + 2 Slices Sourdough",
            calories: "690 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Minced Chicken / Lean Beef with Basmati Rice & Broccoli",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Bench Press Strength Recovery",
            nutrients: "220g Chicken Keema + 1.5 Cups Basmati Rice + Steamed Broccoli Florets",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Banana with Peanut Butter & Double Black Coffee",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: CNS Stimulation",
            nutrients: "1 Large Banana + 2 tbsp Natural Peanut Butter + Double Espresso",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Shake with Skim Milk & Jam Toast",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Glycogen Supercompensation",
            nutrients: "1.5 Scoops Whey in 300ml Milk + 2 White Bread Slices with Strawberry Jam",
            calories: "450 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Chicken Thighs with Baked Potato & Green Beans",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Muscle Rebuild",
            nutrients: "200g Chicken Thighs + 1 Large Baked Potato with Butter + Green Beans",
            calories: "710 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Fluffy Protein Pancakes with Eggs & Pure Maple Syrup",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Mid-Week Power Recovery",
            nutrients: "3 Oat Protein Pancakes + 3 Boiled Eggs + 1 tbsp Maple Syrup + Fresh Berries",
            calories: "680 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Fish Fillet with Quinoa & Roasted Veggies",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Micronutrient Plate",
            nutrients: "220g White Fish + 1.5 Cups Quinoa + Roasted Zucchini & Carrots",
            calories: "730 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Whole Grain Bagel with Raw Honey & Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Active Recovery Pre-Fuel",
            nutrients: "1 Toasted Bagel + 1.5 tbsp Raw Honey + Americano",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Shake & 3 Boiled Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Nitrogen Flow",
            nutrients: "1 Scoop Whey Isolate + 3 Hard Boiled Egg Whites + 1 Banana",
            calories: "380 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Slow Cooked Chicken Stew with Sweet Potato & Herb Rice",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deadlift Readiness Loading",
            nutrients: "200g Chicken Stew + Sweet Potato Cubes + 1 Cup Steamed Rice",
            calories: "710 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Loaded 4-Egg Scramble with Turkey, Cheddar & Bagel",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Deadlift Day Breakfast",
            nutrients: "4 Whole Eggs + 60g Turkey + Cheddar Cheese + 1 Toasted Bagel",
            calories: "740 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Sirloin / Chicken Breast with Mashed Potatoes",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dense Iron & Glycogen Delivery",
            nutrients: "220g Chicken/Steak + 250g Creamy Mashed Potatoes + Sauteed Beans",
            calories: "790 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "3 Rice Cakes with Peanut Butter, Banana & Himalayan Salt",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Max Effort Pre-Load",
            nutrients: "3 Rice Cakes + 2 tbsp Peanut Butter + 1 Banana + Pinch of Pink Salt + Coffee",
            calories: "370 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate + 5g Creatine + Coconut Water & Dates",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Pull CNS Replenishment",
            nutrients: "1.5 Scoops Whey + 5g Creatine + 350ml Coconut Water + 2 Medjool Dates",
            calories: "450 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Roast Chicken with Sweet Potato Wedges & Broccoli",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Systemic Nervous Recovery",
            nutrients: "200g Roasted Chicken + 200g Baked Sweet Potato + Steamed Broccoli",
            calories: "720 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Sunny Side Eggs with Shredded Chicken on Sourdough",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Explosive Power Morning",
            nutrients: "3 Sunny Eggs + 80g Chicken + 2 Sourdough Slices + Fresh Orange Juice",
            calories: "670 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Grilled Turkey Patties with Basmati Rice & Asparagus",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Overhead Press Fuel",
            nutrients: "200g Turkey Patties + 1.5 Cups Basmati Rice + Lemon Herb Asparagus",
            calories: "740 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Rolled Oats with Honey, Berries & Double Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Power Output",
            nutrients: "50g Oats + 1 tbsp Raw Honey + Handful Berries + Double Espresso",
            calories: "330 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake & 4 Boiled Egg Whites",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deltoid Muscle Synthesis",
            nutrients: "1.5 Scoops Whey Protein + 4 Hard Boiled Egg Whites + 1 Banana",
            calories: "430 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Pan-Seared White Cod with Jasmine Rice & Green Salad",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Weekend Rebuild",
            nutrients: "220g Cod Fillet + 1.5 Cups Jasmine Rice + Fresh Cucumber Salad",
            calories: "680 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Smoked Turkey & Cheese Scramble with Oats & Honey",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Strongman Breakfast",
            nutrients: "3 Whole Eggs + 60g Turkey Ham + 1 Cup Oats with Milk & Honey",
            calories: "690 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "High-Protein Chicken Biryani with Boiled Eggs & Dal",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Compound Volume Fuel",
            nutrients: "220g Chicken + 2 Boiled Eggs + 1.5 Cups Biryani Rice + Cucumber Raita",
            calories: "820 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Energy Smoothie with Banana, Espresso, Oats & Honey",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Velocity Carb Loader",
            nutrients: "1 Banana + 40g Oats + Espresso Shot + 1 tbsp Honey blended in Water",
            calories: "350 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Protein Shake & White Toast with Honey",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Fast Insulin Driven Glycogen Restoration",
            nutrients: "1.5 Scoops Whey + 2 White Bread Slices with Honey + 5g Creatine",
            calories: "440 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Salmon with Baked Sweet Potato & Green Beans",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deep Connective Tissue Repair",
            nutrients: "200g Wild Salmon + 200g Baked Sweet Potato + Garlic Green Beans",
            calories: "730 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Soft Scrambled Eggs on English Muffins with Sliced Fruit",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Restorative Power Breakfast",
            nutrients: "4 Whole Eggs + 2 English Muffins + 1 Fresh Kiwi + Green Tea",
            calories: "640 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Roast Chicken Stew with Brown Rice & Tadka Dal",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deep Muscular Rejuvenation",
            nutrients: "200g Chicken Stew + 1.5 Cups Brown Rice + Yellow Dal Bowl + Beet Salad",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Greek Yogurt with Raw Honey & Walnuts",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Light Restorative Fuel",
            nutrients: "150g Greek Yogurt + 1 tbsp Honey + 8 Raw Walnuts",
            calories: "310 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Casein / Whey Protein Shake with Skim Milk",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Night Long Nitrogen Influx",
            nutrients: "1 Scoop Protein + 300ml Milk + 1 Banana + 1 tbsp Flaxseed",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Herb Crusted Chicken Breast with Creamy Sweet Potato Puree",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sunday Systemic CNS Rebuild",
            nutrients: "200g Baked Chicken + 200g Mashed Sweet Potato + Steamed Asparagus",
            calories: "690 kcal"
          }
        ]
      }
    },
    "vegetarian": {
      label: "Vegetarian",
      focus: "Vegetarian Strength & CNS Recovery Protocol",
      description: "Fueling central nervous system output and tendon recovery with dense dairy, legumes, and nutrient-packed shakes.",
      weeklyFocus: {
        Mon: "Squat Day Heavy Fuel: High Calorie Paneer & Complex Carbs",
        Tue: "Bench Press Power: Plant Amio Acid Satiety & Creatine",
        Wed: "Active Mid-Week CNS Recovery & Joint Rest",
        Thu: "Deadlift Power Output: Maximum ATP Regenerative Meal",
        Fri: "Overhead Press Strength: High Protein Dal & Paneer",
        Sat: "Strongman Functional Power: Maximum Plant Mass Load",
        Sun: "Systemic Nervous System Restoration & Tendon Repair"
      },
      days: {
        Mon: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Paneer Bhurji with 3 Multigrain Parathas & Sprouts",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Squat Morning",
            nutrients: "150g Fresh Paneer Bhurji + 3 Multigrain Parathas + 1 Cup Steamed Sprouts",
            calories: "680 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Rajma Masala with Brown Rice & Grilled Paneer",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Maximum Density Fuel",
            nutrients: "1.5 Cups Kidney Bean Curry + 1.5 Cups Brown Rice + 100g Paneer + Curd",
            calories: "770 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "3 Rice Cakes with Peanut Butter, Banana & Himalayan Salt",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Intra-Cellular ATP Load",
            nutrients: "3 Rice Cakes + 2 tbsp Peanut Butter + 1 Banana + Salt + Double Espresso",
            calories: "360 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Shake with 5g Creatine & Soaked Almonds",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rapid Recovery Synthesis",
            nutrients: "1.5 Scoops Whey + 5g Creatine + 300ml Skim Milk + 10 Almonds",
            calories: "430 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Tandoori Paneer Tikka with 3 Whole Wheat Phulkas",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Quad & Lower Back Night Repair",
            nutrients: "160g Paneer Tikka + 3 Phulkas + Fresh Cucumber & Tomato Salad",
            calories: "690 kcal"
          }
        ],
        Tue: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "High-Protein Moong Dal Chilla with Grated Paneer",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Dense Plant Fuel Start",
            nutrients: "3 Moong Dal Chillas + 100g Grated Paneer filling + Mint Chutney",
            calories: "640 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chole Masala with Soya Chunks & Jeera Brown Rice",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Bench Press Strength Influx",
            nutrients: "1.5 Cups Chickpeas + 60g Soya Chunks + 1 Cup Brown Rice + Fresh Curd",
            calories: "760 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Rolled Oats with Honey, Chia & Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Carb Release",
            nutrients: "60g Oats + 1 tbsp Honey + 1 tsp Chia + Double Shot Espresso",
            calories: "330 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Protein Smoothie with Banana & Peanut Butter",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Glycogen & Amino Load",
            nutrients: "1.5 Scoops Protein + 1 Banana + 1 tbsp Peanut Butter + Skim Milk",
            calories: "440 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer Jalfrezi with 3 Whole Wheat Rotis & Salad",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Upper Body Night Synthesis",
            nutrients: "150g Paneer with Capsicum & Onion + 3 Phulkas + Fresh Cucumber",
            calories: "680 kcal"
          }
        ],
        Wed: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Overnight Chia Protein Pudding with Kiwi & Walnuts",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Gentle Systemic Fuel",
            nutrients: "3 tbsp Chia + 1 Scoop Protein + Sliced Kiwi + 10 Walnuts + Honey",
            calories: "620 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Soya Granule & Pea Pulao with Sprouted Moong Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Plant Amino Density",
            nutrients: "60g Soya Granules + 1 Cup Basmati Rice + Green Peas + Curd Bowl",
            calories: "730 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Whole Wheat Toast with Almond Butter & Honey",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Active Recovery Pre-Fuel",
            nutrients: "2 Slices Toast + 1.5 tbsp Almond Butter + 1 tbsp Honey + Coffee",
            calories: "340 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Isolate Shake & 2 Medjool Dates",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Immediate Muscle Shuttling",
            nutrients: "1.5 Scoops Whey + 300ml Water + 2 Large Dates",
            calories: "380 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Dal Makhani with Jeera Brown Rice & Tawa Paneer",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deep CNS Recovery",
            nutrients: "1 Cup Black Lentil Dal + 1 Cup Jeera Rice + 100g Grilled Paneer",
            calories: "690 kcal"
          }
        ],
        Thu: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Masala Scrambled Tofu with Multigrain Sourdough",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Heavy Deadlift Day Breakfast",
            nutrients: "160g Tofu Bhurji + 2 Sourdough Slices + 1 Glass Almond Milk + 1 Banana",
            calories: "630 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Black Eyed Peas (Lobia) with Quinoa & Roasted Paneer",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Maximum Density Fuel",
            nutrients: "1.5 Cups Lobia Curry + 1 Cup Steamed Quinoa + 100g Tawa Paneer + Salad",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Baked Sweet Potato with Cinnamon & Salt",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deadlift Performance Carbohydrate",
            nutrients: "220g Baked Sweet Potato + Himalayan Salt + Double Espresso",
            calories: "320 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Greek Yogurt Bowl with Granola & Whey Isolate",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Sustained Posterior Chain Recovery",
            nutrients: "180g Greek Yogurt + 1 Scoop Whey + 30g High Protein Granola",
            calories: "430 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer Kadai with 3 Multigrain Phulkas & Salad",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Full Body Structural Repair",
            nutrients: "150g Paneer Kadai + 3 Phulkas + Fresh Cucumber & Carrot Sticks",
            calories: "680 kcal"
          }
        ],
        Fri: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Sprouted Moong & Paneer Salad with Wholewheat Toast",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Micronutrient Power",
            nutrients: "1 Cup Boiled Moong + 100g Paneer Cubes + 2 Toast Slices + Fresh Orange",
            calories: "620 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Yellow Dal Tadka with Paneer Bhurji & Brown Rice",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Overhead Press Conditioning",
            nutrients: "1 Cup Dal + 120g Paneer Bhurji + 1 Cup Brown Rice + Fresh Radish Salad",
            calories: "750 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Fresh Fruit Bowl with Honey & Walnuts",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Clean Pre-Workout Energy",
            nutrients: "1 Apple + 1 Banana + 1 tbsp Honey + 6 Walnut Halves + Espresso",
            calories: "330 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Whey Protein Shake with Skim Milk & 2 Dates",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Deltoid Synthesis Influx",
            nutrients: "1.5 Scoops Whey + 300ml Skim Milk + 2 Soft Medjool Dates",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Grilled Soya Chaap with Mint Dip & Stir-Fried Beans",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Readiness Fuel",
            nutrients: "170g Tandoori Soya Chaap + Mint Yogurt Dip + Sauteed Green Beans",
            calories: "660 kcal"
          }
        ],
        Sat: [
          {
            id: 1,
            time: "07:30 AM - 08:15 AM",
            mealType: "Breakfast",
            title: "Fluffy Oatmeal Protein Pancakes with Chia & Berries",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: High Plant Glycogen Start",
            nutrients: "3 Oat & Whey Pancakes + 1 tbsp Maple Syrup + Fresh Blueberries + Almond Milk",
            calories: "640 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Chickpea Quinoa Power Bowl with Tahini & Avocado",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Strongman Functional Fuel",
            nutrients: "1.5 Cups Chickpeas + 1 Cup Quinoa + 1/2 Avocado + 2 tbsp Sesame Tahini",
            calories: "760 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Dark Chocolate (85%) with Banana & Double Espresso",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Vasodilation & Nitric Oxide Boost",
            nutrients: "25g Dark Chocolate + 1 Banana + Double Espresso",
            calories: "320 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "Pea & Rice Protein Isolate in Coconut Water",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Electrolyte & Muscle Hydration",
            nutrients: "1.5 Scoops Plant Protein + 350ml Pure Coconut Water + 1 Rice Cake",
            calories: "390 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Paneer Jalfrezi with 3 Whole Wheat Phulkas & Salad",
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Weekend Functional Power",
            nutrients: "150g Paneer with Capsicum & Onion + 3 Phulkas + Fresh Cucumber",
            calories: "680 kcal"
          }
        ],
        Sun: [
          {
            id: 1,
            time: "08:00 AM - 08:45 AM",
            mealType: "Breakfast",
            title: "Vegetable Poha with Roasted Peanuts & Paneer Cubes",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rest Day Digestive Reset",
            nutrients: "Flattened Rice with Veggies + 70g Paneer Cubes + Roasted Peanuts",
            calories: "530 kcal"
          },
          {
            id: 2,
            time: "12:30 PM - 01:15 PM",
            mealType: "Lunch",
            title: "Five-Lentil Panchratna Dal with Brown Rice & Paneer",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: 5-Lentil Complete Protein",
            nutrients: "Five-Lentil Traditional Dal + 1 Cup Brown Rice + 80g Paneer + Salad",
            calories: "710 kcal"
          },
          {
            id: 3,
            time: "04:30 PM - 05:00 PM",
            mealType: "Pre-Workout",
            title: "Medjool Dates filled with Almond Butter",
            image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Easy Digesting Fuel",
            nutrients: "2 Large Dates + 1 tbsp Almond Butter + Green Tea",
            calories: "280 kcal"
          },
          {
            id: 4,
            time: "07:00 PM - 07:30 PM",
            mealType: "Post-Workout",
            title: "High Protein Milkshake with Whey & Flaxseeds",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Restorative CNS Nourishment",
            nutrients: "1 Scoop Whey + 300ml Milk + 1 Banana + 1 tbsp Ground Flaxseeds",
            calories: "410 kcal"
          },
          {
            id: 5,
            time: "08:45 PM - 09:30 PM",
            mealType: "Dinner",
            title: "Tofu & Green Pea Stir-Fry with Steamed Rice",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            portion: "Portion: Rest Day Muscular Replenishment",
            nutrients: "150g Tofu + Green Peas + 1 Cup Steamed Rice + Olive Oil",
            calories: "630 kcal"
          }
        ]
      }
    }
  }
};

export const dailyWorkoutSynergy = {
  Mon: {
    focus: "Push Day: Chest, Shoulders & Triceps",
    preTip: "Focus on rapid-absorbing carbohydrates and nitric oxide boosters to maximize bench press chest pump.",
    postTip: "Prioritize fast leucine delivery and glycogen loading to kickstart pectoral muscle protein synthesis."
  },
  Tue: {
    focus: "Pull Day: Back, Lats & Biceps",
    preTip: "Sustained-release carbohydrates to fuel heavy rows, pull-ups, and intense lat contraction.",
    postTip: "High-bioavailability amino acids and magnesium to relieve central back tension and bicep recovery."
  },
  Wed: {
    focus: "Leg Day: Quads, Hamstrings & Glutes",
    preTip: "Maximum glycogen pre-load! Extra electrolytes and complex carbs to endure high-volume squatting.",
    postTip: "Deep glycogen replenishment with fast carbs and protein to prevent leg DOMS and accelerate repair."
  },
  Thu: {
    focus: "Upper Body Hypertrophy & Deltoids",
    preTip: "Clean caffeine and moderate carbs for shoulder joint stability and overhead pressing stamina.",
    postTip: "Steady protein synthesis with anti-inflammatory healthy fats to nourish the rotator cuffs."
  },
  Fri: {
    focus: "Arms & Core Conditioning",
    preTip: "Hydration and quick sugars to drive massive blood flow and vascular pump into arms and core.",
    postTip: "Rapid amino acid shuttling to maximize arm hypertrophy and repair rectus abdominis fibers."
  },
  Sat: {
    focus: "Full-Body Heavy Compound Strength",
    preTip: "Dense caloric fuel with sodium and caffeine to power multi-joint deadlifts and compound lifts.",
    postTip: "Comprehensive protein + high electrolyte hydration to reboot your entire central nervous system."
  },
  Sun: {
    focus: "Rest, Mobility & Deep Recovery",
    preTip: "Gentle hydration, herbal infusions, and antioxidant-rich light fuel for cellular renewal.",
    postTip: "Slow-digesting proteins and essential fatty acids for complete tendon and joint reconstruction."
  }
};

export const getDynamicMealOptions = (meal, goal = "bulking", diet = "non-vegetarian", day = "Mon") => {
  if (!meal) return [];
  const type = meal.mealType;

  if (type === "Pre-Workout") {
    if (goal === "weightLoss") {
      return [
        {
          id: "pre-opt-1",
          label: "Light Whole Food",
          icon: "🍎",
          badge: "Clean Fuel",
          title: "Green Apple Slices with Ceylon Cinnamon & Black Americano",
          image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Thermogenic Pre-Fuel",
          nutrients: "1 Crisp Green Apple + 1 Freshly Brewed Black Americano + Ceylon Cinnamon",
          calories: "95 kcal"
        },
        {
          id: "pre-opt-2",
          label: "Express Energy Drink",
          icon: "☕",
          badge: "Fat Oxidation",
          title: "Iced Cold Brew with 10g Whey Isolate & Mint",
          image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Fast Liquid Focus",
          nutrients: "Double Shot Cold Brew Coffee + 10g Whey Isolate + Fresh Mint Leaves",
          calories: "75 kcal"
        },
        {
          id: "pre-opt-3",
          label: "Grab & Go Snack",
          icon: "⚡",
          badge: "Low Calorie",
          title: "1 Whole Grain Rice Cake with Pinch Sea Salt & Green Tea",
          image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Minimal Calorie Spark",
          nutrients: "1 Brown Rice Cake + Pink Himalayan Salt + 1 Cup Hot Green Tea",
          calories: "50 kcal"
        }
      ];
    }

    if (goal === "strength") {
      return [
        {
          id: "pre-opt-1",
          label: "Whole Food Load",
          icon: "🍯",
          badge: "Glycogen Surge",
          title: "Toasted Sourdough with Raw Honey, Banana & Pink Salt",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Power Lifter Pre-Load",
          nutrients: "2 Slices Artisan Sourdough + 2 tbsp Raw Honey + 1 Banana + Himalayan Pink Salt + Espresso",
          calories: "370 kcal"
        },
        {
          id: "pre-opt-2",
          label: "Express Power Shake",
          icon: "🥤",
          badge: "ATP Recharge",
          title: "Oatmeal Espresso & Honey Velocity Smoothie",
          image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: High-Velocity Liquid Carbs",
          nutrients: "50g Blended Oats + 1 Banana + 1 tbsp Honey + Double Espresso Shot + Water",
          calories: "350 kcal"
        },
        {
          id: "pre-opt-3",
          label: "Dense Energy Bites",
          icon: "⚡",
          badge: "Fast Electrolytes",
          title: "3 Rice Cakes with Peanut Butter, Banana & Sea Salt",
          image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Cellular ATP Fuel",
          nutrients: "3 Rice Cakes + 2 tbsp Natural Peanut Butter + 1 Banana + Pink Salt + Coffee",
          calories: "360 kcal"
        }
      ];
    }

    // Bulking Default
    return [
      {
        id: "pre-opt-1",
        label: "Whole Food Meal",
        icon: "🍌",
        badge: "Solid Carbs",
        title: "Peanut Butter Rice Cakes & Banana Fuel",
        image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: Rapid Glycogen Surge",
        nutrients: "3 Rice Cakes + 2 tbsp Natural Peanut Butter + 1 Ripe Banana + Black Coffee",
        calories: "340 kcal"
      },
      {
        id: "pre-opt-2",
        label: "Express Mass Smoothie",
        icon: "🥤",
        badge: "Rapid Digestion",
        title: "Rolled Oats, Dark Cocoa & Banana Energy Shake",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: High Glycogen Shake",
        nutrients: "45g Rolled Oats + 1 Banana + 1 tbsp Pure Cocoa + 1 tbsp Honey + Skim Milk",
        calories: "360 kcal"
      },
      {
        id: "pre-opt-3",
        label: "Quick Grab & Go",
        icon: "⚡",
        badge: "Fast Vasodilation",
        title: "Dark Chocolate (85%) & Medjool Dates with Espresso",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: Nitric Oxide Boost",
        nutrients: "25g 85% Dark Chocolate + 2 Large Medjool Dates + Double Shot Espresso",
        calories: "290 kcal"
      }
    ];
  }

  if (type === "Post-Workout") {
    if (goal === "weightLoss") {
      return [
        {
          id: "post-opt-1",
          label: "Zero-Carb Shake",
          icon: "🥤",
          badge: "Pure Amino Influx",
          title: "Whey Isolate Recovery in Chilled Water & 5g Glutamine",
          image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Fast Nitrogen Balance",
          nutrients: "1 Scoop Whey Isolate (25g Protein) in 350ml Chilled Water + 5g L-Glutamine",
          calories: "120 kcal"
        },
        {
          id: "post-opt-2",
          label: "Lean Solid Plate",
          icon: "🥚",
          badge: "High Satiety",
          title: "4 Boiled Egg Whites with Black Pepper & Asparagus",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Whole Food Recovery",
          nutrients: "4 Hard-Boiled Egg Whites + Steamed Green Asparagus + Cracked Pepper",
          calories: "140 kcal"
        },
        {
          id: "post-opt-3",
          label: "Probiotic Cup",
          icon: "🥣",
          badge: "Muscle Sparing",
          title: "Non-Fat Greek Yogurt Bowl with Crushed Walnuts",
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Slow & Steady Amino Delivery",
          nutrients: "160g Non-Fat Greek Yogurt + 4 Crushed Walnut Halves + Ground Cinnamon",
          calories: "160 kcal"
        }
      ];
    }

    if (goal === "strength") {
      return [
        {
          id: "post-opt-1",
          label: "ATP Recovery Shake",
          icon: "⚡",
          badge: "Creatine Load",
          title: "Whey Isolate + 5g Creatine in Tender Coconut Water",
          image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Heavy Pull CNS Replenishment",
          nutrients: "1.5 Scoops Whey + 5g Creatine Monohydrate + 350ml Coconut Water + 1 Banana",
          calories: "430 kcal"
        },
        {
          id: "post-opt-2",
          label: "Solid Whole Plate",
          icon: "🥩",
          badge: "Tissue Reconstruction",
          title: diet === "vegetarian"
            ? "Grilled Paneer Tikka & Sweet Potato Mash with Mint Dip"
            : "4 Hard-Boiled Eggs on Toasted Sourdough with Raw Honey",
          image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Structural Repair Plate",
          nutrients: diet === "vegetarian"
            ? "140g Tawa Paneer + 200g Steamed Sweet Potato + Mint Yogurt Dip"
            : "4 Eggs (2 Whole + 2 Whites) on 2 Slices Sourdough with Pure Honey",
          calories: "450 kcal"
        },
        {
          id: "post-opt-3",
          label: "High Glycogen Fuel",
          icon: "🍞",
          badge: "Fast Supercompensation",
          title: "Whey Protein Shake with White Bread & Fruit Jam",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
          portion: "Portion: Insulin Spike Amino Transport",
          nutrients: "1.5 Scoops Whey in 300ml Milk + 2 White Bread Slices with Strawberry Jam",
          calories: "440 kcal"
        }
      ];
    }

    // Bulking Default
    return [
      {
        id: "post-opt-1",
        label: "Anabolic Shake",
        icon: "🥤",
        badge: "Fast Protein Synthesis",
        title: "Whey Isolate Recovery Shake with Skim Milk & Date",
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: Anabolic Muscle Synthesis",
        nutrients: "1.5 Scoops Whey Isolate + 300ml Skim Milk + 4 Boiled Egg Whites + 1 Medjool Date",
        calories: "410 kcal"
      },
      {
        id: "post-opt-2",
        label: "Whole Food Plate",
        icon: "🍳",
        badge: "Complete Protein",
        title: diet === "vegetarian"
          ? "Grilled Paneer Cubes with Steamed Sweet Potato & Curd"
          : "4 Boiled Eggs on Sourdough Toast & Honey",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: Whole Food Hypertrophy",
        nutrients: diet === "vegetarian"
          ? "140g Grilled Paneer + 1 Large Sweet Potato + 100g Fresh Curd"
          : "4 Whole Eggs / Whites + 2 Slices Wholewheat Sourdough + 1 tbsp Honey",
        calories: "430 kcal"
      },
      {
        id: "post-opt-3",
        label: "Hydration Recovery",
        icon: "🥥",
        badge: "Electrolyte Surge",
        title: "Hydrolyzed Whey in Pure Coconut Water & Rice Cakes",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
        portion: "Portion: Cellular Hydration",
        nutrients: "1.5 Scoops Whey Isolate + 350ml Fresh Coconut Water + 2 Rice Cakes",
        calories: "390 kcal"
      }
    ];
  }

  return [];
};

