const db = require("../db");

const simpleHealthCheck = async (req, res) => {
  try {
    const helloWorld = {
        hello: 'world'
    }

    res.status(200).json(helloWorld);
  } catch (error) {
    console.error("Error returning Hello World:", error);
    res.status(500).json({ error: "Failed to return Hello World" });
  }
};

const dbHealthCheck = async (req, res) => {
  try {
    const result = await db('decks').count('* as deck_count');
    const helloWorld = {
        hello: 'world',
        decks_count: result[0].deck_count,
    }

    res.status(200).json(helloWorld);
  } catch (error) {
    console.error("Error returning Hello World:", error);
    res.status(500).json({ error: "Failed to return Hello World" });
  }
};

module.exports = {
  dbHealthCheck,
  simpleHealthCheck,
};
