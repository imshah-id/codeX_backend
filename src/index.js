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
const allowedOrigin = "https://hi-codex.netlify.app";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
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
