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
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("enter a proper email");
      //   }
      // },
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
    tokens: [{
      token: {
          required: true,
          type: String
      }
  }],
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Branch",
    },
  },
  {
    timestamps: true,
  }
);


TeacherSchema.pre("save", async function (next) {
  const teacher = this;

  if (teacher.isModified("password")) {
    teacher.password = await bcrypt.hash(teacher.password, 8);
  }

  next();
});

TeacherSchema.methods.toJSON = function () {
  const teacher = this;
  const teacherObject = teacher.toObject();

  delete teacherObject.password;
  delete teacherObject.tokens

  return teacherObject;
};

TeacherSchema.statics.findByCredentials = async (email,password) => {
  const user = await User.findOne({ email })
  if(!user) {
      throw new Error('Invalid user')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
      throw new Error('invalid login password')
  }

  return user
}


TeacherSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = await jwt.sign({_id:user._id.toString()} , "loveyou3000")

  user.tokens = user.tokens.concat({token})
  await user.save()

  return token 
} 

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
