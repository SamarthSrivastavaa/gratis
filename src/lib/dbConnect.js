import mongoose from "mongoose";

async function dbConnect() {
  try {
    // Use environment variable if available, fallback to localhost
    const mongoUri =  "mongodb+srv://samarthsrivastava897_db_user:AXI9Iaj8nfKozoyf@cluster0.cdggflq.mongodb.net/gratis"
    
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }

    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      
    });
    
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

export default dbConnect;