const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes.js');
const Blog = require('./models/Blog');

const curdroutes = require('./routes/curdRoutes.js')
const commentsRoutes = require('./routes/comments');
const loggedinMiddleware = require('./middleware/LoggedIn.middleware.js')
const mailRoutes = require('./routes/mailRoute.js')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'Public', 'uploads')));
app.use(express.static(__dirname + '/Public'));


// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to check user details and requests
app.use(loggedinMiddleware)


// Routes
app.use('/api/v1/comments', commentsRoutes);
app.use('/auth', authRoutes);
app.use('/blogs',blogRoutes);
app.use('/api/v1/crud',curdroutes)
app.use('/mail/',mailRoutes)


// Home route
app.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.render('home', { title: 'Dreams Internation Blogs', blogs, user: req.user });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).render('error',{error: error.message});

  }
});

// Error handling
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
