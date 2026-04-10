import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);

// Health Routes
app.use("/api", healthRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// ✅ ONLY ONE PORT + ONE LISTEN
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});