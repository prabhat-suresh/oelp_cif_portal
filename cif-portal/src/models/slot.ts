const mongoose = require("mongoose");
const { Schema } = mongoose;
const SlotSchema = new Schema({
  date: {
    type: String,
    required: true,
  },

  emailId: {
    type: String,
    // required: true,
  },
  time: [
    {
      type: String,

      //  match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  ],
  equipment: {
    type: String,
  },
});
const Slot = mongoose.model("timeslot", SlotSchema);
module.exports = Slot;
