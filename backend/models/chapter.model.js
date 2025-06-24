const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  booktitle: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true},
  chapterTitle: { type: String, required: true },
  chapterContent: { type: String, required: true },
  chapterNumber: { type: Number, required: true },
 }, {timestamps: true}) 

 module.exports = mongoose.model('Chapters', chapterSchema);