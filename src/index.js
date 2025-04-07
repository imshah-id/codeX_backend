import express from "express";
import dotenv from "dotenv";
import dataBB from "./config/datebase.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import topicUpdate from "./routes/topics.js";
import route from "./routes/languageRoutes.js";
import { authenticateUser, authorizeAdmin } from "./middleware/auth.js";
import profileRoute from "./routes/profileRouthes.js";
import progressRoute from "./routes/progressRoutes.js";

dotenv.config();

// Configuration
const config = {
  port: process.env.PORT || 5000,
  isDev: process.env.NODE_ENV === "development",
  corsOrigins:
    process.env.NODE_ENV === "development"
      ? ["http://localhost:3000", "https://hi-codex.netlify.app"]
      : ["https://hi-codex.netlify.app"],
};

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging in development
if (config.isDev) {
  app.use(morgan("dev"));
}

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.corsOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// JSON parsing
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Original Routes maintained
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicUpdate);
app.use("/api/languages", route);
app.use("/api/profile", profileRoute);
app.use("/api/user/", progressRoute);
app.use(
  "/api/admin",
  authenticateUser,
  authorizeAdmin,
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: config.isDev ? err.message : undefined,
  });
});

// Start server with database connection
async function startServer() {
  try {
    await dataBB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
