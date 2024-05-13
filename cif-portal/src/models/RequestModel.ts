import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  requestID: {
    type: String,
    required: true,
    unique: true,
  },
  equipmentID: {
    type: Number,
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
  mongoose.models.equipment || mongoose.model("request", requestSchema);

export default Request;
