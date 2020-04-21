const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PrincipalSchema = mongoose.Schema({
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  name: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});

PrincipalSchema.pre("save", async function (next) {
  const principal = this;

  if (principal.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    principal.password = await bcrypt.hash(principal.password, salt);
  }
  next();
});

module.exports = mongoose.model("principal", PrincipalSchema);
