const mongoose = require("mongoose");

const SemesterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Semester", SemesterSchema);
