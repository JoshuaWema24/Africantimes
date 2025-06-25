const requireAuth = require('../middleware/requireAuth');
const express = require('express');

const rateLimit = require('express-rate-limit');
const router = express.Router();

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
 module.exports = (app) => {
  // Apply the rate limiting middleware to all requests
  app.use(limiter);

  // Apply requireAuth middleware to specific routes if needed
  app.use('/api/protected', requireAuth, (req, res) => {
    res.send('This is a protected route');
  });

  // Example of a public route
  app.get('/api/public', (req, res) => {
    res.send('This is a public route');
  });
}