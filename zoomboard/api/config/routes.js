var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var imgsController = require('../controllers/imgsController');
var tagsController = require('../controllers/tagsController');
var authenticationsController = require('../controllers/authenticationsController');

// var jwt = require('jsonwebtoken');
// var secret = require('./tokens').secret;

// function checkForToken(req, res, next){

//   if(!req.headers.authorisation) return res.status(401).json({ message: 'Unathorized' });

//   var token = req.headers.authorisation.replace('Bearer ', '');
  
//   jwt.verify(token, secret, function(err,user) {
//     if(!user) return res.status(401).json({message: 'Invalid token'});

//     req.user = user;
//     next();
//   });
// }

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/imgs')
  .get(imgsController.imgsIndex)
  .post(imgsController.imgsCreate)

router.route('/imgs/:id') 
  .get(imgsController.imgsShow)
  .patch(imgsController.imgsUpdate)
  .delete(imgsController.imgsDelete)

router.route('/tags')
  .get(tagsController.tagsIndex)
  .post(tagsController.tagsCreate)

router.route('/tags/:id') 
  .get(tagsController.tagsShow)
  .patch(tagsController.tagsUpdate)
  .delete(tagsController.tagsDelete)

module.exports = router;