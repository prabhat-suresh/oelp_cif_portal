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
  description: {
    type: String,
  },
  timeSlots: {
    type: Array<Array<Date>>,
    default: {},
  },
  totalQuantity: {
    type: Number,
    default: 1
  },
  damagedQuantity: {
    type: Number,
    default: 0
  },
  availableQuantity: {
    type: Number,
    default: 1
  },
  labStaff: {
    type: Array<String>,
    required: true,
    default: {},
  }
});

const Equipment =
  mongoose.models.equipment || mongoose.model("equipment", equipmentSchema);

export default Equipment;
