const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
router.post("/", async (req, res, next) => {
  try {
    const { customer, items } = req.body;
    if (
      !customer?.name ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city
    )
      return res
        .status(400)
        .json({ message: "Please provide name, phone, address and city." });
    if (!Array.isArray(items) || !items.length)
      return res.status(400).json({ message: "Your cart is empty." });
    const Product = require("../models/Product");
    let total = 0;
    for (const item of items) {
      const qty = Math.max(1, Number(item.quantity) || 1);
      if (item.isCombo && Array.isArray(item.items))
        total +=
          item.items.reduce(
            (sum, sub) => sum + Math.max(0, Number(sub.price) || 0),
            0,
          ) * qty;
      else {
        const product = await Product.findOne({
          frontendId: Number(item.id),
          active: true,
        });
        if (!product)
          return res
            .status(400)
            .json({ message: `Product not found: ${item.name || item.id}` });
        total += product.price * qty;
      }
    }
    const orderNumber = `FF${Date.now().toString().slice(-8)}`;
    const order = await Order.create({ orderNumber, customer, items, total });
    if (req.body.sessionId)
      await Cart.findOneAndUpdate(
        { sessionId: req.body.sessionId },
        { $set: { items: [] } },
      );
    res
      .status(201)
      .json({
        id: order._id,
        orderNumber: order.orderNumber,
        customer: order.customer,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      $or: [
        {
          _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null,
        },
        { orderNumber: req.params.id },
      ],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
