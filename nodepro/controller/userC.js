const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modal/userM");

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Jo frontend mathi role na aave to default "user" set thase
    const userRole = role || "user";

    // Email pehle thi che ke nahi te check karva mate
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashpassword,
      role: userRole,
    });

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Server Error during signup", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        // standard error status codes use karo
        message: "Email not found",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    // Default counters check karva mate (error avoid karva)
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "SECRETKEY", // Real production ma .env file mathi lavvu
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Server Error during login", error: error.message });
  }
};

const getusers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const changestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error changing status", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getusers,
  changestatus,
};
