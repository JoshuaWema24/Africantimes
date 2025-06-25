//chapter routes
const express = require('express');
const router = express.Router();   
const chapterActions = require('../actions/chapter.actions.js');
const { validateCreateChapter, validateUpdateChapter } = require('../middlewares/validation.middleware.js');
const errorHandler = require('../middlewares/error handlers.js');

router.post('/create', validateCreateChapter, chapterActions.createChapter);
router.put('/update/:id', validateUpdateChapter, chapterActions.updateChapter);
router.delete('/delete/:id', chapterActions.deleteChapter);
router.get('/get/:id', chapterActions.getChapter);
router.get('/getAll', chapterActions.getAllChapters);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
