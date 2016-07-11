var mongoose = require("mongoose");

var uImageSchema = mongoose.Schema
  ({
    title: {type: String, required: true, unique: true},
    source: {type: String, required: true},
    description: {type: String},
  });

 module.exports = mongoose.model('UImage', uImageSchema);


 