import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  projectFunds: {
    type:Number,
    default:0
  }
});
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;