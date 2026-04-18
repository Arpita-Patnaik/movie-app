const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imdbID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
    poster: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent duplicate favorites for the same user
favoriteSchema.index({ userId: 1, imdbID: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);