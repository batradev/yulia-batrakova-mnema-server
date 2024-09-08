const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuthenticated = require("../middleware/auth");
const { getUsers } = require("../controllers/userController");

router.get(
  "/auth/google",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.login(req.user, function (err) {
      if (err) {
        return res.redirect("http://localhost:3000/login");
      }
      return res.redirect("http://localhost:3000/dashboard");
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out successfully" });
    });
  });
});

router.get("/admin", ensureAuthenticated, async (req, res, next) => {
  if (req.user.is_admin) {
    
    getUsers(req, res);
  } else {
   
    res.status(403).json({ message: "Access denied. Admins only." });
  }
});

module.exports = router;
