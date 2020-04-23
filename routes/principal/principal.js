const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const fastcsv = require("fast-csv");
const Principal = require("../../models/Principal");
const Semester = require("../../models/semester");
const isPrincipal = require("../../middleware/Principal/isPrincipal");
const bcrypt = require("bcryptjs");

//---------Principal Login---------------
router.post("/login", async (req, res) => {
  //start

  const { email, password } = req.body;

  try {
    let principal = await Principal.findOne({ email });

    if (!principal) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, principal.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const payload = {
      principal: {
        id: principal.id,
        isPrincipal: true,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        console.log("logged in");
        res.json({ token, principal });
      }
    );

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//---------Load Principal user---------------
router.get("/isPrincipal", [isPrincipal], (req, res) => {
  console.log("This is principal");
  res.json({ isPrincipal: true, user: req.user, msg: "Principal User" });
});

//-----------Add Semester---------------
router.post("/addSemester", async (req, res) => {
  //start

  const { name, code } = req.body;

  try {
    let sem = await Semester.findOne({ code: code });
    if (sem) {
      return res.status(400).json({ msg: "This Semester Already Exists" });
    }
    newSem = new Semester({
      name,
      code,
    });
    await newSem.save();

    res.json({ msg: " Sem Added" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//-----------Get All Semester---------------
router.get("/getSemester", async (req, res) => {
  //start

  try {
    let sems = await Semester.find({});

    res.json({ msg: " Sem Fetched", sems });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//-------------Upload teacher Bulk---------------
router.post("/bulkTeacherUpload", (req, res) => {});

//-------------Upload Student Bulk-------------
router.post("/bulkStudentUpload", (req, res) => {
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
          });

          if (!student) {
            student = new Student({
              rollNo: data[0],
              name: data[1],
              email: data[2],
              password: data[3],
              mobile: data[4],
            });

            await student.save();
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

//end
module.exports = router;
