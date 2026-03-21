const form = document.getElementById("healthForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultDiv = document.getElementById("result");
  const resultCard = document.getElementById("resultCard");

  resultCard.style.display = "block";
  resultDiv.innerHTML = "⏳ Calculating...";

  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const activityLevel = document.getElementById("activity").value;
  const goal = document.getElementById("goal").value;

  try {
    const res = await fetch("http://localhost:5000/api/health", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        height,
        weight,
        activityLevel,
        goal,
      }),
    });

    const data = await res.json();

   resultDiv.innerHTML = `
  <div style="
    background: #111;
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 10px;
  ">
    <h3 style="color:#a3ff12;">Your Fitness Stats</h3>

    <p>📊 <strong>BMI:</strong> ${data.bmi} (${data.bmiCategory})</p>
    <p>🔥 <strong>BMR:</strong> ${data.bmr} kcal</p>
    <p>⚡ <strong>TDEE:</strong> ${data.tdee} kcal</p>
    <p>🍽 <strong>Daily Calories:</strong> ${data.recommendedCalories} kcal</p>
  </div>
`;
  } catch (err) {
    resultDiv.innerHTML = "❌ Server error";
    console.error(err);
  }
});