import express from "express";
import dotenv from "dotenv";
import dataBB from "./config/datebase.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import topicUpdate from "./routes/topics.js";
import route from "./routes/languageRoutes.js";
import { authenticateUser, authorizeAdmin } from "./middleware/auth.js";
import profileRoute from "./routes/profileRouthes.js";
import progressRoute from "./routes/progressRoutes.js";
dotenv.config();
app.use(express.json());
const allowedOrigins = [
  "https://hi-codex.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

//middleware
app.use("/api/topics",  topicUpdate); // Protects topics
app.use("/api/languages", route); // Protects languages
app.use("/api/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile",profileRoute)
app.use("/api/user/", progressRoute);
// Connect to Database

dataBB()

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
