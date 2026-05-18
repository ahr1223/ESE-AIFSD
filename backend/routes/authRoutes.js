const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateUser } = require('../middleware/validationMiddleware');

router.post('/signup', validateUser, signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;
