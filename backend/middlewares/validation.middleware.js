const require = require('express-validator');
const { body, param, validationResult } = require('express-validator');
const User = require('../models/user.model.js');
const Chapter = require('../models/chapter.model.js');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { query } = require('express-validator');

// Validation middleware for user signup
const validateSignup = [
  check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 100 }).withMessage('Username must be between 3 and 100 characters long'),
  check('email')
    .isEmail().withMessage('Invalid email address')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already in use');
      }
    }),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
// Validation middleware for user login
const validateLogin = [
  check('username')
    .notEmpty().withMessage('Username is required'),
  check('password')
    .notEmpty().withMessage('Password is required')
];

// Validation middleware for updating user
const validateUpdateUser = [
  check('username')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('Username must be between 3 and 100 characters long'),
  check('email')
    .optional()
    .isEmail().withMessage('Invalid email address')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user.username !== req.params.username) {
        throw new Error('Email already in use');
      }
    }),
  check('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
// Validation middleware for chapter creation
const validateCreateChapter = [
    check('title')
        .notEmpty().withMessage('Chapter title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Chapter title must be between 3 and 100 characters long'),
    check('content')
        .notEmpty().withMessage('Chapter content is required')
    ];
// Validation middleware for chapter update
const validateUpdateChapter = [
    check('title')
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage('Chapter title must be between 3 and 100 characters long'),
    check('content')
        .optional()
        .notEmpty().withMessage('Chapter content is required')
];
// Validation middleware for chapter deletion
const validateDeleteChapter = [
    check('title')
        .notEmpty().withMessage('Chapter title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Chapter title must be between 3 and 100 characters long')
];
// Validation middleware for getting chapter by title
const validateGetChapter = [
    param('title')
        .notEmpty().withMessage('Chapter title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Chapter title must be between 3 and 100 characters long')
];
// Validation middleware for getting all chapters
const validateGetAllChapters = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];

//

