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
      <p>📊 BMI: ${data.bmi}</p>
      <p>🔥 BMR: ${data.bmr}</p>
      <p>⚡ TDEE: ${data.tdee}</p>
      <p>🍽 Calories: ${data.recommendedCalories}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ Server error";
    console.error(err);
  }
});