const require = require('express-validator');
const express = require('express'); 
const router = express.Router();
const bookActions = require('../actions/book.actions.js');
const { validateCreateBook, validateUpdateBook } = require('../middlewares/validation.middleware.js');
const errorHandler = require('../middlewares/errorHandler.middleware.js');

router.post('/create', validateCreateBook, bookActions.createBook);
router.put('/update/:id', validateUpdateBook, bookActions.updateBook);
router.delete('/delete/:id', bookActions.deleteBook);
router.get('/get/:id', bookActions.getBook);
router.get('/getAll', bookActions.getAllBooks);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
