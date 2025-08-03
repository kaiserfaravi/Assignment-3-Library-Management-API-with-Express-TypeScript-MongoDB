import mongoose, { model, Schema } from "mongoose";
import { Ibook } from "../interfaces/book.interface";

const bookschema = new Schema<Ibook>(
  {
    title: {
      type: String,
      required: [true, "Title ta ditei hobe vaia"],
      trim: true,
    },
    author: {
      type: String,
      required: [
        true,
        "brother lekhoker name ki dibenna,lekhok chara ki boi hoi?",
      ],
    },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Genre ei koita theke jekono ekta hote hobe must",
      },
      required: [true, "Kon genrer er lekhok seta miss kore felsen vaia"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN number ta den vai"],
      unique: [true, "isbn number sobsomoi e alada alada hoi"],
    },
    description: {
      type: String,
      default: "",
    },
    copies: { 
      type: Number, 
      required: [true,"copy numbers empty rakha jabena"] ,
      min:[0,"copy number negetive hote parbena"],
      validate:{
        validator:function(v){
          return Number.isInteger(v);
        },
        message:(props)=>`${props.value} integer number dite hobe`
      }
    },
    available: { 
      type: Boolean,
      required:[true,'available ache kina bolo,sotto na mitta?'],
       default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Books = model<Ibook>("Books", bookschema);
