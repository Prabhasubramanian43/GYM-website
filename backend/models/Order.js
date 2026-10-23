const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: String,
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      notes: String,
    },

    items: {
      type: Array,
      required: true,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["QR", "COD"],
      default: "COD",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    status: {
      type: String,
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);