angular.module('ZoomBoard')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$resource', 'User'];

function UsersController($resource, User){
  var self = this
  this.users = [];

  this.getUsers = function(){
    this.users = User.query();
  };

  this.showUser = function(user){

  };

  this.updateUser = function(){
  };

  this.addUser = function(){
    User.save({user: self.newUser}, function(user){
      self.users.push({user: self.newUser});
      self.getUsers()
    });
  };

  this.deleteUser = function(user){
    User.delete({id: user._id}, function(){
      self.getUsers();
    });
  };

  this.getUsers();
};

