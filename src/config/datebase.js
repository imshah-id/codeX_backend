import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dataBB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("The database has been connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
export default dataBB