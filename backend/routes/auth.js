const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// GET LOGGED-IN USER
router.get("/me", auth, authController.getMe);

module.exports = router;
