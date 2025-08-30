import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    index: true,
    trim: true,
    minlength: 26,
    maxlength: 42
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000 // Posts can be longer than messages
  },
  likes: [{ 
    type: String,
    trim: true,
    minlength: 26,
    maxlength: 42
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
PostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Ensure unique likes (prevent duplicate likes from same user)
PostSchema.index({ walletAddress: 1, "likes": 1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);