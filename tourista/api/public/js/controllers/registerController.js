angular
  .module('Tourista')
  .controller("registerCtrl", registerCtrl);

registerCtrl.$inject = ["User", "$state"];
function registerCtrl(User, $state){
  var vm = this;
  vm.register = function(){
    User.register(vm.user, function(data){
      var user = data.user ? data.user : null;
      if (user) {
        CurrentUserService.getUser();
        $state.go("users");
      }
    });
  };
}