const express = require('express');
const passport = require('passport');

const router = express.Router();

// POST /auth/login using a custom callback for JSON responses
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Internal server error while authenticating
      return next(err);
    }
    if (!user) {
      // Authentication failed – respond with a JSON error message
      return res.status(401).json({ message: info ? info.message : 'Login failed' });
    }
    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Successful login – return a JSON response
      return res.status(200).json({ user });
    });
  })(req, res, next);
});


// GET /api/auth/user
router.get('/user',
  (req, res) => {
      if (req.isAuthenticated()) {
        const { employee_id, employee_name, position } = req.user;
        return res.json({ employee_id, employee_name, position });
      }
      return res.status(401).json({ message: 'Not authenticated' });
    }
  );


// GET /auth/logout to destroy the session
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router;
