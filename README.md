Library Management System


Projek Library Management System ini dibuat menggunakan Node.js, Express.js, dan MySQL.
Projek ini dapat memilikir fitur CRUD untuk memanage buku, member, juga dapat mengimplementasikan fitur peminjaman dan pengembalian buku.


Tech Stack


Backend: Node.js, Express.js
Database: MySQL
ORM: Sequelize
Validation: express-validator
API Documentation: Postman


Getting Started


Projek ini dijalankan menggunakan aplikasi:
Node.js (v14 or later)
MySQL (v5.7 or later)


Dependencies


npm install body-parser dotenv express express-validator joi mysql2 sequelize uuid


SETUP SQL DATABASE


Pada file database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: '', // Update with your MySQL username
  password: '', // Update with your MySQL password
  database: '', // Use your database name
});

module.exports = sequelize;

Untuk schema SQL dan sample datanya ada pata file library-db.sql
Untuk run program pada node.js, ketikkan node src/app.js pada terminal


API DOCUMENTATION

1. GET /api/books
Description: Get a list of all books with pagination.

Query Parameters:
title: Filter by book title (optional).
author: Filter by author (optional).
page: The page number for pagination (default: 1).
limit: The number of books per page (default: 10).

Response:
{
  "data": [
    {
      "id": "uuid",
      "title": "Book Title",
      "author": "Book Author",
      "published_year": 2020,
      "stock": 5,
      "isbn": "978-3-16-148410-0",
      "available": true
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}

2. POST /api/books
Description: Add a new book to the system.

Request Body:
{
  "title": "Book Title",
  "author": "Book Author",
  "published_year": 2020,
  "stock": 10,
  "isbn": "978-3-16-148410-0"
}

Response:
{
  "message": "Book created successfully",
  "book": {
    "id": "uuid",
    "title": "Book Title",
    "author": "Book Author",
    "published_year": 2020,
    "stock": 10,
    "isbn": "978-3-16-148410-0"
  }
}

3. POST /api/members
Description: Register a new member.

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main Street"
}
Response:
{
  "message": "Member created successfully",
  "member": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main Street"
  }
}

4. POST /api/borrowings
Description: Create a new borrowing record.

Request Body:
{
  "book_id": "book-uuid",
  "member_id": "member-uuid"
}
Response:
{
  "message": "Book borrowed successfully",
  "borrowing": {
    "id": "uuid",
    "book_id": "book-uuid",
    "member_id": "member-uuid",
    "borrow_date": "2024-12-21",
    "status": "BORROWED"
  }
}

5. PUT /api/borrowings/:id/return
Description: Return a borrowed book.

Path Parameter:

id: The ID of the borrowing record to be updated.
Response:
{
  "message": "Book returned successfully",
  "borrowing": {
    "id": "uuid",
    "book_id": "book-uuid",
    "member_id": "member-uuid",
    "borrow_date": "2024-12-21",
    "return_date": "2024-12-22",
    "status": "RETURNED"
  }
}
