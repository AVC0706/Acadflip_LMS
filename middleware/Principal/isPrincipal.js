const jwt = require("jsonwebtoken");
const config = require("config");
const Principal = require("../../models/Principal");

const isPrincipal = async (req, res, next) => {
  // console.log("Principal");
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await Principal.findById(decoded.principal.id);

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

module.exports = isPrincipal;
