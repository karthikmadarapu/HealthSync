document.addEventListener('DOMContentLoaded', function () {

    // Close modal when clicking outside
    document.getElementById('signupModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    // =========================
    // CALCULATOR (UNCHANGED)
    // =========================
    const form = document.getElementById("healthForm");

    if (form) {
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
                        <p>📊 <strong>BMI:</strong> ${data.bmi}</p>
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
    }

    // =========================
    // PROFILE ICON LOGIC
    // =========================
    const profileBtn = document.getElementById("profileBtn");

    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            const user = localStorage.getItem("user");

            if (user) {
                window.location.href = "profile.html";
            } else {
                openModal();
            }
        });
    }
});


// =========================
// MODAL FUNCTIONS
// =========================

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

    document.querySelectorAll('.goal-btn.selected')
        .forEach(b => b.classList.remove('selected'));
}


// =========================
// STEP NAVIGATION
// =========================

function goToStep2() {
    const firstName = document.getElementById('firstName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName || !username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
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


// =========================
// GOALS
// =========================

function toggleGoal(btn) {
    const selected = document.querySelectorAll('.goal-btn.selected');

    if (!btn.classList.contains('selected') && selected.length >= 3) {
        alert('You can only pick up to 3 goals.');
        return;
    }

    btn.classList.toggle('selected');
}


// =========================
// SIGNUP (REAL BACKEND)
// =========================

async function submitSignup() {

    const selectedGoals = [...document.querySelectorAll('.goal-btn.selected')]
        .map(btn => btn.dataset.value);

    if (selectedGoals.length === 0) {
        alert('Please select at least one goal.');
        return;
    }

    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        goals: selectedGoals
    };

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(user));

            document.getElementById('step3').style.display = 'none';
            document.getElementById('step4').style.display = 'block';
        } else {
            alert(data.error);
        }

    } catch (err) {
        alert("Server error");
        console.error(err);
    }
}


// =========================
// LOGIN (REAL BACKEND)
// =========================

async function handleSignIn() {

    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    if (!username || !password) {
        alert('Please enter your username and password.');
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "profile.html";
        } else {
            alert("Invalid credentials");
        }

    } catch (err) {
        alert("Server error");
        console.error(err);
    }
}