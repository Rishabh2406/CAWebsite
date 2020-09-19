var mongoose = require("mongoose");

var feedbackSchema = new mongoose.Schema({
	name:String,
	phone:String,
	description:String
});
module.exports = mongoose.model("Feedback", feedbackSchema);