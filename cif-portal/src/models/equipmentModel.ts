import mongoose from "mongoose";
const equipmentSchema = new mongoose.Schema({
  equipmentID: {
    type: Number,
    required: true,
    unique: true,
  },
  equipmentName: {
    type: String,
    // required: true,
  },
  status: {
    type: Boolean,
    // required: true,
  },
  description: {
    type: String,
  },
  timeSlots: {
    type: Array<Array<Date>>,
    default: {},
  },
});

const Equipment =
  mongoose.models.equipment || mongoose.model("equipment", equipmentSchema);

export default Equipment;
