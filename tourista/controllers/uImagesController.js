var UImage = require("../models/uImage");
var User = require("../models/user");

function uImagesIndex(req, res){
  UImage.find({}, function(err, uImages) {
    if (err) return res.status(404).send(err);
    res.status(200).send(uImages);
  });
}

function uImagesCreate(req, res){
  var uImage = new UImage(req.body);
  uImage.save(function(err, image){
    if (err) return res.status(500).send(err);
    res.status(201).send(image);
  });

}

function uImagesShow(req, res){
  var id = req.params.id;

  UImage.findById({ _id: id }, function(err, uImage) {
    if (err) return res.status(500).send(err);
    if (!uImage) return res.status(404).send(err);
    res.status(200).send(uImage);
  });
}

function uImagesUpdate(req, res){
  var id = req.params.id;

  UImage.findByIdAndUpdate({ _id: id }, req.body.uImage, function(err, uImage){
    if (err) return res.status(500).send(err);
    if (!uImage) return res.status(404).send(err);
    res.status(200).send(uImage);
  });
}

function uImagesDelete(req, res){
  var id = req.params.id;

  UImage.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  uImagesIndex:  uImagesIndex,
  uImagesCreate: uImagesCreate,
  uImagesShow:   uImagesShow,
  uImagesUpdate: uImagesUpdate,
  uImagesDelete: uImagesDelete
}
