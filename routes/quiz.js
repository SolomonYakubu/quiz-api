const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Quiz = require("../models/quiz");
mongoose.Promise = global.Promise;

//getting all questions
router.get("/", async (req, res) => {
	try {
		const quiz = await Quiz.find();

		res.json(quiz);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//getting a particular quiz by Id
router.get("/:id", getQuiz, (req, res) => {
	res.json(res.quiz);
});
//creating quiz
router.post("/", async (req, res) => {
	// console.log(req.body);
	const quiz = new Quiz({
		quiz: req.body.quiz,
		subject: req.body.subject,
		testDuration: req.body.duration,
	});
	try {
		const newQuiz = await quiz.save();
		res.status(201).json(newQuiz);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//deleting a question
router.delete("/:id", getQuiz, async (req, res) => {
	try {
		await res.quiz.remove();
		res.json({ message: "Deleted quiz successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
async function getQuiz(req, res, next) {
	let quiz;
	try {
		quiz = await Quiz.findById(req.params.id);
		if (quiz == null) {
			return res.status(404).json({ message: "Question not found" });
		}
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
	res.quiz = quiz;
	next();
}
module.exports = router;
