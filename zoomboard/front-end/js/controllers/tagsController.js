angular.module('ZoomBoard')
  .controller('TagsController', TagsController);

TagsController.$inject = ['$resource', 'Tag'];

function TagsController($resource, Tag){
  var self = this
  this.tags = [];

  this.getTags = function(){
    this.tags = Tag.query();
  };

  this.showTag = function(tag){

  };

  this.updateTag = function(){
  };

  this.addTag = function(){
    Tag.save({tag: self.newTag}, function(tag){
      self.tags.push({tag: self.newTag});
      self.getTags()
    });
  };

  this.deleteTag = function(tag){
    Tag.delete({id: tag._id}, function(){
      self.getTags();
    });
  };

  this.getTags();
};

