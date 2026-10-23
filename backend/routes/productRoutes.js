const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (req, res, next) => {
  try {
    const filter = { active: true };
    if (req.query.category && req.query.category !== "All")
      filter.category = req.query.category;
    if (req.query.search)
      filter.$or = ["name", "description", "ingredients"].map((k) => ({
        [k]: { $regex: req.query.search, $options: "i" },
      }));
    res.json(await Product.find(filter).sort({ frontendId: 1 }).lean());
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
});
// Idempotent initial sync from the existing frontend's original menu data.
router.post("/sync", async (req, res, next) => {
  try {
    if (!Array.isArray(req.body.products))
      return res.status(400).json({ message: "products must be an array" });
    const operations = req.body.products.map((p) => ({
      updateOne: {
        filter: { frontendId: Number(p.id) },
        update: {
          $set: {
            frontendId: Number(p.id),
            name: p.name,
            category: p.category,
            description: p.description,
            ingredients: p.ingredients,
            calories: p.calories,
            protein: p.protein,
            price: Number(p.price),
            options: p.options || [],
            imageName: p.imageName || "",
            active: true,
          },
        },
        upsert: true,
      },
    }));
    if (operations.length) await Product.bulkWrite(operations);
    res.json({ message: "Menu synced", count: operations.length });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
