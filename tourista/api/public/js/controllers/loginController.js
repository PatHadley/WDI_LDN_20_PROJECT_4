angular
  .module('Tourista')
  .controller("loginController", loginCtrl);

loginCtrl.$inject = ["$scope", "User", "CurrentUserService", "$state"];
function loginCtrl($scope, User, CurrentUserService, $state){
  var vm = this;
  vm.login = function(){
    User.login(vm.user, function(data){
      var user = data.user ? data.user : null;
      if (user) {
        // $scope.$parent.main.user = user;
        CurrentUserService.saveUser(user);
        $state.go("usersIndex");
      }
    });
  };
}