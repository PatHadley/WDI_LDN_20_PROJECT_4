var Img = require("../models/img");
var User = require("../models/user");

function imgsIndex(req, res){
  Img.find({}, function(err, imgs) {
    if (err) return res.status(404).send(err);
    res.status(200).send(imgs);
  });
}

function imgsCreate(req, res){
  var img = new Img(req.body.img);
  img.save(function(err){
    if (err) return res.status(500).send(err);
    var name = req.body.img.user;
    User.findOne({ name: name }, function(err, user){
      user.imgs.push(img);
      user.save(function(err, user) {
        res.status(201).send(img);
      });
    });
  });
}

function imgsShow(req, res){
  var id = req.params.id;

  Img.findById({ _id: id }, function(err, img) {
    if (err) return res.status(500).send(err);
    if (!img) return res.status(404).send(err);
    res.status(200).send(img);
  });
}

function imgsUpdate(req, res){
  var id = req.params.id;

  Img.findByIdAndUpdate({ _id: id }, req.body.img, function(err, img){
    if (err) return res.status(500).send(err);
    if (!img) return res.status(404).send(err);
    res.status(200).send(img);
  });
}

function imgsDelete(req, res){
  var id = req.params.id;

  Img.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  imgsIndex:  imgsIndex,
  imgsCreate: imgsCreate,
  imgsShow:   imgsShow,
  imgsUpdate: imgsUpdate,
  imgsDelete: imgsDelete
}
