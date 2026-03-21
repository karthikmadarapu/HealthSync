document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside
    document.getElementById('signupModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Calculator form
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ age, height, weight, activityLevel, goal }),
            });

            const data = await res.json();

            resultDiv.innerHTML = `
                <div style="background:#111;color:white;padding:20px;border-radius:12px;margin-top:10px;">
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
});

// ── Modal functions (global) ──────────────────────────

function openModal() {
    document.getElementById('signupModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('signupModal').style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'none';
    document.querySelectorAll('.goal-btn.selected').forEach(b => b.classList.remove('selected'));
}

function goToStep2() {
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!firstName || !email || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function goToStep3() {
    const age = document.getElementById('mAge').value;
    const weight = document.getElementById('mWeight').value;
    const activity = document.getElementById('mActivity').value;

    if (!age || !weight || !activity) {
        alert('Please fill in all fields.');
        return;
    }

    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

function goBackToStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function goBackToStep2() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function toggleGoal(btn) {
    const selected = document.querySelectorAll('.goal-btn.selected');
    if (!btn.classList.contains('selected') && selected.length >= 3) {
        alert('You can only pick up to 3 goals.');
        return;
    }
    btn.classList.toggle('selected');
}

function submitSignup() {
    const selected = document.querySelectorAll('.goal-btn.selected');
    if (selected.length === 0) {
        alert('Please select at least one goal.');
        return;
    }

    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
}

function handleSignIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    if (!username || !password) {
        alert('Please enter your username and password.');
        return;
    }

    const modalBox = document.querySelector('.modal-box');
    modalBox.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color:#CCFF00; font-size:2rem; margin-bottom:0.75rem;">
                Welcome, ${username}!
            </h2>
            <p style="color:#aaa; margin-bottom:2rem; font-size:1rem; line-height:1.6;">
                Your HealthSync profile is all set.<br>Start your fitness journey today!
            </p>
            <button class="btn btn-primary btn-large" onclick="closeModal()" 
                style="width:100%;">Let's Go 🚀</button>
        </div>
    `;
}