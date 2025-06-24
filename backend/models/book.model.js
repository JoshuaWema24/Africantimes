
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true},
  booktitle: { type: String, required: true, unique: true },
  bookauthor: { type: String, required: true },
  bookgenre: { type: String, required: true },
  bookdesc: { type: String },
  content: { type: String },
  bookcover: { type: String }, 

}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
