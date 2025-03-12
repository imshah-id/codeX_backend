import mongoose from "mongoose";
const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    title: { type: String, required: true, unique: true }, 
    bio: { type: String, required: true }, 
    details: { type: String, required:true},
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    }, 
  },
);

const Topics = mongoose.model("Topics", TopicSchema);
export default Topics;
