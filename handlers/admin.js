const { adminUsername, adminPassword, jwtKey } = require("../config");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isLoginSuccessful =
      username === adminUsername && password === adminPassword;
    let token = undefined;

    if (isLoginSuccessful) {
      token = jwt.sign({ username, password }, jwtKey);
      console.log("TOKEN", token);
    }
    res.status(200).json({
      managedToLogin: isLoginSuccessful,
      token
    });
  } catch (err) {
    return next(err);
  }
};
