const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "claude-haiku-4.5";

// CORS config: allow localhost:5173 (Vite frontend)
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173"];
    if (process.env.NODE_ENV === "production") {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development to avoid CORS errors
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
// Public association info
app.get("/api/info", (req, res) => {
  res.json({
    name: "Africa Chef Association",
    yearFormed: process.env.ASSOCIATION_YEAR || "Unknown",
    defaultModel: DEFAULT_MODEL,
    benefits: [
      "Networking with chefs across Africa",
      "Access to training and culinary resources",
      "Discounts from partner suppliers",
    ],
    values: ["Excellence", "Community", "Respect for African cuisine"],
  });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server & connect DB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo Error:", err.message));
