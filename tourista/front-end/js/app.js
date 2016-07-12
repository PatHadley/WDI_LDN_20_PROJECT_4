angular
  .module('Tourista', [
    'angular-jwt',
    'ngResource',
    'ui.router',
    'angular-filepicker',
    'ngMaterial',
    'ngMessages'
    ])
  .constant('API', 'http://localhost:3000/api')
  .directive('fpCustomDirective', function(filepickerService){
      return {
          scope: {
              options: {mimetype: "image/*"},
              onSuccess:'&',
              onError:'&',
          },
          link: function(scope, elm, attrs) {
              scope.openPicker = openPicker;
              scope.options = scope.options || {};
              function openPicker(){
                  filepickerService.pick(
                      scope.options,
                      function(Blob){
                          scope.onSuccess({Blob: Blob});
                      },
                      function(Error){
                          scope.onError({Error: Error});
                      }
                  );
              }
          }
      };
  })
  .config(MainRouter)
  .config(function (filepickerProvider) {
    filepickerProvider.setKey('Aaf507RcMRMid6D1ej8D1z');
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];

function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html",
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html",
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
};
