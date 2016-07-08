angular.module('ZoomBoard')
  .controller('ImgsController', ImgsController);

ImgsController.$inject = ['$resource', 'Img'];

function ImgsController($resource, Img){
  var self = this
  this.imgs = [];

  this.getImgs = function(){
    this.imgs = Img.query();
  };

  this.showImg = function(img){

  };

  this.updateImg = function(){
  };

  this.addImg = function(){
    Img.save({img: self.newImg}, function(img){
      self.imgs.push({img: self.newImg});
      self.getImgs()
    });
  };

  this.deleteImg = function(img){
    Img.delete({id: img._id}, function(){
      self.getImgs();
    });
  };

  this.getImgs();
};

