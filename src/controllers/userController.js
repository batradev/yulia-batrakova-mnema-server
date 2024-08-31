const db = require('../db');

exports.checkUserInterests = async (req, res) => {
  try {
    const userId = req.user.id; 
    const interests = await db('users_interests').where('user_id', userId);

    if (interests.length > 0) {
      res.json({ hasInterests: true });
    } else {
      res.json({ hasInterests: false });
    }
  } catch (error) {
    console.error('Error checking interests:', error);
    res.status(500).json({ error: 'Failed to check interests' });
  }
};
