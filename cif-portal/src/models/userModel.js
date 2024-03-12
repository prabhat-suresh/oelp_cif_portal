import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 13,
  },
  department: {
    type: String,
    require: true,
  },
  supervisor: {
    type: String,
    default: "None",
  },
  role: {
    type: String,
    default: "student",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordtoken: {
    type: String,
  },
  forgotPasswordExpires: {
    type: Date,
  },
  verifyEmailToken: {
    type: String,
  },
  verifyEmailExpires: {
    type: Date,
  },
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
