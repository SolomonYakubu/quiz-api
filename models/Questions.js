const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
	questions: {
		type: Array,
		required: true,
	},
	duration: Number,
	spearMode: Boolean,
});
module.exports = mongoose.model("Questions", questionSchema);
