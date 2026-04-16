
let userData = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    goals: [],
    metrics: {}
};



// =========================
// DOM READY (ONLY EVENTS HERE)
// =========================
document.addEventListener('DOMContentLoaded', function () {

    const signupModal = document.getElementById('signupModal');
    if (signupModal) {
        signupModal.addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });
    }

    const profileBtn = document.getElementById("profileBtn");
    if (profileBtn) {
        profileBtn.addEventListener("click", openModal);
    }

    // =========================
    // CALCULATOR
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
               const res = await fetch("https://healthsync-backend-fleh.onrender.com/api/health", { 
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

});


// =========================
// STEP SWITCH
// =========================
function switchStep(current, next) {
    const currentEl = document.getElementById(current);
    const nextEl = document.getElementById(next);

    currentEl.classList.remove("modal-step-active");
    currentEl.classList.add("modal-step-hidden");

    setTimeout(() => {
        nextEl.classList.remove("modal-step-hidden");
        nextEl.classList.add("modal-step-active");
    }, 150);
}


// =========================
// MODAL
// =========================
function openModal() {
    document.getElementById('signupModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    document.querySelectorAll('.modal-step').forEach(step => {
        step.classList.remove("modal-step-active");
        step.classList.add("modal-step-hidden");
    });

    document.getElementById('step0').classList.add("modal-step-active");
    document.getElementById('step0').classList.remove("modal-step-hidden");
}

function closeModal() {
    document.getElementById('signupModal').style.display = 'none';
    document.body.style.overflow = '';

    document.querySelectorAll('.goal-btn.selected')
        .forEach(b => b.classList.remove('selected'));
}


// =========================
// PASSWORD TOGGLE
// =========================
function togglePassword() {
    const input = document.getElementById("authPassword");
    input.type = input.type === "password" ? "text" : "password";
}


// =========================
// STEP NAVIGATION
// =========================
function goToStep1FromAuth() {
    const email = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;
    const terms = document.getElementById("authTerms").checked;

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }
    if (!terms) {
        alert("Please accept terms.");
        return;
    }
    userData.email = email;
    userData.password = password;

    const btn = document.querySelector("#step0 .btn-primary");
    btn.classList.add("btn-loading");

    setTimeout(() => {
        btn.classList.remove("btn-loading");
        switchStep("step0", "step1");
    }, 600);
}

