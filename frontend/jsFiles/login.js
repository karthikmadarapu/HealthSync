document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "profile.html";
  } else {
    alert("Invalid credentials");
  }
});