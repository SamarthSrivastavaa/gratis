import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    index: true,
    trim: true,
    minlength: 26, // Minimum length for wallet addresses
    maxlength: 42  // Maximum length for wallet addresses
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
MessageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);