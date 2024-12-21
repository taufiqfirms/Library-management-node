const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController'); // Ensure this is the correct path

// POST route to create a new borrowing
router.post(
  '/',
  [
    body('book_id').isUUID().withMessage('Book ID must be a valid UUID'),
    body('member_id').isUUID().withMessage('Member ID must be a valid UUID'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the borrowingController
  },
  borrowingController.createBorrowing // Make sure this is defined in borrowingController
);

router.put('/:id/return', borrowingController.returnBook);

module.exports = router;
