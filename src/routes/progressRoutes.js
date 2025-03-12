import express from "express";
import UserProgress from "../models/UserProgress.js";

const progressRoute = express.Router();

// ðŸ”¹ Get User Progress
progressRoute.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res
        .status(404)
        .json({ message: "No progress found for this user." });
    }

    res.json({ success: true, languages: progress.languages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ðŸ”¹ Add a New Language to User's Progress
progressRoute.post("/add", async (req, res) => {
  try {
    const { userId, language, topics = [] } = req.body;

    if (!userId || !language) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User ID and language are required.",
        });
    }

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = new UserProgress({ userId, languages: {} });
    }

    if (!progress.languages[language]) {
      progress.languages[language] = {
        completed: [],
        pending: topics,
      };
    }

    await progress.save();
    res.json({
      success: true,
      message: `${language} added to progress!`,
      progress,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ðŸ”¹ Update Progress (Mark Topic as Completed)
progressRoute.post("/complete", async (req, res) => {
  try {
    const { userId, language, topic } = req.body;

    if (!userId || !language || !topic) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User ID, language, and topic are required.",
        });
    }

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res
        .status(404)
        .json({ success: false, message: "User progress not found." });
    }

    if (!progress.languages[language]) {
      return res
        .status(400)
        .json({ success: false, message: "Language not found." });
    }

    const languageProgress = progress.languages[language];

    // Move topic from pending to completed
    if (!languageProgress.completed.includes(topic)) {
      languageProgress.completed.push(topic);
      languageProgress.pending = languageProgress.pending.filter(
        (t) => t !== topic
      );
    }

    await progress.save();
    res.json({
      success: true,
      message: "Progress updated!",
      progress: progress.languages,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default progressRoute;
