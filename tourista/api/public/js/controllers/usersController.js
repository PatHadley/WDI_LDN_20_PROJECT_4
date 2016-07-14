angular
  .module('Tourista')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$stateParams', 'User', 'CurrentUser'];
function UsersController($scope, $stateParams, User, CurrentUser){

  var vm   = this;

  function showUser() {
  }

  function getUsers() {
    User.query(function(data){
      vm.users = data.users;
      console.log("HELLO");
    });
  }

}