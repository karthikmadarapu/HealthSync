export function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters); 
}

export function calculateBMR(age, height, weight) {
  // Mifflin-St Jeor formula (male version for now)
  return (10 * weight + 6.25 * height - 5 * age + 5);
}


export function calculateTDEE(bmr, activityLevel) {

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  return Math.round(bmr * activityMultiplier[activityLevel]);
}


