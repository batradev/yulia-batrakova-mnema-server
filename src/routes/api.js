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
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const { getAllLanguages, createDeck, getDecks } = require('../controllers/deckController');
const { addWords, getResults, generateImages, getVisuals } = require('../controllers/wordsController');
const { dbHealthCheck, simpleHealthCheck } = require('../controllers/healthCheck');

router.get("/check-interests", ensureAuthenticated, checkUserInterests);
router.get("/check-professions", ensureAuthenticated, checkUserProfessions);
router.get("/interests", ensureAuthenticated, getAllInterests);
router.get("/professions", ensureAuthenticated, getAllProfessions);
router.get("/user-profile", ensureAuthenticated, getUserProfile);
router.post("/user-profile-update", ensureAuthenticated, updateUserProfile);
router.post("/user-interests", ensureAuthenticated, saveUserInterests);
router.post("/user-professions", ensureAuthenticated, saveUserProfessions);
router.get("/admin/users", ensureAuthenticated, getUsers);
router.delete("/admin/users/:userId", ensureAuthenticated, deleteUser);

router.get('/languages', ensureAuthenticated, getAllLanguages);
router.post('/decks', ensureAuthenticated, createDeck);
router.get('/get-decks', ensureAuthenticated, getDecks);
router.post('/words', ensureAuthenticated, addWords);
router.get('/results', ensureAuthenticated, getResults);
// router.get('/decks/:deckId/words', ensureAuthenticated, getResults);
router.post('/generate-images', ensureAuthenticated, generateImages);
router.get('/visuals', ensureAuthenticated, getVisuals);

router.get('/db-health-check', dbHealthCheck);
router.get('/health-check', simpleHealthCheck);

module.exports = router;
