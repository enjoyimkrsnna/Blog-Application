const Comment = require('../models/Comment');
const Blog = require('../models/Blog');


// add  a comment
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      postId: req.params.id,
      author: req.user._id,
      content,
    });

    await comment.save();
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    console.error('Error posting comment:', err);
    res.status(500).render('error', { message: 'Error posting comment' });
  }
};

//get comments for a blog
exports.getCommentsForBlog = async (postId) => {
  try {
    const comments = await Comment.find({ postId }).populate('author', 'username');
    return comments;
  } catch (err) {
    console.error('Error fetching comments:', err);
    throw new Error('Error fetching comments');
  }
};
