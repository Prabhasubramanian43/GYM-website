require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
    app: "FitFuel API",
    database:
      require("mongoose").connection.readyState === 1
        ? "connected"
        : "disconnected",
  }),
);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/combos", require("./routes/comboRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use((req, res) => res.status(404).json({ message: "API route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error. Check backend terminal." });
});
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`FitFuel API running at http://localhost:${PORT}`),
    ),
  )
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
