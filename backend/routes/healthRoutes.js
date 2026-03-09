const express = require("express");
const router = express.Router();

const {
  calculateHealth
} = require("../controllers/healthController");

router.post("/calculate-health", calculateHealth);

module.exports = router;
