require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../modal/userM");

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const username = process.env.ADMIN_USERNAME || "Admin";

async function resetAdmin() {
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashpassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    {
      username,
      email,
      password: hashpassword,
      role: "admin",
      status: "active",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log(`Admin login ready for ${email}`);
}

resetAdmin()
  .catch((error) => {
    console.error("Admin reset failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
