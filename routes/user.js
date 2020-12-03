const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const { checkToken, checkRefreshToken } = require("../auth/auth.js");
const jwt = require("jsonwebtoken");
//get all user user
router.get("/", checkToken, async (req, res) => {
  try {
    const user = await User.find();
    res.json(res.userData);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});

//get a user by user_id
router.get("/:user_id", checkToken, async (req, res) => {
  try {
    const user = await User.findOne({
      user_id: req.params.user_id,
    });
    const { name, date, displayProfile, email, username } = user;

    const profile = {
      name,
      date,
      displayProfile,
      email,
      username,
    };
    res.json(profile);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});

//get all public quiz
router.get("/public/quiz", async (req, res) => {
  try {
    const quiz = await Quiz.find({ privacy: "public" });
    res.json(quiz);
    console.log(quiz);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});

//get a quiz by user_id
router.get("/quiz/:user_id", async (req, res) => {
  try {
    const quiz = await Quiz.find({ user_id: req.params.user_id });
    if (quiz != "") {
      res.json(quiz);
    } else {
      res.status(404).json({ message: "NOT FOUND" });
    }
  } catch (error) {
    res.status(404).json({ message: "quiz not found" });
  }
});
//refresh-token routes
router.post("/refresh-token", checkRefreshToken, (req, res) => {
  const { user_id } = req.body;
  const userData = res.userData;
  console.log(user_id, userData);
  try {
    if (user_id === userData.user_id) {
      const token = jwt.sign({ user_id }, process.env.AUTH_SECRET, {
        expiresIn: "1m",
      });
      if (token) {
        res.json({ user_id, token });
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//Update user
router.patch("/:user_id", checkToken, async (req, res) => {
  const updatedUser = req.body;
  const userToken = res.userData;

  if (userToken.profile.user_id !== req.params.user_id) {
    return res
      .status(401)
      .json({ message: "You are not authorized to update user information" });
  }
  try {
    const user = await User.updateOne(
      { user_id: req.params.user_id },
      { $set: updatedUser },
      (err, result) => {
        if (err) {
          res.json({ message: "An error occured" });
        } else {
          res.json({ message: "Updated successfully", result: result });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Change password
router.patch("/password-change/:user_id", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({
      user_id: req.params.user_id,
    });
    const password = user.password;

    const check = await bcrypt.compare(oldPassword, password);
    if (check) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      user.updateOne(
        { $set: { password: newHashedPassword } },
        (err, result) => {
          if (err) {
            res.json({ message: "an error occurred" });
          } else {
            res.json({
              message: "Password updated successfully",
              result: result,
            });
          }
        }
      );
    } else {
      res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//delete user
router.delete("/:user_id", async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      user_id: req.params.user_id,
    });
    const hashedPassword = user.password;
    const check = await bcrypt.compare(password, hashedPassword);
    if (check) {
      user.deleteOne(() => res.json({ message: "user deleted successfully" }));
    } else {
      res.json({ message: "invalid password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
