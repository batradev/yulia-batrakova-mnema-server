const db = require("../db");

exports.getAllLanguages = async (req, res) => {
    try {
      const languages = await db('languages').select('*');
      res.json(languages);
    } catch (error) {
      console.error('Error loading languages:', error);
      res.status(500).json({ error: 'Failed to fetch languages' });
    }
  };


exports.createDeck = async (req, res) => {
    try {
      const { name, native_language_id, target_language_id } = req.body;
      const user_id = req.user.id; 

      const existingDeck = await db('decks')
      .where({
        name,
        user_id,
        native_language_id,
        target_language_id,
      })
      .first();

    if (existingDeck) {
      return res.status(400).json({ error: 'Deck with this name and language combination already exists.' });
    }
  
      const [deckId] = await db('decks').insert({
        name,
        user_id,
        native_language_id,
        target_language_id,
      }).returning('id');
  
      res.json({ success: true, deckId });
    } catch (error) {
      console.error('Error creating decks:', error);
      res.status(500).json({ error: 'Failed to create deck' });
    }
  };
  