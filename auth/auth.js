const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    res.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};
module.exports = checkToken;
