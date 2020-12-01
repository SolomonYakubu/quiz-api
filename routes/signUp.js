const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user_id = uuidv4();
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      displayuser: req.body.displayuser,
      user_id: user_id,
    });
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (!(await User.findOne({ username: req.body.username }))) {
      const newuser = await user.save(() =>
        res.status(201).json({ message: "user created successfully" })
      );
    } else {
      res.status(400).json({ message: "Username already exist" });
    }
  } catch (err) {
    res.status(401).json({ message: "An error occurred" });
  }
});

module.exports = router;
