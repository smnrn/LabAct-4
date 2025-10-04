const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Auth middleware factory function
const auth = (required = false) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      if (required) {
        return res.status(401).json({ error: 'Access token required' });
      }
      return next(); // Optional auth, continue without user
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if token is revoked
      db.query('SELECT jti FROM revoked_tokens WHERE jti = ?', [payload.jti], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (rows.length > 0) {
          return res.status(401).json({ error: 'Token has been revoked' });
        }
        
        // Attach user info to request
        req.user = {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
          jti: payload.jti
        };
        
        next();
      });
    } catch (error) {
      if (required) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
      next(); // Optional auth, continue without user
    }
  };
};

module.exports = auth;