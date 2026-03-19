import { calculateBMI, calculateBMR, calculateTDEE } from "../utils/calculations.js";

export function calculateHealth(req, res) {
  let { age, height, weight, activityLevel, goal } = req.body;

  // 🧠 Convert age range → number
  if (typeof age === "string" && age.includes("-")) {
    const [min, max] = age.split("-").map(Number);
    age = Math.round((min + max) / 2); // average
  }

  // 🧠 Convert activity text → multiplier
  let activityMap = {
    "Sedentary (little or no exercise)": 1.2,
    "Lightly Active (1-3 days/week)": 1.375,
    "Moderately Active (3-5 days/week)": 1.55,
    "Very Active (6-7 days/week)": 1.725,
    "Extra Active (athlete/physical job)": 1.9,
  };

  const activityMultiplier = activityMap[activityLevel] || 1.2;

  // 🧠 Convert goal text
  let normalizedGoal = "maintain";

  if (goal.includes("Muscle")) {
    normalizedGoal = "muscle_gain";
  } else if (goal.includes("Fat")) {
    normalizedGoal = "fat_loss";
  }

  // 🧠 Calculations
  const bmi = calculateBMI(height, weight);
  const bmr = calculateBMR(age, height, weight);
  const tdee = bmr * activityMultiplier;

  let recommendedCalories = tdee;

  if (normalizedGoal === "muscle_gain") {
    recommendedCalories += 300;
  } else if (normalizedGoal === "fat_loss") {
    recommendedCalories -= 300;
  }

  res.json({
    bmi: bmi.toFixed(2),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    recommendedCalories: Math.round(recommendedCalories),
  });
}