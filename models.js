const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    regNumber: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);
const vehicleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  staffReg: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  staffReg: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const User = mongoose.Model("User", userSchema);
const Staff = mongoose.Model("Staff", staffSchema);
const Vehicle = mongoose.Model("Vehicle", vehicleSchema);

exports.User = User;
exports.Vehicle = Vehicle;
exports.Staff = Staff;
