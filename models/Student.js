const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:"superadmin"
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:"branch"
  },
  semester_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:"semester"
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
  },
  device_id: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
  updatedAT: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
  },
});

StudentSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  user.updatedAT = Date.now();
  next();
});

module.exports = mongoose.model("student", StudentSchema);
