const express = require("express");
const router = express.Router();
const Ins = require("../../models/Institute");
const Principal = require("../../models/Principal");
const isSuperAdmin = require("../../middleware/SuperAdmin/isSuperAdmin");

//Add Institute
router.post("/addInstitute", [isSuperAdmin], async (req, res) => {
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
      name: iuser,
      email,
      password,
    });

    await principal.save();

    res.json({ msg: "Institute Registered" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//get All institutes
router.get("/getAllInstitutes", async (req, res) => {
  try {
    let institute = await Ins.find();

    res.json(institute);
    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

router.get("/editInstitute/:id", async (req, res) => {
  try {
    let institute = await Ins.findById(req.params.id);
    if (institute) res.json(institute);
    else return res.status(400).json({ msg: "Institute Doesn't Exists" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// Update The Institute Details
router.post("/updateInstitute/:id", async (req, res) => {
  try {
    let institute = await Ins.findById(req.params.id);
    if (!institute)
      return next(new Error("Unable To Find Institute With This Id"));
    else {
      institute.name = req.body.name;
      institute.iuser = req.body.iuser;
      institute.email = req.body.email;
      institute.password = req.body.password;

      institute.save().then((emp) => {
        res.json("institute Updated Successfully");
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// Delete a Institute
router.delete("/deleteInstitute/:id", async (req, res) => {
  try {
    let institute = await Ins.findOneAndDelete(req.params.id);

    res.json({ msg: "Institute Delete", institute });

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
