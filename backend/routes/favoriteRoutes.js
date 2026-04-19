const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

// All favorites routes require authentication
router.use(protect);

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", deleteFavorite);

module.exports = router;