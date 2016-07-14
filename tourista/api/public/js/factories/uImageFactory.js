angular
  .module('Tourista')
  .factory("UImage", uImageFactory);

userFactory.$inject =["$resource"];
function uImageFactory($resource){
  var UImage = $resource('http://localhost:3000/api/uImages/:id', {id: '@_id'},{
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray: true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}

  });
  return UImage;
}
