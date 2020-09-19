var mongoose = require("mongoose");

var doubtSchema = new mongoose.Schema({
	name:String,
	email:String,
	phone:String,
	description:String
});
module.exports = mongoose.model("Doubt", doubtSchema);