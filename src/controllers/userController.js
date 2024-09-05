const db = require("../db");

const checkUserInterests = async (req, res) => {
  try {
    console.log("checkUserInterests -> req.user", req.user);
    const userId = req.user.id;
    const interests = await db("users_interests").where("user_id", userId);

    if (interests.length > 0) {
      res.json({ hasInterests: true });
    } else {
      res.json({ hasInterests: false });
    }
  } catch (error) {
    console.error("Error checking interests:", error);
    res.status(500).json({ error: "Failed to check interests" });
  }
};

const getAllInterests = async (req, res) => {
  try {
    const interests = await db("interests").select("*");
    res.json(interests);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch interests" });
  }
};

const saveUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interests } = req.body;

    await db("users_interests").where("user_id", userId).del();

    const userInterests = interests.map((interestId) => ({
      user_id: userId,
      interest_id: interestId,
    }));

    await db("users_interests").insert(userInterests);

    res.json({ success: true });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to save interests" });
  }
};

const checkUserProfessions = async (req, res) => {
  try {
    console.log("checkUserProfessions -> req.user", req.user);
    const userId = req.user.id;
    const professions = await db("users_professions").where("user_id", userId);

    if (professions.length > 0) {
      res.json({ hasProfessions: true });
    } else {
      res.json({ hasProfessions: false });
    }
  } catch (error) {
    console.error("Error checking professions:", error);
    res.status(500).json({ error: "Failed to check professions" });
  }
};

const getAllProfessions = async (req, res) => {
  try {
    const professions = await db("professions").select("*");
    res.json(professions);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch professions" });
  }
};

const saveUserProfessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { professions } = req.body;

    await db("users_professions").where("user_id", userId).del();

    const userProfessions = professions.map((professionId) => ({
      user_id: userId,
      profession_id: professionId,
    }));

    await db("users_professions").insert(userProfessions);

    res.json({ success: true });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to save professions" });
  }
};

module.exports = {
  checkUserInterests,
  getAllInterests,
  saveUserInterests,
  checkUserProfessions,
  getAllProfessions,
  saveUserProfessions,
};