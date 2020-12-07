const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });
    const hashedPassword = user.password;
    const check = await bcrypt.compare(password, hashedPassword);

    if (check) {
      const profile = {
        user_id: user.user_id,
      };
      const token = jwt.sign(profile, process.env.AUTH_SECRET, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign(profile, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "15d",
      });
      if (token && refreshToken) {
        res.status(201).json({
          user_id: user.user_id,
          token,
          refreshToken,
        });
      }
    } else {
      res.status(401).json({ message: "invalid details" });
    }
  } catch (error) {
    res.status(404).json({ message: "Invalid details" });
  }
});

module.exports = router;
