var mongoose = require("mongoose");

var rImageSchema = mongoose.Schema
  ({
    title: {type: String, required: true, unique: true},
    artist: {type: String, required: true},
    source: {type: String, required: true},
    link: {type: String, required: true},
    description: {type: String},
  });

 module.exports = mongoose.model('RImage', rImageSchema);