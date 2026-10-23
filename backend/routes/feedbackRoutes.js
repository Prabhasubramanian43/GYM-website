const router = require("express").Router();
const Feedback = require("../models/Feedback");

// Submit feedback
router.post("/", async (req, res, next) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({
        message: "Please fill in all feedback fields.",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim(),
      rating: numericRating,
      message: message.trim(),
    });

    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback,
    });
  } catch (error) {
    next(error);
  }
});

// Get all feedback
router.get("/", async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    next(error);
  }
});

module.exports = router;