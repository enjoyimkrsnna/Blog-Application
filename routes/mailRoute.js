const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.get('/forgot-password', mailController.getForgotPassword);
router.post('/forgot-password', mailController.postForgotPassword);
router.get('/update-password', mailController.getUpdatePassword);
router.post('/update-password', mailController.postUpdatePassword);

module.exports = router;
