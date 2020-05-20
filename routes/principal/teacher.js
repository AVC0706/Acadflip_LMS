const express = require("express");
const router = express.Router();

const Teacher = require("../../models/teacher");
const TeacherAssign = require("../../models/teacherAssign");
const Topic = require('../../models/topic')
const isPrincipal = require("../../middleware/Principal/isPrincipal");
const teacherAuth = require('../../middleware/Teacher/teacher')
//-----------Add Teacher---------------
router.post("/addTeacher", [isPrincipal], async (req, res) => {
  //start

  console.log(req.body);
  const { name, email, password, branch_id, institute_id } = req.body;

  try {
    let teacher = await Teacher.findOne({ email, branch_id });
    if (teacher) {
      return res.status(400).json({ msg: "This Teacher Already Exists" });
    }

    newTeacher = new Teacher({
      name,
      email,
      password,
      branch_id,
      institute_id,
    });

    await newTeacher.save();

    res.json({ msg: " Teacher Added", newTeacher });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//-----------Get All Teacher---------------
router.get("/getAllTeacher", [isPrincipal], async (req, res) => {
  //start
  console.log("get All Teachers");

  try {
    let teacher = await Teacher.find({ institute_id: req.user.institute_id });

    res.json(teacher);

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

//-----------Assign Subject---------------
router.post("/assignSubject", [isPrincipal], async (req, res) => {
  //start

  console.log(req.body);
  const { desc, teacher_id, subject_id } = req.body;

  try {
    let teacher = await Teacher.findById(teacher_id);

    newTeacherAssign = new TeacherAssign({
      description: desc,
      teacher_id,
      subject_id,
      institute_id: req.user.institute_id,
    });

    await newTeacherAssign.save();

    res.json({ msg: " Teacher Assigned", newTeacherAssign });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});


//end
module.exports = router;
