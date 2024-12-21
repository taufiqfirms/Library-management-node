const { createBook, updateBook, deleteBook, getBooksWithPagination } = require('../service/bookService');

// Create
const createBookController = async (req, res) => {
  const { title, author, published_year, stock, isbn } = req.body;
  try {
    const newBook = await createBook({ title, author, published_year, stock, isbn });
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update by ID
const updateBookController = async (req, res) => {
  const { id } = req.params;
  const bookData = req.body;
  try {
    const updatedBook = await updateBook(id, bookData);
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete by ID
const deleteBookController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteBook(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all with Pagination
const getBooksController = async (req, res) => {
  const { page, limit, title, author } = req.query;
  try {
    const { data, pagination } = await getBooksWithPagination(
      parseInt(page, 10) || 1,
      parseInt(limit, 10) || 10,
      { title, author }
    );
    res.status(200).json({ data, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBookController,
  updateBookController,
  deleteBookController,
  getBooksController,
};
