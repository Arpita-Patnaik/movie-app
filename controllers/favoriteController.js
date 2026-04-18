const Favorite = require("../models/Favorite");

// ─── ADD FAVORITE ─────────────────────────────────────────
const addFavorite = async (req, res) => {
  try {
    const { imdbID, title, year, poster } = req.body;
    const userId = req.user.id; // comes from auth middleware

    // 1. Validate
    if (!imdbID || !title) {
      return res.status(400).json({ message: "imdbID and title are required" });
    }

    // 2. Check duplicate
    const existing = await Favorite.findOne({ userId, imdbID });
    if (existing) {
      return res.status(409).json({ message: "Movie already in favorites" });
    }

    // 3. Save
    const favorite = await Favorite.create({
      userId,
      imdbID,
      title,
      year,
      poster,
    });

    res.status(201).json({
      message: "Added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── GET FAVORITES ────────────────────────────────────────
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── DELETE FAVORITE ──────────────────────────────────────
const deleteFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // MongoDB _id of the favorite document

    // Find and verify ownership before deleting
    const favorite = await Favorite.findOne({ _id: id, userId });

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Favorite not found or not authorized" });
    }

    await favorite.deleteOne();

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };