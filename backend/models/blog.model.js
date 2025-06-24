const mongoose = require('mongoose')
const express = require('express')
 
const blogSchema = new mongoose.Schema({
  blogtitle: { type: String, required: true, unique: true },
  blogauthor: { type: String, required: true },
  blogcontent: { type: String, required: true },
  blogdate: { type: Date, default: Date.now }
  name: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
}, { timestamps: true });
  
module.exports = mongoose.model('Blog', blogSchema)