const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkToken = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"].split(" ")[1];
    if (!authHeader) {
      return res.json({ message: "Undefined" });
    }
    const token = await jwt.verify(authHeader, process.env.AUTH_SECRET);
    res.userData = token;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};
module.exports = checkToken;
