const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');


router.post('/add/:id', commentController.createComment);

module.exports = router;
