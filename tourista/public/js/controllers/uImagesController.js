angular
  .module('Tourista')
  .controller('uImagesController', uImagesController);

uImagesController.$inject = ['$resource', 'filepickerService', 'UImage'];

function uImagesController($resource, filepickerService, UImage){
  
  var self = this;

  this.getUImages = function(){
    self.uImages = UImage.query();
  };


  this.fpAddUImage = function(){
    console.log("Running");
    filepicker.pick(
      {mimetype: 'image/*',
      services: [
        'BOX',      'COMPUTER',     'DROPBOX',
        'FACEBOOK', 'GMAIL',        'IMAGE_SEARCH',
        'FLICKR',   'GOOGLE_DRIVE', 'SKYDRIVE',
        'PICASA',   'URL',          'INSTAGRAM'
      ]},
        function(Blob){
          var newImage = {
            title: "Your lovely image",
            source: Blob.url,
            description: "What a pretty image!"
            };

          UImage.save(newImage, function(newImage){
            self.uImages.push(newImage);
          });
        },
        function(FPError){
          console.log(FPError.toString());
        }
      );
  }

  this.getUImages();
}


//   filepicker.pick(
//    {
//       mimetype: 'image/*',
//       container: 'window',
//       services: ['COMPUTER', 'FACEBOOK', 'CLOUDAPP']
//     },
//     function(Blob){
//       console.log(replaceHtmlChars(JSON.stringify(Blob)));
//     },
//     function(FPError){
//   //  console.log(FPError.toString()); - print errors to console
//     }
//   );

//   function openPicker(){
//     console.log("Running");
//     filepickerService.pick(
//       scope.options,
//       function(Blob){
//         scope.onSuccess({Blob: Blob});
//           var newImage = {
//             title: "Hey",
//             source: Blob.url,
//             description: "blah blah blah"
//           };

//           console.log(newImage);
//           $http
//             .post('http://localhost:3000/api/uImages', { uImage: newImage })
//             .then(function(response){
//               self.uImages.push(response.newImage);
//               newImage = "";
//             });
//       },
//       function(Error){
//           scope.onError({Error: Error});
//       }
//     );
//   }
// }