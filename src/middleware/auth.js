const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    const adminEmail = 'batrakova.yulia@gmail.com'; 

    req.user.is_admin = req.user.email === adminEmail;
    
    return next(); 
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
};

module.exports = ensureAuthenticated;
