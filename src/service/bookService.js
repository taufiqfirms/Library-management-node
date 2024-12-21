const Book = require('../models/book');

// Create
const createBook = async (bookData) => {
  try {
    const book = await Book.create(bookData);
    return book;
  } catch (error) {
    throw new Error('Error creating book');
  }
};

// Update by ID
const updateBook = async (id, bookData) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    await book.update(bookData);
    return book;
  } catch (error) {
    throw new Error('Error updating book');
  }
};

// Delete by ID
const deleteBook = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    await book.destroy();
    return { message: 'Book deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting book');
  }
};

// Get all with Pagination
const getBooksWithPagination = async (page = 1, limit = 10, filters = {}) => {
  try {
    const offset = (page - 1) * limit;
    const { title, author } = filters;
    const condition = {};
    if (title) condition.title = { [Sequelize.Op.like]: `%${title}%` };
    if (author) condition.author = { [Sequelize.Op.like]: `%${author}%` };

    const { count, rows } = await Book.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);
    return {
      data: rows,
      pagination: {
        total: count,
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBooksWithPagination,
};
