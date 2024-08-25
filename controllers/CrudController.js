const mongoose = require('mongoose');
const Blog = require('../models/Blog.js');



// get user Blog
const getUserBlogs = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error('Invalid User ID');
        }
        console.log('User ID:', userId); 
        
        const blogs = await Blog.find({ author: userId });
        res.render('home', { title: 'My Blogs', blogs, user: req.user });
      } catch (error) {
        console.error('Error fetching user blogs:', error);
        res.status(500).render('error',{error: error.message});
      }
  };




  module.exports ={
    getUserBlogs
  }
  