const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const TeacherAssign = require("./teacherAssign");

const SubjectScehma = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    semester_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    institute_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

SubjectScehma.virtual("teacherAssign", {
  ref: "TeacherAssign",
  localField: "_id",
  foreignField: "subject_id",
});

const Subject = mongoose.model("Subject", SubjectScehma);

module.exports = Subject;
