const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobNo = new Schema({
  jobno: {
    type: Number,
    required: true,
    default: 1001,
  },
});

const Counter = mongoose.model("Counter", JobNo);

module.exports = Counter;
