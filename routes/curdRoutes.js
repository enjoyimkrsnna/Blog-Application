const express = require('express');
const router = express.Router();
const crudController = require('../controllers/CrudController')
const authenticateToken = require('../middleware/authMiddleware');

router.get('/getUserBlogs',authenticateToken, crudController.getUserBlogs);
 
module.exports = router;