import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/user_profiles";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB successfully connected");

    app.listen(PORT, () => {
      console.log(`User Profile Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
})();
