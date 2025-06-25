const express = require('express');
const router = express.Router();
const userActions = require('../actions/user.actions.js');
const { validateSignup, validateLogin } = require('../middlewares/validation.middleware.js');
const { errorHandler } = require('../middlewares/errorHandler.middleware.js');

router.post('/signup', validateSignup, userActions.createUser);
router.post('/login', validateLogin, userActions.loginUser);
router.put('/updateuser/:username', userActions.updateUser);
router.post('/deleteuser/:username', userActions.deleteUser);
router.get('/getuser/:username', userActions.getUser);
router.get('/getusers', userActions.getAllUsers);

// Error handling middleware 
router.use(errorHandler);

module.exports = router;
//      if (!user) {
//        return res.status(404).json({ error: 'User not found' });