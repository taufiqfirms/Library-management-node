const Borrowing = require('../models/borrowing'); // Ensure this is the correct path
const Book = require('../models/book');
const Member = require('../models/member');

// Create a new borrowing record
const createBorrowing = async (req, res) => {
  try {
    const { book_id, member_id } = req.body;

    // Check if the book exists and if stock > 0
    const book = await Book.findByPk(book_id);
    if (!book || book.stock <= 0) {
      return res.status(400).json({ message: 'Book not available or out of stock.' });
    }

    // Check if the member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(400).json({ message: 'Member not found.' });
    }

    // Check if the member has already borrowed 3 books
    const borrowings = await Borrowing.count({ where: { member_id, status: 'BORROWED' } });
    if (borrowings >= 3) {
      return res.status(400).json({ message: 'Member can borrow up to 3 books only.' });
    }

    // Decrease stock of the book by 1
    book.stock -= 1;
    await book.save();

    // Create the borrowing record
    const borrowing = await Borrowing.create({
      book_id,
      member_id,
      borrow_date: new Date(),
      status: 'BORROWED',
    });

    return res.status(201).json({ message: 'Book borrowed successfully!', borrowing });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while borrowing the book.' });
  }
};

const returnBook = async (req, res) => {
    try {
      const borrowingId = req.params.id;
  
      // Find the borrowing record by ID
      const borrowing = await Borrowing.findByPk(borrowingId);
  
      if (!borrowing) {
        return res.status(404).json({ message: "Borrowing record not found" });
      }
  
      // Ensure the book is still marked as borrowed
      if (borrowing.status !== 'BORROWED') {
        return res.status(400).json({ message: "This book is already returned" });
      }
  
      // Find the corresponding book
      const book = await Book.findByPk(borrowing.book_id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Update the borrowing status to "RETURNED"
      borrowing.status = 'RETURNED';
      borrowing.return_date = new Date();
      await borrowing.save();
  
      // Update the book stock (+1)
      book.stock += 1;
      await book.save();
  
      // Send success response
      return res.json({
        message: 'Book returned successfully',
        borrowing
      });
    } catch (error) {
      console.error("Error returning book:", error);
      return res.status(500).json({ message: "An error occurred while processing the return" });
    }
  };

module.exports = { createBorrowing, returnBook };