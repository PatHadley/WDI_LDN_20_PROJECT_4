var Tag = require("../models/tag");
var Img = require("../models/img");
var User = require("../models/user");

function tagsIndex(req, res){
  Tag.find({}, function(err, tags) {
    if (err) return res.status(404).send(err);
    res.status(200).send(tags);
  });
}

function tagsCreate(req, res){
  var tag = new Tag(req.body.tag);
  tag.save(function(err){
    if (err) return res.status(500).send(err);
    var name = req.body.tag.user;
    User.findOne({ name: name }, function(err, user){
      user.tags.push(tag);
      user.save(function(err, user) {
        res.status(201).send(tag);
      });
    });
  });
}

function tagsShow(req, res){
  var id = req.params.id;

  Tag.findById({ _id: id }, function(err, tag) {
    if (err) return res.status(500).send(err);
    if (!tag) return res.status(404).send(err);
    res.status(200).send(tag);
  });
}

function tagsUpdate(req, res){
  var id = req.params.id;

  Tag.findByIdAndUpdate({ _id: id }, req.body.tag, function(err, tag){
    if (err) return res.status(500).send(err);
    if (!tag) return res.status(404).send(err);
    res.status(200).send(tag);
  });
}

function tagsDelete(req, res){
  var id = req.params.id;

  Tag.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  tagsIndex:  tagsIndex,
  tagsCreate: tagsCreate,
  tagsShow:   tagsShow,
  tagsUpdate: tagsUpdate,
  tagsDelete: tagsDelete
}
