const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const Quiz = require("../models/quiz");

//get all profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json(profile);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});

//get a profile by id
router.get("/:profile_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      profile_id: req.params.profile_id,
    });
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

//get a quiz by profile_id
router.get("/quiz/:profile_id", async (req, res) => {
  try {
    const quiz = await Quiz.find({ profile_id: req.params.profile_id });
    if (quiz != "") {
      res.json(quiz);
    } else {
      res.status(404).json({ message: "NOT FOUND" });
    }
  } catch (error) {
    res.status(404).json({ message: "quiz not found" });
  }
});

//Update profile
router.patch("/:profile_id", async (req, res) => {
  const updatedProfile = req.body;

  try {
    const profile = await Profile.updateOne(
      { profile_id: req.params.profile_id },
      { $set: updatedProfile },
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
router.patch("/password-change/:profile_id", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const profile = await Profile.findOne({
      profile_id: req.params.profile_id,
    });
    const password = profile.password;

    const check = await bcrypt.compare(oldPassword, password);
    if (check) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      profile.updateOne(
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

router.delete("/:profile_id", async (req, res) => {
  const { password } = req.body;
  try {
    const profile = await Profile.findOne({
      profile_id: req.params.profile_id,
    });
    const hashedPassword = profile.password;
    const check = await bcrypt.compare(password, hashedPassword);
    if (check) {
      profile.remove(() =>
        res.json({ message: "profile deleted successfully" })
      );
    } else {
      res.json({ message: "invalid password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
