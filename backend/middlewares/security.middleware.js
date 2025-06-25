const requireAuth = require('../middleware/requireAuth');
const express = require('express');

require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const router = express.Router();
 
//securty middleware
exports.securityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(require('helmet')());

  // Enable CORS
  app.use(cors());

  // Limit repeated requests to public APIs and/or endpoints
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
  });
  
  app.use(limiter);

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Sanitize user input to prevent XSS attacks
  app.use(xss());

  // Apply requireAuth middleware to specific routes if needed
  app.use('/api/protected', requireAuth, (req, res) => {
    res.send('This is a protected route');
  });

  // Example of a public route
  app.get('/api/public', (req, res) => {
    res.send('This is a public route');
  });
}
