# Welcome to Library Management System using Node,Express,mongoose,Typscript

A RESTful API for managing books and borrow records using **Node.js**, **Express**, and **MongoDB** with **Mongoose** and **TypeScript**.  
This project supports CRUD operations on books, borrowing books with business logic, and aggregation reporting.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Business Logic](#business-logic)
- [All Link](#all-links)



## Project Description

This project is a backend API for a Library Management System, allowing users to:

- Add, update, delete, and retrieve book records.
- Borrow books with quantity checks and availability updates.
- Generate reports on borrowed books summary using MongoDB aggregation.

## Features

- CRUD APIs for books
- Borrowing functionality with validation
- Automatic update of book availability based on copies left
- Aggregation pipeline for borrowed books summary
- Proper error handling and HTTP status codes

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- TypeScript

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/kaiserfaravi/Assignment-3-Library-Management-API-with-Express-TypeScript-MongoDB
   cd Assignment-3-Library-Management-API-with-Express-TypeScript-MongoDB


   ```

2. Install dependencies
   `npm install`

3. Setup environment variables
   Create a .env file in the root directory and add:
   don't forget to .env file to gitignore ottherwise data may licked

```
MONGO_URI= Your database URI
PORT=5000

```

4. Run the development server
   `npm run dev`

## Usage

1. Server runs on http://localhost:5000 by default
2. Test APIs using Postman
3. ** Base Routes **
   -/api/books for book-related operations
   -/api/borrow for borrow-related operations


## API Endpoiints

**Books**

- 	`/api/books`	(Create a new book and retrive books using query)
-   `/api/books/:bookId`	(Retrieve,delete,update a single book by ID)

**Borrow Books**
 - 	`/api/borrow`	(Borrow a book with quantity and due date ,get summary reports of borrowed books)


## Business Logic
- Verify availability: Before borrowing, system checks if enough copies exist

- Update copies: Deduct borrowed quantity from available copies

- Update availability: If copies become zero, set available to false automatically

- Store borrow record: Save book ID, quantity borrowed, and due date

## All Links
## Live site ,Git Link,Video Explanation Link
- [Github](https://github.com/kaiserfaravi/Assignment-3-Library-Management-API-with-Express-TypeScript-MongoDB)

- [live-link-vercel](https://library-management-as3-lv2.vercel.app/)