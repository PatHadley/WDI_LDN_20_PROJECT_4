angular
  .module('Tourista')
  .controller("rijksController", rijksController);

rijksController.$inject = ['$http', 'RImage', '$mdPanel'];
function rijksController($http, RImage, $mdPanel){
  var self = this;
  this._mdPanel = $mdPanel;
  // this._mdPanelRef = mdPanelRef;
  self.query = "";
  self.rijksResults = [];

  rijksController.prototype.showPanel  = function() {
    var position = this._mdPanel.newPanelPosition()
        .absolute()
        .center();
    var config = {
      attachTo: angular.element(document.body),
      controller: rijksController,
      controllerAs: 'rijks',
      disableParentScroll: this.disableParentScroll,
      templateUrl: './js/views/rijksearch.tmpl.html',
      hasBackdrop: true,
      panelClass: 'demo-dialog-example',
      position: position,
      trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    };
    this._mdPanel.open(config);
  };

  // rijksController.prototype.closeDialog = function() {
  //   this._mdPanelRef && this._mdPanelRef.close().then(function() {
  //     angular.element(document.querySelector('.demo-dialog-open-button')).focus();
  //   });
  // };


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
