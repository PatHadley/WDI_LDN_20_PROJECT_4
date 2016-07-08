angular.module('ZoomBoard', [
  'ngResource',
  'angular-filepicker',
  'ngMaterial',
  'ngMessages',
  'ui.router',
  'angular-jwt'
  ])
  .factory('User', function($resource){
    var User = $resource('http://localhost:3000/users/:id', {id: '@_id'}, {
      'update': {method: 'PUT'}
    });
    return User;
  })
  .factory('Img', function($resource){
    var Img = $resource('http://localhost:3000/imgs/:id', {id: '@_id'}, {
      'update': {method: 'PUT'}
    });
    return Img;
  })
  .factory('Tag', function($resource){
    var Tag = $resource('http://localhost:3000/tags/:id', {id: '@_id'}, {
      'update': {method: 'PUT'}
    });
    return Tag;
  })
  .factory('Rijk', function($resource){
    var Rijk = $resource('https://www.rijksmuseum.nl/api/en/collection/?key=w5b8sjYU&format=json&imgonly=true&p=2000&ps=200');
    return Rijk
  })
  .config(function(filepickerProvider){
    filepickerProvider.setKey('Aaf507RcMRMid6D1ej8D1z');
  })
  .config(MainRouter)
  .directive('zoomTarget', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'zoomTarget',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
            $(element).toolbar(scope.$eval(attrs.zoomTarget));
        }
    };
});

 MainRouter.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];

 function MainRouter($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
     .state('home',{
       url: '/',
       templateUrl: '../partials/home.html'
     })
     .state('register',{
      url: '/register',
      templateUrl: '../partials/register.html',
      controller: "registerController",
      controllerAs: "register"
     })
     .state('login',{
      url: '/login',
      templateUrl: '../partials/login.html',
      controller: "loginController",
      controllerAs: "login"
     });
   $urlRouterProvider.otherwise('/');
 };
