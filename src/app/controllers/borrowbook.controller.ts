import express, { Request, Response } from "express";
import { Books } from "../models/book.models";
import { borrowBooks } from "../models/borrowbook.model";


export const borrowBooksRouter = express.Router();

// Borrow a Book
borrowBooksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    // 1. Verify the book exists and has enough copies
    const book = await Books.findById(bookId);
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
    await book.save();

    // 3. Update availability status using static method
    await Books.updateAvailability(bookId);

    // 4. Create the borrow record
    const borrowRecord = await borrowBooks.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error,
    });
  }
});


// Get borrowed books summary
borrowBooksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await borrowBooks.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to  borrowed books ",
      error: error
    });
  }
});