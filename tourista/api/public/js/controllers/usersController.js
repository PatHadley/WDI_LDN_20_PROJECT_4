angular
  .module('Tourista')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$stateParams', 'User', 'CurrentUser'];
function UsersController($scope, $stateParams, User, CurrentUser){

  var vm   = this;

}