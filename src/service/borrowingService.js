const Borrowing = require('../models/borrowing');
const Book = require('../models/book');
const Member = require('../models/member');

// Create a borrowing record
async function createBorrowing(book_id, member_id) {
  const book = await Book.findByPk(book_id);
  const member = await Member.findByPk(member_id);

  if (!book || !member) {
    throw new Error('Book or Member not found');
  }

  // Check if the member can borrow the book
  if (book.stock <= 0) {
    throw new Error('Book is out of stock');
  }

  const memberBorrowings = await Borrowing.count({ where: { member_id: member_id, status: 'BORROWED' } });
  if (memberBorrowings >= 3) {
    throw new Error('Member cannot borrow more than 3 books');
  }

  // Decrease book stock
  await book.update({ stock: book.stock - 1 });

  // Create borrowing record
  const borrowing = await Borrowing.create({
    book_id,
    member_id,
    borrow_date: new Date(),
  });

  return borrowing;
}

// Mark borrowed book as Returned
async function returnBorrowing(borrowing_id) {
  const borrowing = await Borrowing.findByPk(borrowing_id);

  if (!borrowing || borrowing.status === 'RETURNED') {
    throw new Error('Invalid borrowing record');
  }

  const book = await Book.findByPk(borrowing.book_id);
  if (!book) {
    throw new Error('Book not found');
  }

  // Update book stock and set return date
  await book.update({ stock: book.stock + 1 });

  borrowing.status = 'RETURNED';
  borrowing.return_date = new Date();
  await borrowing.save();

  return borrowing;
}

module.exports = {
  createBorrowing,
  returnBorrowing,
};
