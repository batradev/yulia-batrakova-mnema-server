const isAdmin = require("../utils/admin");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.user.is_admin = isAdmin(req.user.email);
    return next();
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
};

const ensureUserIsAdmin = (req, res, next) => {
  if (isAdmin(req.user.email)) {
    return next();
  } else {
    res
      .status(401)
      .json({
        message: "Access denied. You don't have permissions for this resource.",
      });
  }
};

module.exports = ensureAuthenticated;
module.exports = {
  ensureAuthenticated,
  ensureUserIsAdmin,
};
