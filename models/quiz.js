const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
	quiz: { type: Array, required: true },
	subject: {
		type: String,
		default: "Unspecified",
	},
	testDuration: { type: Number, required: true },
	uploadTime: {
		type: Date,
		required: true,
		default: Date.now,
	},
	profile_id:{
		type:String, 
		required:true,
		
	},
	privacy:{
		type:String,
		required:true,
		default:"public"

	}
});
module.exports = mongoose.model("Quiz", quizSchema);
