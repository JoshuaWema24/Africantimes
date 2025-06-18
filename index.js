const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/noveltopia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true}
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

//book Schema
const booksSchema9 = new mongoose.Schema({
  bookname: { type: String, required: true, unique: true},
  bookauthor: { type: String, required: true},
  genre: { type: String, required: true},
  description: { type: String, required: true},
  content: { type: String, required: true},
  likes: { type: Number, default: 0}
}, { timestamps: true });
 const Books = mongoose.model('Books', booksSchema9);

 //blogsSchema
 const blogsSchema10 = new mongoose.Schema({
  blogtitle: { type: String, required: true, unique: true},
  blogauthor: { type: String, required: true},
  blogcontent: { type: String, required: true},
  likes: { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: 0},
  blogdate: { type: Date, default: Date.now }
 }, { timestamps: true });
 const Blogs = mongoose.model('Blogs', blogsSchema10);

 // comment Schema
 const commentSchema = new mongoose.Schema({
 blogsid: { type: mongoose.Schema.Types.ObjectId, required: true },
 UserId: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true },
 comment: { type: String, required: true },
 bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true},
 })

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password, email} = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'registration successful. welcome username!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
