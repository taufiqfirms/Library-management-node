const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Create
router.post('/books', bookController.createBook);

// Get
router.get('/books', bookController.getAllBooks);

// Get by ID
router.get('/books/:id', bookController.getBookById);

// Update by ID
router.put('/books/:id', bookController.updateBook);

// Delete by ID
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
