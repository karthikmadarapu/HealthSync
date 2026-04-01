document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value
  };

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await res.json();

  if (res.ok) {
    alert("Signup successful!");
    window.location.href = "login.html";
  } else {
    alert(data.error);
  }
});