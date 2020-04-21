const express = require("express");
const router = express.Router();
const SuperAdmin = require("../../models/Superadmin");
const config = require("config");
const jwt = require("jsonwebtoken");

//Register
router.post("/adminR", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await SuperAdmin.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    superadmin = new SuperAdmin({
      name,
      email,
      password,
    });

    await superadmin.save();

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
        res.json({ token });
      }
    );

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
