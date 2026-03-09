export function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

export function calculateBMR(age, height, weight) {
  // Mifflin-St Jeor formula (male version for now)
  return (10 * weight + 6.25 * height - 5 * age + 5);
}

export function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    low: 1.2,
    moderate: 1.55,
    high: 1.75
  };

  return (bmr * activityMultipliers[activityLevel]).toFixed(0);
}

