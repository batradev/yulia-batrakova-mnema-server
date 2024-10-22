const express = require("express");
const router = express.Router();
const passport = require("passport");

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
        return res.redirect(`${process.env.FRONTEND_URL}/login`);
      }
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
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

module.exports = router;
