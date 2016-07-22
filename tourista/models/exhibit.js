var mongoose = require("mongoose");
var UImage = require("./uImage");
var RImage = require("./rImage");

var exhibitSchema = mongoose.Schema
  ({
    title: {type: String, required: true},
    description: {type: String},
    userImages: [{type: mongoose.Schema.ObjectId, ref: 'UImage'}],
    rijkImages: [{type: mongoose.Schema.ObjectId, ref: 'RImage'}]
  });

 module.exports = mongoose.model('Exhibit', exhibitSchema);