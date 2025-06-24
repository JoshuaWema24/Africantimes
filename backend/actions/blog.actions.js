const blogmodel = require("../models/blog.model");
const mongoose = require("mongoose");
const express = require("express");

//create blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new blogmodel({ title, content });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
};

//update blog
const updateBlog = async (req, res) => {
  try {
    const { title } = req.params;
    const { content } = req.body;
    const blog = await blogmodel.findOneAndUpdate(
      { title },
      { content },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(400).json({ message: "Error updating blog", error });
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const { title } = req.params;
    const blog = await blogmodel.findOneAndDelete({ title });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting blog", error });
  }
};

//get one blog
const getBlog = async (req, res) => {
  try {
    const { title } = req.params;
    const blog = await blogmodel.findOne({ title });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving blog", error });
  }
};

//get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogmodel.find();
    res.status(200).json({ message: "Blogs retrieved successfully", blogs });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving blogs", error });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAllBlogs,
};
