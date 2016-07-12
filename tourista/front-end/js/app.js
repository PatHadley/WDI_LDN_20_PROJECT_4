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
  .controller('GalleryCtrl', function ($scope, filepickerService, $window) {
    $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');

    $scope.options = {
      mimetype: 'image/*',
      services: [
        'BOX',
        'COMPUTER',
        'DROPBOX',
        'FACEBOOK',
        'GMAIL',
        'IMAGE_SEARCH',
        'FLICKR',
        'GOOGLE_DRIVE',
        'SKYDRIVE',
        'PICASA',
        'URL',
        'INSTAGRAM'
      ]};
    $scope.onSuccess = onSuccess;

    function onSuccess(Blob){
      $scope.files.push(Blob);
      $window.localStorage.setItem('files', JSON.stringify($scope.files));
      $scope.$apply();
    }
  })
  .directive('fpCustomDirective', function(filepickerService){
    return {
      scope: {
        options: '=',
        onSuccess:'&',
        onError:'&',
      },
      template: '<button class="fp__btn" ng-click="openPicker()">Pick</button>',
      link: function(scope, elm, attrs) {
        scope.openPicker = openPicker;
        // scope.options = {};
        function openPicker(){
          filepickerService.pick(
            scope.options,
            function(Blob){
                scope.onSuccess({Blob: Blob});
                console.log("blob", Blob);
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
      templateUrl: "./js/views/home.html",
      controller: 'GalleryCtrl'
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

