import express from "express";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const profileRoute = express.Router();


profileRoute.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; 
    let user = await User.findById(userId);
    if(!user){
         user = await Admin.findById(userId)
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

export default profileRoute;
