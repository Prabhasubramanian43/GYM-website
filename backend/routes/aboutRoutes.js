const router = require("express").Router();
router.get("/", (req, res) =>
  res.json({
    brand: "FitFuel",
    tagline: "Eat Clean. Train Hard. Live Strong.",
    purpose:
      "A healthy gym food menu concept with breakfast, protein-rich meals, salads, drinks, snacks and diet-based plans.",
    nutritionNote:
      "Nutrition values are approximate and can vary with ingredients and serving sizes.",
  }),
);
module.exports = router;
