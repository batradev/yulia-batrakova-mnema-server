const ensureAuthenticated = (req, res, next) => {
  console.log("req.isAuthenticated(): ", req.isAuthenticated());
  console.log("req.user: ", req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
};

module.exports = ensureAuthenticated;
