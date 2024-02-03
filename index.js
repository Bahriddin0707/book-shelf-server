const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

//express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `connected to database and server is listening on ${PORT} port`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
