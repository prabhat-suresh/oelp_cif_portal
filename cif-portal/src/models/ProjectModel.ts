const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  email: {
    type: String,
  },
  job_no: {
    type: Number,
  },
  supervisor_accept: {
    type: Boolean,
    default: false,
  },
  supervisor_reject: {
    type: Boolean,
    default: false,
  },
  supervisor_note: {
    type: String,
  },
  faculty_inch_accept: {
    type: Boolean,
    default: false,
  },
  faculty_inch_reject: {
    type: Boolean,
    default: false,
  },
  faculty_inch_note: {
    type: String,
  },
});
const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
