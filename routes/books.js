const express = require("express");
const router = express.Router();

const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
const requireAuth = require("../middlewares/requireAuth");

// require auth for all book routes
router.use(requireAuth);

// GET All BOOKS
router.get("/", getBooks);

// POST a new book
router.post("/", createBook);

// DELETE an existing book
router.delete("/:id", deleteBook);

// UPDATE existing book
router.put("/:id", updateBook);

module.exports = router;
