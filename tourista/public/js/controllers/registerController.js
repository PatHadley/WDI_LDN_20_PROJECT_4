angular
  .module('Tourista')
  .controller("registerCtrl", registerCtrl);

registerCtrl.$inject = ["User", "$state", 'CurrentUser'];
function registerCtrl(User, $state, CurrentUser){
  var vm = this;
  vm.register = function(){
    console.log(vm.user)  
    User.register(vm.user, function(data){
      var user = data.user ? data.user : null;
      if (user) {
        CurrentUser.getUser();
        $state.go("home");
      }
    });
  };
}