const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    cover: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    published: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
