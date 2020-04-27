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

router.post("/login", async (req,res) => {

  try {
      const user = await Teacher.findByCredentials(req.body.email,req.body.password)
      const token = await user.generateAuthToken()

      res.json({user,token})

  } catch(e) {
      res.status(400).send(e)
  }
})

router.get('/particularAssignedSub', [teacherAuth], async (req,res) => {
  console.log("all assigned subjects of teacher" + req.user.teacher_id)
  try {
    let sub = await TeacherAssign.find({institute_id: req.user.institute_id, teacher_id: req.user.teacher_id})

    console.log("subject seen!")

    res.json(sub)

  } catch(e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.post('/createUnit', [teacherAuth],async (req,res)=> {
  console.log('process started for creating topic');
  const {unit_no, name,description,subject_id} = req.body
  try { 
    let unit = Unit.find({unit_no})
    if(unit) {
      res.status(400).send()
    }

    const newUnit = new Unit({
      unit_no,
      name,
      description,
      subject_id,
      institute_id: req.user.institute_id
    })

   await newUnit.save()
   res.json({msg:'teacher added successfully', newUnit})

  } catch(e) {
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

router.get('/getUnit',[teacherAuth], async (req,res)=> {
  try {
  const unit = await Unit.find({institute_id: req.user.institute_id,subject_id:req.user.institute_id})
  if(!unit) {
    throw new Error('unit is not present first create the units')
  } 

  res.send(unit)
} catch(e) {
  res.status(500).send(e)
}
})


//end
module.exports = router;
