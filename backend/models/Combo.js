const mongoose = require("mongoose");
const comboSchema = new mongoose.Schema(
  {
    name: { type: String, default: "My Custom Combo" },
    items: { type: Array, required: true },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Combo", comboSchema);
