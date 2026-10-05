import mongoose from "mongoose";

const connect = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
   
    return;
  }

  // A connection attempt is already in progress
  if (mongoose.connection.readyState === 2) {
   
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connect;