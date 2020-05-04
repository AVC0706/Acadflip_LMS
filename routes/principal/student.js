const express = require("express");
const router = express.Router();
const Student = require("../../models/Student");
const fs = require("fs");
const fastcsv = require("fast-csv");
const isPrincipal = require("../../middleware/Principal/isPrincipal");

//-----------Get All Student---------------
router.get("/getAllStudent", [isPrincipal], async (req, res) => {
  //start
  console.log("get All Students");

  try {
    let student = await Student.find({ institute_id: req.user.institute_id });

    res.json(student);

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

//-------------Upload Student Bulk-------------
router.post("/studentUpload", isPrincipal, (req, res) => {
  //start

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  console.log(file);

  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    let stream = fs.createReadStream(`${__dirname}/uploads/${file.name}`);

    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", async (data) => {
        csvData.push({
          rollNo: data[0],
          name: data[1],
          email: data[2],
          password: data[3],
          mobile: data[4],
        });

        try {
          let student = await Student.findOne({
            email: data[2],
            rollNo: data[0],
            institute_id: req.body.institute_id,
            branch_id: req.body.branch_id,
          });

          if (!student && data[0] !== "rollNo") {
            newStudent = new Student({
              rollNo: data[0],
              name: data[1],
              email: data[2],
              password: data[3],
              mobile: data[4],
              institute_id: req.body.institute_id,
              branch_id: req.body.branch_id,
              semester_id: req.body.semester_id,
            });

            await newStudent.save();
          }
          //end
        } catch (e) {
          console.error(e.message);
          res.status(500).send("Server Error");
        }
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();
        console.log(csvData);
      });

    stream.pipe(csvStream);

    res.json({
      fileName: file.name,
      msg: "Student Data Uploaded",
    });
  });

  //end
});

//-----------Delete Student---------------
router.delete("/deleteStudent/:id", [isPrincipal], async (req, res) => {
  //start
  console.log(req.params.id, req.user.institute_id);
  try {
    let student = await Student.findOneAndDelete({
      institute_id: req.user.institute_id,
      _id: req.params.id,
    });
    res.json({ msg: "Student Delete", student });

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

//end
module.exports = router;
