angular
  .module('Tourista')
  .controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["$scope", "User", "CurrentUser", "$state"];
function loginCtrl($scope, User, CurrentUser, $state){
  var vm = this;
  vm.login = function(){
    User.login(vm.user, function(data){
      var user = data.user ? data.user : null;
      if (user) {
        // $scope.$parent.main.user = user;
        CurrentUser.saveUser(user);
        $state.go("home");
      }
    });
  };
}