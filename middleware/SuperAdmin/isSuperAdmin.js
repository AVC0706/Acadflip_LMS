const jwt = require("jsonwebtoken");
const config = require("config");
const SuperAdmin = require("../../models/Superadmin");

const isSuperAdmin = async (req, res, next) => {
  console.log("admin");
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await SuperAdmin.findById(decoded.superadmin.id);

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

module.exports = isSuperAdmin;
