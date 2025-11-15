const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
exports.register = async (req, res) => {
  // Extract fields from request body
  const { name, email, password } = req.body;
  // Validate input
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  try {
    //If user exists dont create a new one
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists." });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Create new user (Saving user to mongoDB )
    user = new User({ name, email, passwordHash });
    await user.save();
    // Generate JWT token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //Send user and token to frontend
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// LOGIN
exports.login = async (req, res) => {
  //extract email and password from request body (what you typed on the form )
  const { email, password } = req.body;

  try {
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });
    //Compare password with hashed password using bcrypt
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials." });
    // Generate JWT token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Send user and token to frontend
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// GET LOGGED-IN USER
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
