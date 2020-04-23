const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Teacher = require("./teacher");
const validator = require("validator");

const BranchSchema = mongoose.Schema(
  {
    institute_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    HOD: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BranchSchema.virtual("teacher", {
  ref: "Teacher",
  localField: "_id",
  foreignField: "branch",
});
BranchSchema.virtual("subject", {
  ref: "Subject",
  localField: "_id",
  foreignField: "branch_id",
});

module.exports = mongoose.model("Branch", BranchSchema);
