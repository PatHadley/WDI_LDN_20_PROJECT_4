angular
  .module('Tourista')
  .controller("rijksController", rijksController);

rijksController.$inject = ['$http', 'RImage'];
function rijksController($http, RImage){
  var self = this;
  self.query = "";
  self.rijksResults = [];

  self.search = function(query){
    $http
      .jsonp("https://www.rijksmuseum.nl/api/en/collection?q=" + self.query + "&key=w5b8sjYU&imgonly=true&callback=JSON_CALLBACK")
      .success(function(data) {
        self.query = null;
        self.rijksResults = data.artObjects;
        console.log(self.rijksResults);
        return self.rijksResults;
      })
      .error(function(){
        console.log(self.query);
        console.log("It done stuffed up");
      })
  }

  var self = this;

  this.getRImages = function(){
    self.rImages = RImage.query();
  };

  this.addRImage = function(rires){
    console.log('adding your arties');
    var newArtwork = {
      title: rires.title,
      artist: rires.principalOrFirstMaker,
      source: rires.webImage.url,
    };
    RImage.save(newArtwork, function(newArtwork){
      self.rImages.push(newArtwork);
      newArtwork = "";
      self.getRImages();
    });
  }


  this.getRImages();
}
