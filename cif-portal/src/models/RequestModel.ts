import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  equipmentID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  paApproval: {
    type: Boolean,
    default: null,
  },
  staffApproval: {
    type: Boolean,
    default: null,
  },
  status:{
    type: Boolean,
    default: false
  }
});

const Request =
  mongoose.models.Request || mongoose.model("request", requestSchema);

export default Request;
