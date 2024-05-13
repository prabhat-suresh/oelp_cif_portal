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
  projectID: {
    type: Number,
    required: true,
  },
  projectAdminID: {
    type: String,
    required: true,
  },
  PA_approval: {
    type: Boolean,
    default: null,
  },
  Staff_approval: {
    type: Boolean,
    default: null,
  },
  labStaffID: {
    type: String,
    required: true,
  },
});

const Request =
  mongoose.models.equipment || mongoose.model("request", requestSchema);

export default Request;
