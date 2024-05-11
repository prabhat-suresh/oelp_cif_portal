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
    type: Intl,
    default: 0,
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

// import mongoose from "mongoose";
// const Role = {
//   student: "student",
//   faculty: "faculty",
//   labStaff: "labStaff",
// };
// const User = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     min: 3,
//     max: 20,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     min: 8,
//   },
//   mobile: {
//     type: String,
//     required: true,
//     unique: true,
//     min: 10,
//     max: 13,
//   },
//   department: {
//     type: String,
//     require: true,
//   },
//   // supervisor: [
//   //   {
//   //     type: Schema.Types.ObjectId, // Store ObjectIds for MongoDB references
//   //     ref: "Faculty", // Reference to your 'Project' model
//   //     default: null,
//   //   },
//   // ],
//   // role: {
//   //   type: Role,
//   //   default: Role.student,
//   // },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isFaculty: {
//     type: Boolean,
//     default: false,
//   },
//   isLabStaff: {
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordtoken: {
//     type: String,
//   },
//   forgotPasswordExpires: {
//     type: Date,
//   },
//   verifyEmailToken: {
//     type: String,
//   },
//   verifyEmailExpires: {
//     type: Date,
//   },

//   // faculty
//   // mentoringProjects: [
//   //   {
//   //     type: Schema.Types.ObjectId, // Store ObjectIds for MongoDB references
//   //     ref: "Project", // Reference to your 'Project' model
//   //     default: null,
//   //   },
//   // ],
//   // mentoringStudents: [
//   //   {
//   //     type: Schema.Types.ObjectId, // Store ObjectIds for MongoDB references
//   //     ref: "User", // Reference to your 'User' model
//   //     default: null,
//   //   },
//   // ],
//   // labstaff
//   // equipmentsUnder: [
//   //   {
//   //     type: Schema.Types.ObjectId, // Store ObjectIds for MongoDB references
//   //     ref: "Equipment", // Reference to your 'Equipment' model
//   //     default: null,
//   //   },
//   // ],
// });

// // const User = mongoose.model.users || mongoose.model("users", userSchema);

// export default User;
