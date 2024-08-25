const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});
router.post('/register', authController.register);

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
