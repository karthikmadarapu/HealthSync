import { calculateBMI, calculateBMR, calculateTDEE } from "../utils/calculations";

export function calculateHealth(req, res) {
  const { age, height, weight, activityLevel, goal } = req.body;

  const bmi = calculateBMI(height, weight);
  const bmr = calculateBMR(age, height, weight);
  const tdee = calculateTDEE(bmr, activityLevel);

  let recommendedCalories = tdee;

  if (goal === "muscle_gain") {
    recommendedCalories += 300;
  } else if (goal === "fat_loss") {
    recommendedCalories -= 300;
  }

  res.json({
    bmi,
    bmr,
    tdee,
    recommendedCalories
  });
}
