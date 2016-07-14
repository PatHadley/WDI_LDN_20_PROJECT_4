angular
  .module('Tourista')
  .factory("RImage", rImageFactory);

rImageFactory.$inject =["$resource"];
function rImageFactory($resource){
  var RImage = $resource('http://localhost:3000/api/rImages/:id', {id: '@_id'},{
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray: true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}

  });
  return RImage;
}
