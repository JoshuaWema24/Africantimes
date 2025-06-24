const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');

// create user
const createUser = async (req, res) => {
  try {
    const { name, email, password, genre } = req.body;
    const user = new User({ name, email, password, genre });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
    revalidateUserCache(user.name);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};
 
// update user
const updateUser = async (req, res) => {
    try {
       const { name } = req.params;
       const { email, password, genre } = req.body;
        const user = await User.findOneAndUpdate ({ name }, { email ,  password, genre }, {new: true});
        revalidateUserCache(user.name);
    } catch (error) {
       res.status(400).json({message: 'error updating user', error }); 
    }
};

// deleteUser 
 const deleteUser = async (req, res) => {
    try {
        const { name } = req.params;
        const { email, password, genre } = req.body;
        const user = await User.findByIdAndDelete({ name });
         if (!user) {
            return res.status(404).json({ message: 'User not found!'});
         }
         res.status(200).json({message: 'User deleted succeccfully!'});
         revalidateUserCache(user.name);
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
 };

 //get one user
 const getUser = async ( req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findOne({ name });
         if (!user) {
            return res.status(404).json({ message: 'Cannot find user'});
         }
         res.status(200).json({ message: 'User retrieved successfully'});
    } catch (error) {
        res.status(400).json({ message: 'Error getting user', error }); 
    }
 };

 //get all users
 const getAllUsers = async ( req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'User retrieved successfully', users });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving all users', error });
    }
 };
  
 module.exports ={
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
 };

 