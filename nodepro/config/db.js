const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch((err) => {
    console.log("❌ Connection error:", err);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Database connected");
});

db.on("error", (err) => {
  console.log("❌ Database connection error:", err);
});

module.exports = db;
