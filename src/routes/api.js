const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const ensureAuthenticated = require('../middleware/auth');
const { checkUserInterests } = require('../controllers/userController');

// router.get('/protected-data', ensureAuthenticated, (req, res) => {
//   res.json({ message: 'This is protected data.', user: req.user });
// });

router.get('/protected-data', ensureAuthenticated, (req, res) => {
  try {
    console.log('Authenticated user:', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    res.json({ message: 'This is protected data.', user: req.user });
  } catch (error) {
    console.error('Error fetching protected data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/check-interests', ensureAuthenticated, checkUserInterests);

module.exports = router;

