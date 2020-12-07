const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user_id = uuidv4();
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      displayuser: req.body.displayuser,
      user_id: user_id,
    });
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const newuser = await user.save(() => {
      const token = jwt.sign({ user_id }, process.env.AUTH_SECRET, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign(
        { user_id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "15d" }
      );
      if (token && refreshToken) {
        res.status(201).json({
          user_id,
          token,
          refreshToken,
        });
      }
    });
  } catch (err) {
    res.status(401).json({ message: "An error occurred" });
  }
});

module.exports = router;
