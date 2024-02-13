const mongoose = require("mongoose");
const { Schema } = mongoose;
const RejectionSchema = new Schema({
  jobno: {
    type: Number,
    required: true,
  },
  supervisor: {
    type: String,
  },
  facultyIncharge: {
    type: String,
  },
});
const RejnMessage = mongoose.model("Rejectionmessage", RejectionSchema);
module.exports = RejnMessage;
