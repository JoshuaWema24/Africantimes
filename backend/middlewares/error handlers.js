// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};


module.exports = errorHandler;
// Usage in your main server file
// const express = require('express');
// const errorHandler = require('./middlewares/errorHandler');
// const app = express();
// app.use(errorHandler);