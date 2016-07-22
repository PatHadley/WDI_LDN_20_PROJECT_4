var mongoose = require("mongoose");

var uImageSchema = mongoose.Schema
  ({
    title: {type: String},
    source: {type: String},
    description: {type: String},
  });

 module.exports = mongoose.model('UImage', uImageSchema);


 