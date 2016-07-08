var mongoose = require("mongoose");

var tagSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String
});

module.exports = mongoose.model('Tag', tagSchema);