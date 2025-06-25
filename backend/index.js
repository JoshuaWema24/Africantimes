const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/noveltopia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
 
// User routes
const User = require('./models/User'); // Assuming you have a User model defined in models/User.js
app.use('/users', require('./routes/user.routes')); // Assuming you have user routes defined in routes/user.routes.js

// chapter routes
const Chapter = require('./models/Chapter'); // Assuming you have a Chapter model defined in models/Chapter.js
app.use('/chapters', require('./routes/chapter.routes')); // Assuming you have chapter routes defined in routes/chapter.routes.js

//book routes
const Book = require('./models/book.model.js'); // Assuming you have a Book model defined in models/book.model.js
app.use('/books', require('./routes/book.routes')); // Assuming you have book routes defined in routes/book.routes.js

// blog routes
const Blog = require('./models/blog.model.js'); // Assuming you have a Blog model defined in models/blog.model.js
app.use('/blogs', require('./routes/blog.routes')); // Assuming you have blog routes defined in


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
