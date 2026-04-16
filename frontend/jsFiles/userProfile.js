const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("profile").innerHTML = `
  <h2>${user.firstName} ${user.lastName}</h2>
  <p>Username: ${user.username}</p>
  <p>Goal: ${user.goal}</p>
  <p>Calories: ${user.calories}</p>
  <p>Protein: ${user.protein}</p>
`;