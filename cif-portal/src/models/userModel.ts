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

  // for faculty only
  // headingProjects: {
  //   type:Array<String>,
  //   default: {},
  // },
  // fpr lab staff only
  // equipmentsUnderSupervision: {
  //   type: Array<String>,
  //   default: {}
  // }
});
const User = mongoose.model("User", userSchema) || mongoose.models.User;
export default User;