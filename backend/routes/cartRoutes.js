const router = require("express").Router();
const Cart = require("../models/Cart");
router.get("/:sessionId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId }).lean();
    res.json(cart || { sessionId: req.params.sessionId, items: [] });
  } catch (e) {
    next(e);
  }
});
router.put("/:sessionId", async (req, res, next) => {
  try {
    if (!Array.isArray(req.body.items))
      return res.status(400).json({ message: "items must be an array" });
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $set: { items: req.body.items } },
      { upsert: true, new: true, runValidators: true },
    );
    res.json(cart);
  } catch (e) {
    next(e);
  }
});
router.delete("/:sessionId", async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $set: { items: [] } },
      { upsert: true, new: true },
    );
    res.json(cart);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
