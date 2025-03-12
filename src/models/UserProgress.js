import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  languages: {
    type: Map,
    of: {
      completed: { type: [String], default: [] },
      pending: { type: [String], default: [] },
    },
  },
});

const UserProgress = mongoose.model("UserProgress", UserProgressSchema);

export default UserProgress;
