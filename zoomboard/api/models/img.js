var mongoose = require("mongoose");
var Tag = require("./tag");

var imgSchema = mongoose.Schema({
  source: { type: String, required: true },
  title: { type: String, required: true },
  notes: String,
  tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Img', imgSchema);