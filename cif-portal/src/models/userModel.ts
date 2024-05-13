import mongoose from "mongoose";
const Role = ["student", "faculty", "labStaff"];
const userSchema = new mongoose.Schema({
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
  },
  department: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "student",
  },
  forgotPasswordtoken: {
    type: String,
  },
  forgotPasswordExpires: {
    type: Date,
  },

  // for student and maybe faculty?
  workingOnProjects: {
    type: Array<String>,
    default: {},
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;