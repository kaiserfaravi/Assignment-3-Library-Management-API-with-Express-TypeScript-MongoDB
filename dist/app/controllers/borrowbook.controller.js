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
exports.borrowBooksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
const borrowbook_model_1 = require("../models/borrowbook.model");
exports.borrowBooksRouter = express_1.default.Router();
// Borrow a Book
exports.borrowBooksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // 1. Verify the book exists and has enough copies
        const book = yield book_models_1.Books.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        if (book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: `Not enough copies available. Only ${book.copies} available.`,
            });
        }
        // 2. Deduct the quantity from the book's copies
        book.copies -= quantity;
        yield book.save();
        // 3. Update availability status using static method
        yield book_models_1.Books.updateAvailability(bookId);
        // 4. Create the borrow record
        const borrowRecord = yield borrowbook_model_1.borrowBooks.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error: error,
        });
    }
}));
// Get borrowed books summary
exports.borrowBooksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowbook_model_1.borrowBooks.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books", // The collection name in MongoDB (lowercase plural)
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails" // Convert the array to an object
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            },
            {
                $sort: { totalQuantity: -1 } // Sort by highest quantity first
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to  borrowed books ",
            error: error
        });
    }
}));
