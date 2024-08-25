const Blog = require('../models/Blog.js');
const commentController = require('../controllers/commentsController.js')


//create new Blog
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}`:null;
    
  try {
    const blog = new Blog({
      title,
      content,
      image,
      author: req.user._id,
    });
    await blog.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).render('createBlog', { title: 'Create New Blog', error: err.message });
  }
};


//get All the Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}); 
    res.render('home', { title: 'Home', blogs , user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error',{error: error.message});
  }
};


//Get blog By ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).render('error', { message: 'Opps! No Blog found' });
    }

    const comments = await commentController.getCommentsForBlog(blog._id);

    res.render('blogDetail', { 
      title: blog.title, 
      blog, 
      comments, 
      user: req.user 
    });

  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).render('error',{error: error.message});
  }
};


//get Blog Details for Edit purpose
exports.getBlogDetailsForEdit = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).render('error', { message: 'Opps! No Blog found' });
    }
    res.render('createBlog', {  title: 'Update Blog', isEdit: true, user: req.user, blog  });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).render('error',{error: error.message});
  }
};


//Update Blogs
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}`:null;
    
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).render('error', { message: 'Opps! No Blog found' });
    }

    blog.title = title;
    blog.content = content;

    if (image) {
      blog.image = image;
    }

    await blog.save();

    res.redirect('/'); 
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).render('error',{error: error.message});
  }
};


// Delete Blog
exports.deleteBlog = async(req,res)=>{
    
  try {
      const blogId = req.params.id;
      const userId = req.user._id;
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).render('error', { message: 'Opps! No Blog found' });
      }
  
      if (!blog.author.equals(userId)) {
        return res.status(403).render('error', { message: 'Unauthorized to delete this blog' });
      }

      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ message: 'Blog deleted successfully' });
      
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).render('error',{error: err.message});
    }
}


// Search  Blogs
exports.searchBlogs = async (req, res) => {

  const searchTerm = req.body.q || '';

  console.log(searchTerm)

  if (!searchTerm) {
    return res.redirect('/'); 
  }

  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.render('home', { title: 'Search Results', blogs, user: req.user, searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: error.message });
  }
};

