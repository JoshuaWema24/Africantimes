const mongoose = require("mongoose");
const express = require('express');
const chaptersModel = require('../models/chapter.model');

// create chapter
const createChapter = async(req, res) => {
    try {
        const {booktitle, chapterNumber, chapterTitle, chapterContent } = req.body;
        const chapter = new Chapter({booktitle, chapterNumber, chapterTitle, chapterContent });
        await chapter.save();
        
        res.status(200).json({ message: 'Chapter added successfully', chapter });
        revalidateChapterCache(chapter.chapterTitle);
    } catch (error) {
        res.status(400).json({ message: 'Error writing chapter', error});
    }
}; 
  
//update chapter 
 const updateChapter = async(req, res) => {
    try {
       const {chapterTitle } = req.params;
       const { booktitle, chapterNumber, chapterContent } = req.body;
       const chapter = await Chapter.findOneAndUpdate({ chapterTitle}, {chapterNumber, chapterContent}, {new: true});
       revalidateChapterCache(chapter.chapterTitle);
        res.status(200).json({ message: 'Chapter updated successfully'}); 
    } catch (error) {
        res.status(400).json({ message: 'Error updating chapter'});
    }
 };
  
 