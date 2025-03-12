import express from "express";
import Languages from "../models/Languages.js";
const route = express.Router();
import Topics from "../models/Topics.js";
//Add a Language
route.post("/addlan", async (req, res) => {
  const { name, bio, logo } = req.body;
  try {
    const langModel = new Languages({ name, bio, logo });
    await langModel.save();
    res.status(200).json({ message: "the language has been added" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add the language", error });
  }
});

//update the detalis like name logo bio
route.put("/updatelan", async (req, res) => {
  const { name, tobeChanged, newData } = req.body;

  try {
    const item = await Languages.findOne({ name });
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    item.set({ [tobeChanged]: newData });
    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

route.delete("/landelete/:name", async (req, res) => {
  const { name } = req.params;
  try {
    // Find the language by its name
    const dataa = await Languages.findOne({ name: name });
    if (!dataa) {
      return res.status(404).json({ message: "Language not found" });
    }
    
    const allTopics = await Topics.find({ name: name });
    if (allTopics.length != 0) {
      return 
        res.status(201)
        .json({ message: "No topics found for this language" });
        await Topics.deleteMany({ name: name });
    }


    await Languages.deleteOne({ name: name });

    res
      .status(200)
      .json({ message: "Language and associated topics deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting language" });
  }
});




//List the languages
route.get("/language", async (req, res) => {
  try {
    const languages = await Languages.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the data", error });
  }
});
export default route;
