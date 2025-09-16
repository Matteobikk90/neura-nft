import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("❌ MONGO_URI not set in .env");
    }

    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectMongo;
