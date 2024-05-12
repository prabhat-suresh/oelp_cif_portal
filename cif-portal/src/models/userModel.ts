import mongoose from "mongoose";
const Role = ["student", "faculty", "labStaff"];
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
    type: Array,
    default: [],
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
const User = mongoose.model("User", userSchema) || mongoose.models.User;
export default User;