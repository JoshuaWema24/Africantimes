const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const e = require('express');


// create user

const createUser = async (req, res) =>  {
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    return res.status(400).json({ error: 'Username, password and email are required' });

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: `Registration successful. Welcome, ${username}!` });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
};
 
const loginUser = async(req, res) => {
   try {
     const { username, password } = req.body;
     const user = await User.findOne({ username });

     if (!user)
       return res.status(401).json({ success: false, message: "Cannot find username!" });

     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch)
       return res.status(401).json({ success: false, message: 'Wrong password!' });

     res.status(200).json({ success: true, message: 'Login successful', user: { username: user.username, email: user.email } });
   } catch (err) {
     console.error('Login error:', err);
     res.status(500).json({ error: 'Server error during login' });
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
    loginUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
 };

 