const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuthenticated = require("../middleware/auth");
const {
  checkUserInterests,
  getAllInterests,
  saveUserInterests,
} = require("../controllers/userController");
const {
  checkUserProfessions,
  getAllProfessions,
  saveUserProfessions,
} = require("../controllers/userController");

router.get("/check-interests", ensureAuthenticated, checkUserInterests);
router.get("/check-professions", ensureAuthenticated, checkUserProfessions);
router.get("/interests", ensureAuthenticated, getAllInterests);
router.get("/professions", ensureAuthenticated, getAllProfessions);
router.post("/user-interests", ensureAuthenticated, saveUserInterests);
router.post("/user-professions", ensureAuthenticated, saveUserProfessions);

module.exports = router;
