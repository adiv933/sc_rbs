import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "your-mongodb-uri";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "test",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConnect;
