const db = require("../db");

const getAllProfessions = async (req, res) => {
    try {
      const professions = await db("professions").select("*");
      res.json(professions);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed to fetch professions" });
    }
  };

  module.exports = {
    getAllProfessions
  };