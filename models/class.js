var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
	date:String,
	morning:String,
	evening:String
});
module.exports = mongoose.model("Class", classSchema);