import mongoose from "mongoose";

const connect = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  // A connection attempt is already in progress
  if (mongoose.connection.readyState === 2) {
    console.log("⏳ MongoDB connection already in progress");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connect;