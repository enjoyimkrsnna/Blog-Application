const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const loggedinMiddleware = async (req, res, next) => {
  
    console.log('Incoming Request:');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
  
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log('User in middleware:', req.user);
  
        if (!req.user) {
          res.clearCookie('token');
          return res.redirect('/auth/login');
        }
      } catch (err) {
        console.error('Token verification error:', err);
        res.clearCookie('token');
        return res.redirect('/auth/login');
      }
    } else {
      console.log('No token found in cookies');
    }
    
    next();
  };
  
module.exports =   loggedinMiddleware;