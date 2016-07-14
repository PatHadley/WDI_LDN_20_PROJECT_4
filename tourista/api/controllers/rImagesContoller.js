var RImage = require("../models/rImage");
var User = require("../models/user");

function rImagesIndex(req, res){
  RImage.find({}, function(err, rImages) {
    if (err) return res.status(404).send(err);
    res.status(200).send(rImages);
  });
}

function rImagesCreate(req, res){
  var rImage = new RImage(req.body.rImage);
  rImage.save(function(err){
    if (err) return res.status(500).send(err);
  });
}

function rImagesShow(req, res){
  var id = req.params.id;

  RImage.findById({ _id: id }, function(err, rImage) {
    if (err) return res.status(500).send(err);
    if (!rImage) return res.status(404).send(err);
    res.status(200).send(rImage);
  });
}

function rImagesUpdate(req, res){
  var id = req.params.id;

  RImage.findByIdAndUpdate({ _id: id }, req.body.rImage, function(err, rImage){
    if (err) return res.status(500).send(err);
    if (!rImage) return res.status(404).send(err);
    res.status(200).send(rImage);
  });
}

function rImagesDelete(req, res){
  var id = req.params.id;

  RImage.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  rImagesIndex:  rImagesIndex,
  rImagesCreate: rImagesCreate,
  rImagesShow:   rImagesShow,
  rImagesUpdate: rImagesUpdate,
  rImagesDelete: rImagesDelete
}
