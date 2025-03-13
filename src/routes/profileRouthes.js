import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const profileRoute = express.Router();

// Get user profile
profileRoute.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      user = await Admin.findById(userId);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update email and password
profileRoute.put("/user/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      user = await Admin.findById(userId);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default profileRoute;
