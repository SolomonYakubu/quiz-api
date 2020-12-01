const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
    });
    const hashedPassword = user.password;
    const check = await bcrypt.compare(password, hashedPassword);
    if (check) {
      jwt.sign(
        { user },
        process.env.AUTH_SECRET,
        { expiresIn: "15m" },
        (err, token) => {
          if (err) {
            res.json({ message: err.message });
          }
          res.json({ message: "successful", user_id: user.user_id, token });
        }
      );
    } else {
      res.status(403).json({ message: "invalid details" });
    }
  } catch (error) {
    res.status(404).json({ message: "Invalid details" });
  }
});

module.exports = router;
