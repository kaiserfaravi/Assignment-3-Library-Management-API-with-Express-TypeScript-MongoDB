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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookschema = new mongoose_1.Schema({
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
        required: [true, "copy numbers empty rakha jabena"],
        min: [0, "copy number negetive hote parbena"],
        validate: {
            validator: function (v) {
                return Number.isInteger(v);
            },
            message: (props) => `${props.value} integer number dite hobe`
        }
    },
    available: {
        type: Boolean,
        required: [true, 'available ache kina bolo,sotto na mitta?'],
        default: true
    },
}, {
    versionKey: false,
    timestamps: true,
});
// statics mathods;
bookschema.static("updateAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        // Update available status based on copies
        if (book.copies <= 0) {
            book.available = false;
        }
        else {
            book.available = true;
        }
        yield book.save();
        return book;
    });
});
bookschema.pre("save", function (next) {
    console.log(` Saving new book: ${this.title}`);
    this.title = this.title.trim();
    next();
});
bookschema.post("save", function (doc) {
    console.log(` Book "${doc.title}" saved successfully with ID: ${doc._id}`);
});
exports.Books = (0, mongoose_1.model)("Books", bookschema);
