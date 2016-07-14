angular
  .module('Tourista')
  .controller('rImagesController', rImagesController);

rImagesController.$inject = ['$resource'];

function rImagesController($resource){
  var RImage = $resource('http://localhost:3000/api/rImages/:id', {id: '@_id'});

  var self = this;

  self.rImages = RImage.query();
}