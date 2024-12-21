const express = require('express');
const { createBookController, updateBookController, deleteBookController, getBooksController } = require('../controllers/bookController');
const router = express.Router();

// Create
router.post('/', createBookController);

// Update
router.put('/:id', updateBookController);

// Delete
router.delete('/:id', deleteBookController);

// Get all
router.get('/', getBooksController);

module.exports = router;
