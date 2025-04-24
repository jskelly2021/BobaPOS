// server/middleware/authMiddleware.js

// ensure the user is logged in
function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  // allow only the listed positions
  function requireRole(...allowedRoles) {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      const { position } = req.user;              // passport.deserializeUser put this on req.user
      if (allowedRoles.includes(position)) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    };
  }
  
  module.exports = { ensureLoggedIn, requireRole };
  