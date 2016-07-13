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

fpGalbuilder.$inject = ['filepickerService', '$http'];

function fpGalbuilder(filepickerService, $http){
  var self = this;

  self.uImages = [];

  // self.addUImage = addUImage;
  // self.removeUImage = removeUImage;



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
              $http
                .post('http://localhost:3000/api/uImages', Blob)
                .then(function(response){
                  self.uImages.source.push(response.Blob.url);
                  self.uImages.title.push("testImage");
                })

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