# Book Management System API

This project provides APIs for managing books and user authentication in a book management system.

## Getting Started

To get started with the project, follow these instructions:

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:


2. Install dependencies:


### Configuration

1. Configure the MongoDB connection in `connection/connection.js`.
2. Adjust port and other configurations in `index.js` if necessary.

### Running the Server

Start the server:


The server will be running at `http://localhost:4000`.

## API Documentation

### Book Routes

#### Add a Book

- Endpoint: `POST /api/v1/add`
- Description: Adds a new book to the system.
- Request Body:
  ```json
  {
      "title": "Book Title",
      "author": "Author Name",
      "price": 20.50,
      "published": "2022-04-29T00:00:00.000Z"
  }

#### Get All Books
- Endpoint: GET /api/v1/getAllBooks
- Description: Retrieves all books from the system.
- Response: 200 OK
  ```json
{
    "books": [...],
}

#### Get Book by ID
- Endpoint: GET /api/v1/getBook/:id
- Description: Retrieves a book by its ID.
- Response: 200 OK
  ```json 
{
    "book": {...}
}

#### Update Book by ID
- Endpoint: PUT /api/v1/updateBook/:id
- Description: Updates a book by its ID.
- Request Body:
  ```json
{
    "title": "Updated Title",
    "author": "Updated Author",
    "price": 25.99,
    "published": "2022-04-29T00:00:00.000Z"
}
Response: 200 OK

#### Delete Book by ID
- Endpoint: DELETE /api/v1/deleteBook/:id
- Description: Deletes a book by its ID.
- Response: 201 Created

#### Get Books by Author
- Endpoint: GET /api/v1/books/author/:author
- Description: Retrieves books by the specified author.
Response: 200 OK

  ```json
{
    "books": [...]
}

#### Get Books by Publication Year
- Endpoint: GET /api/v1/books/published/:year
- Description: Retrieves books published in the specified year.
  Response: 200 OK
  ```json
{
    "books": [...]
}



## User Routes

#### Add a User
- Endpoint: POST /api/user/addUser
- Description: Registers a new user.
- Request Body:
  ```json
{
    "email": "user@example.com",
    "password": "password123"
}
Response: 200 OK

#### User Login
- Endpoint: GET /api/user/login
- Description: Authenticates a user.
- Request Body:
  ```json
{
    "email": "user@example.com",
    "password": "password123"
}
Response: 200 OK
{
    "user": {...},
    "message": "Login Successful"
}

## Dependencies
### express
### mongoose
