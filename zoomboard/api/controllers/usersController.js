var User = require("../models/user");

function usersIndex(req, res){
  User.find({}).populate("imgs").exec(function(err, users){
    if (err) return res.status(404).send(err);
    res.status(200).send(users);
  });
}

function usersCreate(req, res){
  var user = new User(req.body.user);
  user.save(function(err, user) {
    if (err) return res.status(500).send(err);
    res.status(201).send(user);
  });
}

function usersShow(req, res){
  var id = req.params.id;
  User.findById({ _id: id }).populate("imgs").exec(function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  });
}

function usersUpdate(req, res){
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

function usersDelete(req, res){
  var id = req.params.id;
  User.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  usersIndex:  usersIndex,
  usersCreate: usersCreate,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};
