const express = require("express");
const router = express.Router();

const Subject = require("../../models/subject");
const isPrincipal = require("../../middleware/Principal/isPrincipal");

//-----------Add Subject---------------
router.post("/addSubject", [isPrincipal], async (req, res) => {
  //start

  console.log(req.body);
  const { name, code, branch_id, semester_id } = req.body;

  try {
    let subject = await Subject.findOne({ code: code });
    if (subject) {
      return res.status(400).json({ msg: "This Branch Already Exists" });
    }
    newSubject = new Subject({
      name,
      code,
      branch_id,
      semester_id,
      institute_id: req.user.institute_id,
    });
    await newSubject.save();

    res.json({ msg: " Subject Added", subject: newSubject });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//-----------Get All Subject---------------
router.get("/getAllSubject", [isPrincipal], async (req, res) => {
  //start
  console.log("get All subject");

  try {
    let subject = await Subject.find({ institute_id: req.user.institute_id });

    res.json(subject);

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

//end
module.exports = router;
