import express from "express";
import { calculateHealth } from "../controllers/healthController.js";

const router = express.Router();

router.post("/health", calculateHealth);

export default router;