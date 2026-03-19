import { calculateBMI, calculateBMR, calculateTDEE } from "../utils/calculations.js";

export function calculateHealth(req, res) {

  const { age, height, weight, activityLevel, goal } = req.body;

  if (!age || !height || !weight || !activityLevel || !goal) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  const bmi = calculateBMI(height, weight);
  const bmr = calculateBMR(age, height, weight);
  const tdee = calculateTDEE(bmr, activityLevel);

  let recommendedCalories = tdee;

  if (goal === "muscle_gain") {
    recommendedCalories += 300;
  } 
  else if (goal === "fat_loss") {
    recommendedCalories -= 300;
  }

  res.json({
    bmi,
    bmr,
    tdee,
    recommendedCalories
  });
}