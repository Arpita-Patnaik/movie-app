const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors());                          // Allow frontend requests
app.use(express.json());                  // Parse JSON request bodies

// ─── Routes ──────────────────────────────────────────────
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));

// ─── Health Check ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🎬 Movie App API is running" });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});