const jwt = require("jsonwebtoken");
const config = require("config");
const Teacher = require('../../models/teacher');

const teacherAuth = async (req, res, next) => {
  console.log("teacher");
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await Teacher.findById(decoded.principal._id);

    if (!user) {
      res.status(401).json({ msg: "Sorry User Error" });
    }

    req.token = token;
    req.user = user;

    next();

    //end
  } catch (e) {
    res.status(401).json({ msg: "Please authenticate" });
  }
};

module.exports = teacherAuth;
