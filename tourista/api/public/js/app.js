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
  .config(MainRouter)
  .config(function (filepickerProvider) {
    filepickerProvider.setKey('Aaf507RcMRMid6D1ej8D1z');
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html",
      controller: 'loginCtrl',
      controllerAs: 'log'
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html",
      controller: 'registerCtrl',
      controllerAs: 'reg'
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html",
      controller: 'UsersController',
      controllerAs: 'users'
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: 'UsersController',
      controllerAs: 'users'
    })
    .state('exhibit', {
      url: "/exhibits/:id",
      templateUrl: "./js/views/exhibits/show.html",
      controller: 'GalleryCtrl'
    });

  $urlRouterProvider.otherwise("/");
};
