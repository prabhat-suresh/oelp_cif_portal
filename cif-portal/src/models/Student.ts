const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  job_no: {
    type: Number,
    // required: true,
  },
  username: {
    type: String,
    required: true,
  },
  institute_Id: {
    type: Number,
    required: true,
  },
  payment_funded_from: {
    type: String,
    required: true,
  },
  sponsoredReserch: {
    type: Boolean,

    default: false,
  },
  industrialConsultancy: {
    type: Boolean,

    default: false,
  },
  projectCode: {
    type: Number,
    required: true,
  },
  budgetHead: {
    type: String,
    required: true,
  },
  consumables: {
    type: Boolean,
    default: false,
  },
  contingencies: {
    type: Boolean,
    default: false,
  },
  analytical_charges: {
    type: Boolean,
    default: false,
  },
  others: {
    type: Boolean,
    default: false,
  },
  end_data_of_project: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  institute_emailId: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  experiment: {
    type: String,
    required: true,
  },
  time: [
    {
      type: String,
    },
  ],
  scanning_angle: {
    type: Number,
  },
  powder: {
    type: Boolean,
    default: false,
  },
  thin_film: {
    type: Boolean,
    default: false,
  },
  variable_temp_xrd: {
    type: Boolean,
    default: false,
  },
  xrr: {
    type: Boolean,
    default: false,
  },
  saxs: {
    type: Boolean,
    default: false,
  },
  pole_figure: {
    type: Boolean,
    default: false,
  },
  additional_remarks: {
    type: String,
  },
  sample_comp_exp2: {
    type: String,
  },
  rockwell: {
    type: Boolean,
    default: false,
  },
  brinell: {
    type: Boolean,
    default: false,
  },
  vickers: {
    type: Boolean,
    default: false,
  },
  knoop: {
    type: Boolean,
    default: false,
  },
  additional_parameter_exp2: {
    type: String,
  },
});
const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
