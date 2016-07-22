angular
  .module('Tourista')
  .controller('rImagesController', rImagesController);

rImagesController.$inject = ['$resource', 'RImage'];

function rImagesController($resource, RImage){

  var self = this;

  this.getRImages = function(){
    self.rImages = RImage.query();
  };

  this.addRImage = function(){
    console.log('adding your arties');
    var
  }


  this.getRImages
}