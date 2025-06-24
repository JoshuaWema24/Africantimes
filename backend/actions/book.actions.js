const mongoose = require('mongoose');
const express = require('express');
const bookModel = require('../models/book.models');

//create book
const createBook = async(req, res) => {
    try {
        const { booktitle, bookauthor, bookgenre, content, bookdesc, bookcover } = req.body;
        const book = new Book ({booktitle, bookauthor, bookgenre, content, bookdesc, bookcover })
        await book.save();
        res.status(200).json({ message: 'Book created successfully!'});
        revalidateBookCache(book.booktitle);
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error })
    }
};

//update a book
const updateBook = async(req, res) => {
    try {
     const { booktitle } = req.params;
     const { bookauthor, bookgenre, content, bookdesc, bookcover } = req.body;
      const book = await Book.findOneAndUpdate({ booktitle },{ bookauthor, bookgenre, content, bookdesc, bookcover }, {new: true});
      res.status(200).json({ message : 'Book updated successfully', book });
      revalidateBookCache(book.booktitle);
    } catch (error) {
        res.status(400).json({ message: 'error Updating book', error });
    }
};
 
// delete book
const deleteBook = async(req, res) => {
    try {
        const { booktitle } = req.params;
        const  { bookauthor, bookgenre, content, bookdesc, bookcover } = req.body;
        const book = await Book.findByIdAndDelete({booktitle});
         if (!booktitle) 
         {
            return res.status(404).json({ message: 'Could not find book!'});
         }
         res.status(200).json({ message: 'Book deleted successfully'});
         revalidateBookCache(book.booktitle); 
    } catch (error) {
        res.status(400).json({ message: 'Error deleting book', error });
    }
};

// get one book
const getBook = async(req, res) => {
    try {
        const { booktitle } = req.params;
        const book = await Book.findOne({ booktitle });
         if (!booktitle) {
            return res.status(404).json({ message: 'Cannot find book' });
         }
        res.status(200).json({ message: 'Book retrieved successfully'});
    } catch (error) {
        res.status(400).json({ message: 'Error getting book', error }) 
    }
};
 
// get all books 
const getBooks = async(req, res) => {
    try {
        const books = await Books.find();
         res.status(200).json({ message: 'Here are your books', books });
    } catch (error) {
        res.status(400).json({ messsage: 'Error getting books', error });
    }
};

 module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getBooks
 };