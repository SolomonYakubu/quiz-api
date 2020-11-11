const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
	questions: { type: Array, required: true },
	testDuration: { type: Number, required: true },
	uploadTime: {
		type: Date,
		required: true,
		default: Date.now,
	},
});
module.exports = mongoose.model("Questions", questionSchema);
