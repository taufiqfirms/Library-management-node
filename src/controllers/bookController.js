const Book = require('../models/book');

// Create
exports.createBook = async (req, res) => {
  try {
    const { title, author, published_year, stock, isbn } = req.body;
    const newBook = await Book.create({ title, author, published_year, stock, isbn });
    res.status(201).json({ message: 'Book created successfully!', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

// Read
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Read by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

// Update
exports.updateBook = async (req, res) => {
  try {
    const { title, author, published_year, stock, isbn } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.published_year = published_year || book.published_year;
    book.stock = stock || book.stock;
    book.isbn = isbn || book.isbn;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully!', book });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

// Delete
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
