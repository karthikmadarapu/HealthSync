const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

function issueJWT(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// ─── Google ───────────────────────────────────────────
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = issueJWT(req.user);
    // Send token to React app via URL param (React reads it and stores it)
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// ─── Facebook ─────────────────────────────────────────
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = issueJWT(req.user);
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// ─── Get current user (protected route) ───────────────
router.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;