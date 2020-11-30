const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const Quiz = require("../models/quiz");

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json(profile);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});

router.get("/quiz", async (req, res) => {
  try {
    const quiz = await Quiz.find({ privacy: "public" });
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ message: "No entry found" });
  }
});
router.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.find({ profile_id: req.params.id });
    if (quiz != "") {
      res.json(quiz);
    } else {
      res.status(404).json({ message: "NOT FOUND" });
    }
  } catch (error) {
    res.status(404).json({ message: "quiz not found" });
  }
});
router.delete("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    if (quiz) {
      quiz.remove(() => res.json({ message: "Deleted successfully" }));
    } else {
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "quiz not found" });
  }
});

router.patch("/quiz/:id", async (req, res) => {
  const updatedQuiz = req.body;

  try {
    const quiz = await Quiz.updateOne(
      { _id: req.params.id },
      { $set: updatedQuiz },
      (err, result) => {
        if (err) {
          res.json({ message: "An error occured" });
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
