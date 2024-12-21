create database library_db;

use library_db;

drop database library_db;
 
CREATE TABLE books (
id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
title VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
published_year INTEGER NOT NULL,
stock INTEGER NOT NULL DEFAULT 0,
isbn VARCHAR(13) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(15) NOT NULL,
address TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, published_year, stock, isbn) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 5, '9780743273565'),
('To Kill a Mockingbird', 'Harper Lee', 1960, 3, '9780446310789'),
('1984', 'George Orwell', 1949, 4, '9780451524935'),
('Pride and Prejudice', 'Jane Austen', 1813, 6, '9780141439518'),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 3, '9780316769488');

INSERT INTO members (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '081234567890', '123 Main St, City'),
('Jane Smith', 'jane.smith@email.com', '081234567891', '456 Oak Ave, Town'),
('Robert Johnson', 'robert.j@email.com', '081234567892', '789 Pine Rd, Village'),
('Mary Williams', 'mary.w@email.com', '081234567893', '321 Elm St, Borough'),
('Michael Brown', 'michael.b@email.com', '081234567894', '654 Maple Dr, District');

select * from members;

CREATE TABLE borrowings (
id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
book_id CHAR(36) REFERENCES books(id),
member_id CHAR(36) REFERENCES members(id),
borrow_date DATE NOT NULL,
return_date DATE,
status VARCHAR(10) NOT NULL DEFAULT 'BORROWED',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

drop table borrowings;