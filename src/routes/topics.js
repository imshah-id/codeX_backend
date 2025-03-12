import express from "express";
import Topics from "../models/Topics.js";
import Languages from "../models/Languages.js";

const topicUpdate = express.Router();
topicUpdate.post("/addtopic", async (req, res) => {
  const { name, title, details, bio, level } = req.body;
  const Model = Topics;
  try {
    const langId = await Languages.findOne({ name });
    if (!langId) {
      return res.status(400).json({ message: "Language not found" });
    }
    const existingTopic = await Topics.findOne({ title });
    if (existingTopic) {
      return res
        .status(400)
        .json({ message: "The topic is already listed in the database" });
    }

    const myData = new Model({ name, title, details, bio, level });
    await myData.save();
    res.status(201).json({ message: "the data has been updated " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "the data could not be updated" });
  }
});
//to update the data
topicUpdate.put("/topicput", async (req, res) => {
  const { name, bio, details, level, title } = req.body;
  const { id } = req.params;
  console.log(name,bio,details,title)
  try {
    const topic = await Topics.findOne(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    topic.name = name || topic.name;
    topic.bio = bio || topic.bio;
    topic.details = details || topic.details;
    topic.level = level || topic.level;
    topic.title = title || topic.title;
    await topic.save();

    res.status(200).json({ message: "Topic updated successfully", topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//the get function is under
topicUpdate.get("/listtopics", async (req, res) => {
  const { nam } = req.query;


  if (!nam) {
    return res
      .status(400)
      .json({ message: "Name query parameter is required" });
  }

  try {
    const data = await Topics.find({ name: nam });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No topics found for this name" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the topics" });
  }
});
topicUpdate.delete("/deletetopic/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await Topics.findById(id);
    if (!deleteItem) {
      return res.status(404).json({ message: "Topic not found" });
    }
    await Topics.findByIdAndDelete(id);
    res.status(200).json({ message: "Item has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting topic" });
  }
});


export default topicUpdate;
