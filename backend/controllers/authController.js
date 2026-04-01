let users = []; // temporary storage

export function signup(req, res) {
  const { firstName, lastName, username, password } = req.body;

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    firstName,
    lastName,
    username,
    password,
    goal: "maintain",
    calories: 2500,
    protein: 150
  };

  users.push(newUser);

  res.json({ message: "User created" });
}

export function login(req, res) {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.json({ user });
}