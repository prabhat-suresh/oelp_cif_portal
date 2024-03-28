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
  PA_approval: {
    type: Boolean,
    default: false,
  },
  Staff_approval: {
    type: Boolean,
    default: false,
  },
});

const Request =
  mongoose.models.equipment || mongoose.model("request", requestSchema);

export default Request;
