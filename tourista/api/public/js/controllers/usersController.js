angular
  .module('Tourista')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$stateParams', 'User', 'CurrentUser'];
function UsersController($scope, $stateParams, User, CurrentUser){

  var vm   = this;

  function showUser() {
    User.get({ id: $stateParams.id }, function(res){
      $scope.$parent.users.user = res.user;
    });
  }

  function getUsers() {
    User.query(function(data){
      vm.users = data.users;
      console.log("HELLO MOFO");
    });
  }

}