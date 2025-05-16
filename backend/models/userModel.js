import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
