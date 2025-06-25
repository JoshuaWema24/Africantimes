const reruire = require('express').Router();
const { check, validationResult } = require('express-validator');
const errorHandler = require('./errorHandler.middleware.js');

module.exports = (roles) => {
    return (req, res, next) => {
        // Check if the user has the required role
        const userRole = req.user.role; // Assuming req.user is populated with user info
        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource.' });
        }
        next();
    }
}