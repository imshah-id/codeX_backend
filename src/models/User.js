import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  selectedLanguage: { type: String },
  password: { type: String, required: true },
  progress: [
    {
      topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
      completedSubtopices: [String],
    },
  ],
});
export default mongoose.model("User", userSchema);
