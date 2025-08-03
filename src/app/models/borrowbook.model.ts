import { Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowbook.interface";

const borrowSchema = new Schema <IBorrowBook> ({
    book:{
        type:
        required:[true,"object ID Must Lagbe"],

    }
})