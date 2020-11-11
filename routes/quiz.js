const express = require("express");
const mongoose = require("mongoose");
const { mongo } = require("mongoose");
const router = express.Router();
const Questions = require("../models/questions");
mongoose.Promise = global.Promise;

//getting all questions
router.get("/", async (req, res) => {
	try {
		const questions = await Questions.find();

		res.json(questions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//getting a particular question by Id
router.get("/:id", getQuestion, (req, res) => {
	res.json(res.question);
});
//creating questions
router.post("/", async (req, res) => {
	// console.log(req.body);
	const question = new Questions({
		questions: req.body.questions,
		testDuration: req.body.duration,
	});
	try {
		const newQuestion = await question.save();
		res.status(201).json(newQuestion);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//deleting a question
router.delete("/:id", getQuestion, async (req, res) => {
	try {
		await res.question.remove();
		res.json({ message: "Deleted question successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
async function getQuestion(req, res, next) {
	let question;
	try {
		question = await Questions.findById(req.params.id);
		if (question == null) {
			return res.status(404).json({ message: "Question not found" });
		}
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
	res.question = question;
	next();
}
module.exports = router;
