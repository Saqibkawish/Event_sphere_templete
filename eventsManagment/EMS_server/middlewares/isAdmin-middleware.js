// isAdmin-middleware.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // Allow access
    } else {
      res.status(403).json({ message: 'Access Denied. Admin role required.' });
    }
  };
  
  module.exports = isAdmin;