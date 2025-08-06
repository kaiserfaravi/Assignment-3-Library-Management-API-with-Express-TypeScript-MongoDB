"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_controller_1 = require("./app/controllers/book.controller");
const borrowbook_controller_1 = require("./app/controllers/borrowbook.controller");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.booksRouter);
app.use('/api/borrow', borrowbook_controller_1.borrowBooksRouter);
app.get('/', (req, res) => {
    console.log(`Welcome To Library management System`);
    res.send({
        message: 'Welcome to Library Management System',
        succes: 'true'
    });
});
exports.default = app;
