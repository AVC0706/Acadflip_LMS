const express = require("express");
const router = express.Router();

const Branch = require("../../models/branch");
const isPrincipal = require("../../middleware/Principal/isPrincipal");

//-----------Add Branch---------------
router.post("/addBranch", [isPrincipal], async (req, res) => {
  //start

  console.log(req.body);
  const { name, institute_id, hod, code } = req.body;

  try {
    let branch = await Branch.findOne({ code: code });
    console.log(branch);
    if (branch) {
      return res.status(400).json({ msg: "This Branch Already Exists" });
    }
    newBranch = new Branch({
      name,
      institute_id,
      code,
      HOD: hod,
    });
    console.log(newBranch);
    await newBranch.save();

    res.json({ msg: " Branch Added", branches: newBranch });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//-----------Get All Branch---------------
router.get("/getAllBranch", [isPrincipal], async (req, res) => {
  //start
  console.log("get All brnahces");

  try {
    let branches = await Branch.find({ institute_id: req.user.institute_id });
    console.log(branches.length);

    res.json(branches);

    //end
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

//end
module.exports = router;
