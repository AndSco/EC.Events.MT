const jwt = require("jsonwebtoken");
const {adminUsername, adminPassword} = require("../config");
const { jwtKey } = require("../config");

const hasAdminPermission = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get token from the headers. Split because the token is after the word Bearer and space
    if (!token) console.log("error!!!!")
    const decoded = jwt.verify(token, jwtKey);
    const { username, password } = decoded;
    const permissionGranted = username === adminUsername && password === adminPassword;
    
    if (!permissionGranted) {
      return res.status(403).json(
        { status: 403, message: "Please log in first" }
      );
    } else {
      return next();
    }
  } catch (err) {
    return res.status(403).json({status: 403, message: "Please log in first"});
  }
};

module.exports = hasAdminPermission;