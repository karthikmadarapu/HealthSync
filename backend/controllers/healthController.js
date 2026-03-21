import { calculateBMI, calculateBMR } from "../utils/calculations.js";

export function calculateHealth(req, res) {
  try {
    let { age, height, weight, activityLevel, goal } = req.body;

    // 🔹 Convert values to numbers (VERY IMPORTANT)
    age = Number(age);
    height = Number(height);
    weight = Number(weight);

    // 🔹 Handle invalid inputs
    if (!age || !height || !weight) {
      return res.status(400).json({ error: "Invalid input values" });
    }

    // 🔹 Activity multiplier mapping (matches frontend values)
    const activityMap = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9,
    };

    const activityMultiplier = activityMap[activityLevel] || 1.2;

    // 🔹 Calculations
    const bmi = Number(calculateBMI(height, weight));
    const bmr = calculateBMR(age, height, weight);
    const tdee = bmr * activityMultiplier;

    //Bmi Category
    let bmiCategory = "";

   if (bmi < 18.5) {
   bmiCategory = "Underweight";
   } else if (bmi < 25) {
  bmiCategory = "Normal";
  } else if (bmi < 30) {
  bmiCategory = "Overweight";
   } else {
  bmiCategory = "Obese";
  }

    // 🔹 Goal logic (FIXED ✅)
    let recommendedCalories = tdee;

    if (goal === "gain") {
      recommendedCalories += 300;
    } else if (goal === "lose") {
      recommendedCalories -= 300;
    }
    // maintain = no change

    // 🔹 Response
    res.json({
      bmi: bmi.toFixed(2),
      bmiCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      recommendedCalories: Math.round(recommendedCalories),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}