function goToStep2() {
    const firstName = document.getElementById('firstName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    userData.firstName = firstName;
    userData.username = username;
    userData.password = password;

    if (!firstName || !username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    switchStep("step1", "step2");
}


function goBackToAuth() {
    switchStep("step1", "step0");
}

function goBackToStep1() {
    switchStep("step2", "step1");
}

function goBackToStep2() {
    switchStep("step3", "step2");
}

// =========================
// UNIT TOGGLE STATE
// STEP 3 AND SIGNUP MERGED 
// =========================
let heightUnit = 'ft';   // 'ft' or 'cm'
let weightUnit = 'lbs';  // 'lbs' or 'kg'

function setHeightUnit(unit) {
  heightUnit = unit;

  // Toggle button styles
  document.getElementById('heightFtBtn').classList.toggle('active', unit === 'ft');
  document.getElementById('heightCmBtn').classList.toggle('active', unit === 'cm');

  // Show/hide fields
  document.getElementById('heightFtFields').style.display = unit === 'ft' ? 'grid' : 'none';
  document.getElementById('heightCmFields').style.display = unit === 'cm' ? 'block' : 'none';

  // Update placeholder on weight (not needed but keep weight label consistent)
  // Convert current value if already entered
  const ft = parseFloat(document.getElementById('mHeightFt').value);
  const inches = parseFloat(document.getElementById('mHeightIn').value) || 0;
  const cm = parseFloat(document.getElementById('mHeightCm').value);

  if (unit === 'cm' && ft) {
    // Convert ft+in → cm
    document.getElementById('mHeightCm').value = Math.round((ft * 30.48) + (inches * 2.54));
  } else if (unit === 'ft' && cm) {
    // Convert cm → ft+in
    const totalInches = cm / 2.54;
    document.getElementById('mHeightFt').value = Math.floor(totalInches / 12);
    document.getElementById('mHeightIn').value = Math.round(totalInches % 12);
  }
}

function setWeightUnit(unit) {
  weightUnit = unit;

  document.getElementById('weightLbsBtn').classList.toggle('active', unit === 'lbs');
  document.getElementById('weightKgBtn').classList.toggle('active', unit === 'kg');

  const input = document.getElementById('mWeight');
  const val = parseFloat(input.value);

  if (unit === 'kg' && val) {
    // Convert lbs → kg
    input.value = Math.round(val / 2.205);
  } else if (unit === 'lbs' && val) {
    // Convert kg → lbs
    input.value = Math.round(val * 2.205);
  }

  input.placeholder = unit === 'kg' ? 'Weight (kg)' : 'Weight (lbs)';
}

// =========================
// STEP 3 — reads height + weight in correct unit, always stores in metric (cm / kg)
// =========================
function goToStep3() {
  let heightCm, weightKg;

  // ── HEIGHT ──
  if (heightUnit === 'ft') {
    const ft = parseFloat(document.getElementById('mHeightFt').value);
    const inches = parseFloat(document.getElementById('mHeightIn').value) || 0;
    if (!ft) { alert('Please enter your height.'); return; }
    heightCm = Math.round((ft * 30.48) + (inches * 2.54));
  } else {
    heightCm = parseFloat(document.getElementById('mHeightCm').value);
    if (!heightCm) { alert('Please enter your height.'); return; }
  }

  // ── WEIGHT ──
  const rawWeight = parseFloat(document.getElementById('mWeight').value);
  if (!rawWeight) { alert('Please enter your weight.'); return; }
  weightKg = weightUnit === 'kg' ? rawWeight : Math.round(rawWeight / 2.205);

  const age      = document.getElementById('mAge').value;
  const gender   = document.getElementById('mGender').value;
  const activity = document.getElementById('mActivity').value;

  if (!age || !activity) {
    alert('Please fill in all required fields.');
    return;
  }

  // Store raw display values + converted metric values
  userData.metrics = {
    age,
    gender,
    activity,

    // Display values (what user typed)
    heightFt: heightUnit === 'ft' ? document.getElementById('mHeightFt').value : null,
    heightIn: heightUnit === 'ft' ? document.getElementById('mHeightIn').value : null,
    heightCm: heightUnit === 'cm' ? heightCm : null,
    heightDisplay: heightUnit === 'ft'
      ? `${document.getElementById('mHeightFt').value}ft ${document.getElementById('mHeightIn').value || 0}in`
      : `${heightCm}cm`,

    weightDisplay: `${rawWeight} ${weightUnit}`,
    weight: weightKg,        // always kg for API
    weightKg,
    heightMetricCm: heightCm // always cm for API
  };

  switchStep('step2', 'step3');
}


// =========================
// SIGNUP — uses metric values for health API
// =========================
async function submitSignup() {
  const selectedGoals = [...document.querySelectorAll('.goal-btn.selected')]
    .map(btn => btn.dataset.value);

  if (selectedGoals.length === 0) {
    alert('Please select at least one goal.');
    return;
  }

  const user = {
    email:     document.getElementById('authEmail').value,
    firstName: document.getElementById('firstName').value,
    lastName:  document.getElementById('lastName')?.value || '',
    username:  document.getElementById('username').value,
    password:  document.getElementById('password').value,
    goals:     selectedGoals,
    metrics:   userData.metrics
  };

  try {
    // Call health API with metric values
    const res2 = await fetch('https://healthsync-backend-fleh.onrender.com/api/health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age:           user.metrics.age,
        height:        user.metrics.heightMetricCm,  // cm
        weight:        user.metrics.weightKg,         // kg
        activityLevel: user.metrics.activity,
        goal:          selectedGoals[0]
      })
    });

    const healthData = await res2.json();

    // Attach macros from health response
    const calories = healthData.recommendedCalories;
    healthData.macros = {
      protein: Math.round(calories * 0.30 / 4),
      carbs:   Math.round(calories * 0.40 / 4),
      fat:     Math.round(calories * 0.30 / 9)
    };

    user.health = healthData;

    localStorage.setItem('user', JSON.stringify(user));
    console.log('FINAL USER:', user);

    window.location.href = '/htmlFiles/userProfile.html';

  } catch (err) {
    console.error('Health API failed:', err);
    alert('Something went wrong. Try again.');
  }
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
// LOGIN
// =========================
async function handleSignIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    if (!username || !password) {
        alert('Please enter your username and password.');
        return;
    }

    try {
        const res = await fetch("https://healthsync-backend-fleh.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "userProfile.html";
        } else {
            alert("Invalid credentials");
        }
    } catch (err) {
        alert("Server error");
        console.error(err);
    }
}

function showSignIn() {
    switchStep("step0", "step4");
}


// =========================
// RESULT MODAL
// =========================
function showResultModal(data) {
    const calories = data.recommendedCalories;

    const protein = Math.round(calories * 0.3 / 4);
    const carbs = Math.round(calories * 0.4 / 4);
    const fats = Math.round(calories * 0.3 / 9);

    document.getElementById("macroResults").innerHTML = `
        <p><strong>Calories:</strong> ${calories} kcal</p>
        <p><strong>Protein:</strong> ${protein}g</p>
        <p><strong>Carbs:</strong> ${carbs}g</p>
        <p><strong>Fats:</strong> ${fats}g</p>
    `;

    document.getElementById("resultModal").style.display = "block";
}




