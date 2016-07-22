angular
  .module('Tourista')
  .factory("User", userFactory);

userFactory.$inject =["$resource"];
function userFactory($resource){
  return $resource("/api/users/:id", {}, {
    'register': {
      url: "/api/register",
      method: "POST"
    },
    'login': {
      url: "/api/login",
      method: "POST"
    }
  });
}