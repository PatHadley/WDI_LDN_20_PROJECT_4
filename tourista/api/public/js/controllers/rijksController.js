angular
  .module('Tourista')
  .controller("rijksController", rijksController);

rijksController.$inject = ['$http'];
function rijksController($http){
  var self = this;
  self.query = "";
  self.rijksResults = [];

  self.search = function(query){
    $http
      .jsonp("https://www.rijksmuseum.nl/api/en/collection?q=" + self.query + "&key=w5b8sjYU&callback=JSON_CALLBACK")
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
}
