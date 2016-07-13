angular
  .module('Tourista')
  .controller('GalleryCtrl', GalleryCtrl)
  .directive('fpGalbuilder', fpGalbuilder);

GalleryCtrl.$inject = ['$scope', 'filepickerService', '$window'];

function GalleryCtrl($scope, filepickerService, $window) {
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
};

function fpGalbuilder(filepickerService){
  return {
    scope: {
      options: '=',
      onSuccess:'&',
      onError:'&',
    },
    template: '<button class="fp__btn" ng-click="openPicker()">Pick</button>',
    link: function(scope, elm, attrs) {
      scope.openPicker = openPicker;
      function openPicker(){
        filepickerService.pick(
          scope.options,
          function(Blob){
              scope.onSuccess({Blob: Blob});
              console.log("blob", Blob.url);
          },
          function(Error){
              scope.onError({Error: Error});
          }
        );
      }
    }
  };
}