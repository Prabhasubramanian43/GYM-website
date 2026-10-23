const router = require("express").Router();
const Combo = require("../models/Combo");
router.post("/", async (req, res, next) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items) || !items.length)
      return res.status(400).json({ message: "Select at least one food." });
    const total = items.reduce(
      (sum, item) => sum + Math.max(0, Number(item.price) || 0),
      0,
    );
    const combo = await Combo.create({
      name: req.body.name || "My Custom Combo",
      items,
      total,
    });
    res.status(201).json(combo);
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const combo = await Combo.findById(req.params.id);
    if (!combo) return res.status(404).json({ message: "Combo not found" });
    res.json(combo);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
