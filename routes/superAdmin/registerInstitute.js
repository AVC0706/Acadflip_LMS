const express = require("express");
const router = express.Router();
const Ins = require("../../models/Institute");
const Principal = require("../../models/Principal");
const config = require("config");
const jwt = require("jsonwebtoken");

//Register
router.post("/addInstitute", async (req, res) => {
  const { name, iuser, email, password } = req.body;

  try {
    let institute = await Ins.findOne({ email });

    if (institute) {
      return res.status(400).json({ msg: "This Institute Already Exists" });
    }
    institute = new Ins({
      name,
      iuser,
      email,
      password,
    });

    await institute.save();

    principal = new Principal({
      institute_id: institute.id,
      name,
      iuser,
      email,
      password,
    });

    await principal.save();

    res.json({ msg: "Institute Registered" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
