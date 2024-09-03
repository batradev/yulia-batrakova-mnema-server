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

const { getAllLanguages, createDeck } = require('../controllers/deckController');
const { addWords, getResults } = require('../controllers/wordsController');

router.get("/check-interests", ensureAuthenticated, checkUserInterests);
router.get("/check-professions", ensureAuthenticated, checkUserProfessions);
router.get("/interests", ensureAuthenticated, getAllInterests);
router.get("/professions", ensureAuthenticated, getAllProfessions);
router.post("/user-interests", ensureAuthenticated, saveUserInterests);
router.post("/user-professions", ensureAuthenticated, saveUserProfessions);
router.get('/languages', ensureAuthenticated, getAllLanguages);
router.post('/decks', ensureAuthenticated, createDeck);
router.post('/words', ensureAuthenticated, addWords);
router.get('/results', ensureAuthenticated, getResults);

module.exports = router;
