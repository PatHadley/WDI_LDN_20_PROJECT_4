// Require packages
var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

require('./config/passport')(passport);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/bower_components"));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: config.secret })
  .unless({
    path: [
      { url: '/api/login',    methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] },
      { url: '/api/users',    methods: ['GET'] },
      { url: '/api/uImages',  methods: ['GET'] },
      { url: '/api/uImages',  methods: ['POST'] },
      { url: '/api/rImages',  methods: ['GET'] },
      { url: '/api/rImages',  methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  return next();
});

var routes = require('./config/routes');
app.use("/api", routes);

app.get("/api/users", function(req, res, next){
  User.find({}).then(function(users){
    return res.status(200).json({ users: users});
  }).catch(console.log);
});

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen(){
  return app.listen(config.port, startup);
}

function connect(){
  return mongoose.connect(config.database).connection;
}

function startup(){
  console.log("We're listening!");
}

