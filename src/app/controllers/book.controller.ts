import express, { Request, Response } from "express";
import { Books } from "../models/book.models";
export const booksRouter = express.Router();

// Creating data

booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const books = await Books.create(body);
    res.status(201).json({
      success: true,
      message: "created Succesfully",
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Validation failed",
      succes: false,
      error: error,
    });
  }
});

// getting Single Data
booksRouter.get("/:bookId", async (req: Request, res: Response) => {

  try {
    const bookid = req.params.bookId;
    const singleBook = await Books.findById(bookid);
    console.log(singleBook);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: singleBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "boi ti paw jai ni",
      error:error
    });
  }
});

// updating Single data

booksRouter.put('/:bookId',async(req:Request,res:Response)=>{
  try {
    const bookId=req.params.bookId;
    const updatedSingleBody = req.body;

    const updatedBody = await Books.findByIdAndUpdate(bookId,updatedSingleBody,{new:true});
    res.status(200).json({
      succes:true,
      message:"Book updated successfully",
      data:updatedBody
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"Update hoini ,ki somossa identify koro",
      error:error
    })
  }
})


// delete single data
booksRouter.delete('/:bookId',async(req:Request,res:Response)=>{


  try {
    const bookId = req.params.bookId;
    const deletedBook = await Books.findByIdAndDelete(bookId)
    res.status(201).json({
      
      success:true,
      message:"Book deleted succesfully",
      data:deletedBook
    })
  } catch (error) {

    res.status(402).json({
      success:false,
      message:"apni vul data delete korte caccen",
      error:error
    })
    
  }

})


// all data:filtering,sorting,limiting

booksRouter.get('/',async(req:Request,res:Response)=>{

  try {
    
    // const allBook = await Books.find().limit(2)
    // const allBook = await Books.find().limit(2)
    // Books.find({ genre: "FANTASY" }).sort({ createdAt: -1 }).limit(5)
    console.log(req.query)

    res.status(201).json({

      success:true,
      message:"all data retrieve succesfully",
      data:allBook
    })
  } catch (error) {

    res.status(402).json({
      success:false,
      message:"all data no patched successfully",
      error:error
    })
    
  }

})

