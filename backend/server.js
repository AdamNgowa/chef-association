const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Public association info
app.get("/api/info", (req, res) => {
  res.json({
    name: "Africa Chef Association",
    yearFormed: process.env.ASSOCIATION_YEAR || "Unknown",
    benefits: [
      "Networking with chefs across Africa",
      "Access to training and culinary resources",
      "Discounts from partner suppliers",
    ],
    values: ["Excellence", "Community", "Respect for African cuisine"],
  });
});

// Start server & connect DB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo Error:", err.message));
