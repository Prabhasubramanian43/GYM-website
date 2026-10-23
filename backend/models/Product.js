const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    frontendId: { type: Number, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: String,
    ingredients: String,
    calories: String,
    protein: String,
    price: { type: Number, required: true, min: 0 },
    options: [String],
    imageName: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Product", productSchema);
