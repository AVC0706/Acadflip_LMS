const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const TeacherAssign = require("./teacherAssign");

const TeacherSchema = mongoose.Schema(
  {
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
      unique: true,
      required: true,
      trim: true,
      lowercase: true,

    },
    password: {
      type: String,
      required: true,
      trim: true,
      // minlength: 8,
      // validate(value) {
      //   if (value.toLowerCase().includes("password")) {
      //     throw new Error("password can't be passowrd");
      //   }
      // },
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: "Branch",
    },
  },
  {
    timestamps: true,
  }
);


TeacherSchema.pre("save", async function (next) {
  const teacher = this;

  if (teacher.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password, salt);
  }

  next();
});



const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
