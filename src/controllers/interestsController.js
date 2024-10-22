const db = require("../db");

const getAllInterests = async (req, res) => {
    try {
      const interests = await db("interests").select("*");
      res.json(interests);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed to fetch interests" });
    }
  };

  module.exports = {
    getAllInterests
  };