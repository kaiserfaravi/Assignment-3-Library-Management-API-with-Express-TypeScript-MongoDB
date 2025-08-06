"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.booksRouter = express_1.default.Router();
// Creating data
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const books = yield book_models_1.Books.create(body);
        res.status(201).json({
            success: true,
            message: "created Succesfully",
            data: books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Validation failed",
            succes: false,
            error: error,
        });
    }
}));
// getting Single Data
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookid = req.params.bookId;
        const singleBook = yield book_models_1.Books.findById(bookid);
        console.log(singleBook);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: singleBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "boi ti paw jai ni",
            error: error
        });
    }
}));
// updating Single data
exports.booksRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedSingleBody = req.body;
        const updatedBody = yield book_models_1.Books.findByIdAndUpdate(bookId, updatedSingleBody, { new: true });
        res.status(200).json({
            succes: true,
            message: "Book updated successfully",
            data: updatedBody
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Update hoini ,ki somossa identify koro",
            error: error
        });
    }
}));
// delete single data
exports.booksRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield book_models_1.Books.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted succesfully",
            data: deletedBook
        });
    }
    catch (error) {
        res.status(402).json({
            success: false,
            message: "apni vul data delete korte caccen",
            error: error
        });
    }
}));
// all data:filtering,sorting,limiting
exports.booksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sort = req.query.sort === "desc" ? -1 : 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_models_1.Books.find(query).sort({ [sortBy]: sort }).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Kono boi pawa jaini",
            error: error,
        });
    }
}));
