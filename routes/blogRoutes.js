const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/uploadConfig');
const authenticateToken = require('../middleware/authMiddleware')


router.get('/new', (req, res) => {
  res.render('createBlog', { title: 'Create New Blog', isEdit: false, user: req.user });
});

router.post('/new', authenticateToken, upload.single('image'), blogController.createBlog);

router.get('/', authenticateToken, blogController.getAllBlogs);
router.get('/:id', authenticateToken, blogController.getBlogById);

router.get('/edit/:id',authenticateToken, blogController.getBlogDetailsForEdit);

router.post('/update/:id', authenticateToken, upload.single('image'), blogController.updateBlog);
router.delete('/:id', authenticateToken, blogController.deleteBlog);

router.post('/search', blogController.searchBlogs);



module.exports = router;