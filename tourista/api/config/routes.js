var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var exhibitsController = require('../controllers/exhibitsController');
var uImagesController = require('../controllers/uImagesController');
var rImagesController = require('../controllers/rImagesContoller');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);

router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/exhibits')
  .get(exhibitsController.exhibitsIndex)
  .post(exhibitsController.exhibitsCreate);

router.route('/exhibits/:id')
  .get(exhibitsController.exhibitsShow)
  .put(exhibitsController.exhibitsUpdate)
  .delete(exhibitsController.exhibitsDelete);

router.route('/uImages')
  .get(uImagesController.uImagesIndex)
  .post(uImagesController.uImagesCreate);

router.route('/uImages/:id')
  .get(uImagesController.uImagesShow)
  .put(uImagesController.uImagesUpdate)
  .delete(uImagesController.uImagesDelete);

router.route('/rImages')
  .get(rImagesController.rImagesIndex)
  .post(rImagesController.rImagesCreate);

router.route('/rImages/:id')
  .get(rImagesController.rImagesShow)
  .put(rImagesController.rImagesUpdate)
  .delete(rImagesController.rImagesDelete);

module.exports = router;
