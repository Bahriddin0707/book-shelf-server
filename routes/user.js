const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/userController");

// Login Route
router.post("/login", loginUser);

// SignUp Route
router.post("/signup", signupUser);

module.exports = router;
