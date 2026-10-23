const router = require("express").Router();
const Contact = require("../models/Contact");
router.post("/", async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res
        .status(400)
        .json({ message: "Name, email and message are required." });
    const saved = await Contact.create({ name, email, subject, message });
    res
      .status(201)
      .json({
        message: "Thank you! Your message has been saved.",
        id: saved._id,
      });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
