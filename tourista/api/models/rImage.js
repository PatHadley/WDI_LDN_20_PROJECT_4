var mongoose = require("mongoose");

var rImageSchema = mongoose.Schema
  ({
    title: {type: String},
    artist: {type: String,},
    source: {type: String},
    link: {type: String},
    description: {type: String},
  });

 module.exports = mongoose.model('RImage', rImageSchema);