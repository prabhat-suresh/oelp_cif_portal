const mongoose = require("mongoose");
const { Schema } = mongoose;
const PrevSchema = new Schema({
  jobno: {
    type: Number,
  },
  date: {
    type: String,
  },
  time: [
    {
      type: String,

      //  match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  ],
  experiment: {
    type: String,
  },
});
const PrevData = mongoose.model("previous notification", PrevSchema);
module.exports = PrevData;
