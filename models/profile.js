const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	displayProfile: {
		type: String,
		required: true,
		default: "ninja",
	},
	quizId: {
		type: Object,
	},
});

module.exports = mongoose.model("Profile", profileSchema);
