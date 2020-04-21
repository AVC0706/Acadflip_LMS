const express = require("express");
const router = express.Router();
const SuperAdmin = require("../../models/Superadmin");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isSuperAdmin = require("../../middleware/SuperAdmin/isSuperAdmin");

//Get logged in user
// router.get("/", (req, res) => {
//   res.json({ user: req.user });
// });

//Login
router.post("/", async (req, res) => {
  //start

  const { email, password } = req.body;

  try {
    let superadmin = await SuperAdmin.findOne({ email });

    if (!superadmin) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, superadmin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const payload = {
      superadmin: {
        id: superadmin.id,
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
        res.json({ token, user });
      }
    );

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

router.get("/superAdmin", [isSuperAdmin], (req, res) => {
  console.log("SuperAdmin");
  res.json({ user: req.user, msg: "SuperAdmin User" });
});

module.exports = router;
