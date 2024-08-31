const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: 'Access denied. Please log in.' });
    }
  };
  
  module.exports = ensureAuthenticated;
  

