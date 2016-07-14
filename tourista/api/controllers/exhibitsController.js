var Exhibit = require("../models/exhibit");
var User = require("../models/user");

function exhibitsIndex(req, res){
  Exhibit.find({}, function(err, exhibits) {
    if (err) return res.status(404).send(err);
    res.status(200).send(exhibits);
  });
}

function exhibitsCreate(req, res){
  var exhibit = new Exhibit(req.body.exhibit);
  exhibit.save(function(err){
    if (err) return res.status(500).send(err);
  });
}

function exhibitsShow(req, res){
  var id = req.params.id;

  Exhibit.findById({ _id: id }, function(err, exhibit) {
    if (err) return res.status(500).send(err);
    if (!exhibit) return res.status(404).send(err);
    res.status(200).send(exhibit);
  });
}

function exhibitsUpdate(req, res){
  var id = req.params.id;

  Exhibit.findByIdAndUpdate({ _id: id }, req.body.exhibit, function(err, exhibit){
    if (err) return res.status(500).send(err);
    if (!exhibit) return res.status(404).send(err);
    res.status(200).send(exhibit);
  });
}

function exhibitsDelete(req, res){
  var id = req.params.id;

  Exhibit.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  exhibitsIndex:  exhibitsIndex,
  exhibitsCreate: exhibitsCreate,
  exhibitsShow:   exhibitsShow,
  exhibitsUpdate: exhibitsUpdate,
  exhibitsDelete: exhibitsDelete
}
