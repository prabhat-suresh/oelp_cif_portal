const mongoose = require("mongoose");
const { Schema } = mongoose;
const PopslotSchema = {
  jobno: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  v: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isVerifiedFin: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  rejectedFin: {
    type: Boolean,
    default: false,
  },
  acceptedFin: {
    type: Boolean,
    deafult: false,
  },
  time: [
    {
      type: String,

      //  match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  ],
  rollNumber: {
    type: Number,
    required: true,
  },

  supervisor: {
    type: String,
    required: true,
  },
};
const Popslot = mongoose.model("Requested Slot", PopslotSchema);

module.exports = Popslot;
