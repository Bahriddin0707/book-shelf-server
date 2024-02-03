const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// get all books
const getBooks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const books = await Book.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json({ message: "success", books });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// create a new book
const createBook = async (req, res) => {
  const { cover, pages, published } = req.body;

  const emptyFields = [];
  if (!cover) emptyFields.push("cover");
  if (!pages) emptyFields.push("pages");
  if (!published) emptyFields.push("published");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;

    const newBook = await Book.create({
      cover,
      pages,
      published,
      user_id,
    });

    res.status(201).json({ message: "success", newBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete existing book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not Found" });
  }

  try {
    const deletedBook = await Book.findOneAndDelete({ _id: id });
    if (!deletedBook) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json({ message: "Deleted", deletedBook });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update existing book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not Found" });
  }

  try {
    const book = await Book.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json({ message: "Updated", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
};
