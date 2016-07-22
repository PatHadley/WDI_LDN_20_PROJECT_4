angular.module('Tourista')
  .service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["$rootScope", "TokenService"];

function CurrentUser($rootScope, TokenService){
  var currentUser = TokenService.decodeToken();
  if (currentUser) {
    currentUser = currentUser._doc;
  }
  return {
    saveUser: function(user){
      currentUser = user;
      $rootScope.$broadcast("loggedIn");
    },
    getUser: function(){
      return currentUser;
    },
    clearUser: function(){
      currentUser = null;
      $rootScope.$broadcast("loggedOut");
      TokenService.clearToken();
    }
  };
}