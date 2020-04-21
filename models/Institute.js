const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const InstituteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  iuser: {
    type: String,
    required: true,
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
  type: {
    type: String,
  },

  is_active: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

InstituteSchema.pre("save", async function (next) {
  const institute = this;

  if (institute.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    institute.password = await bcrypt.hash(institute.password, salt);
  }
  next();
});

module.exports = mongoose.model("institute", InstituteSchema);
