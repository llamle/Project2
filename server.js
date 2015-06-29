var express        = require('express'),
    server         = express(),
    ejs            = require('ejs'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan         = require('morgan'),
    mongoose       = require('mongoose');

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(morgan('short'));
server.use(express.static("./public"));

server.use(expressLayouts);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

var articlesController = require('./controllers/articles.js');
server.use('/articles', articlesController);

server.get('/', function (req, res) {
  res.render('index');
});

mongoose.connect('mongodb://localhost:27017/blogger');
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function () {
  console.log("Database UP AND RUNNING!");
  server.listen(3000, function () {
    console.log("Server UP AND RUNNING!");
  });
});
