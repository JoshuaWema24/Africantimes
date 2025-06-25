const requireAuth = require('../middleware/requireAuth');
const express = require('express');
const router = express.Router();
const blogActions = require('../actions/blog.actions.js');
const { validateCreateBlog, validateUpdateBlog } = require('../middlewares/validation.middleware.js');
const errorHandler = require('../middlewares/errorHandler.middleware.js');

router.post('/create', validateCreateBlog, blogActions.createBlog);
router.put('/update/:id', validateUpdateBlog, blogActions.updateBlog);
router.delete('/delete/:id', blogActions.deleteBlog);
router.get('/get/:id', blogActions.getBlog);
router.get('/getAll', blogActions.getAllBlogs);

// Error handling middleware
router.use(errorHandler);

module.exports = router;

