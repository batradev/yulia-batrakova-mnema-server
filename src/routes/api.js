const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureUserIsAdmin,
} = require("../middleware/auth");
const {
  getUser,
  getUserInterests,
  getUserProfessions,
  saveUserInterests,
  removeUserInterest,
  removeUserProfession,
  saveUserProfessions,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const { getAllInterests } = require("../controllers/interestsController");
const { getAllProfessions } = require("../controllers/professionsController");

const {
  getAllLanguages,
  createDeck,
  getDecks,
  deleteDeck,
} = require("../controllers/deckController");
const {
  addWords,
  generateImages,
  getWords,
} = require("../controllers/wordsController");
const {
  dbHealthCheck,
  simpleHealthCheck,
} = require("../controllers/healthCheck");

router.get("/users/:userId/interests", ensureAuthenticated, getUserInterests);
router.get(
  "/users/:userId/professions",
  ensureAuthenticated,
  getUserProfessions
);

router.get("/interests", ensureAuthenticated, getAllInterests);
router.get("/professions", ensureAuthenticated, getAllProfessions);

router.post("/users/:userId/interests", ensureAuthenticated, saveUserInterests);
router.post(
  "/users/:userId/professions",
  ensureAuthenticated,
  saveUserProfessions
);
router.delete(
  "/users/:userId/interests/:interestId",
  ensureAuthenticated,
  removeUserInterest
);
router.delete(
  "/users/:userId/professions/:professionId",
  ensureAuthenticated,
  removeUserProfession
);

router.get("/users", ensureAuthenticated, ensureUserIsAdmin, getUsers);
router.get("/users/:userId", ensureAuthenticated, getUser);
router.delete("/users/:userId", ensureAuthenticated, deleteUser);

router.get("/languages", ensureAuthenticated, getAllLanguages);

router.post("/users/:userId/decks", ensureAuthenticated, createDeck);
router.get("/users/:userId/decks", ensureAuthenticated, getDecks);

router.post(
  "/users/:userId/decks/:deckId/words",
  ensureAuthenticated,
  addWords
);
router.get("/users/:userId/decks/:deckId/words", ensureAuthenticated, getWords);

router.post(
  "/users/:userId/decks/:deckId/words/generate-images",
  ensureAuthenticated,
  generateImages
);
router.delete("/users/:userId/decks/:deckId", ensureAuthenticated, deleteDeck);

router.get("/db-health-check", dbHealthCheck);
router.get("/health-check", simpleHealthCheck);

module.exports = router;
