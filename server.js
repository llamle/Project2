var express        = require('express'),
    server         = express(),
    ejs            = require('ejs'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    session        = require('express-session')
    morgan         = require('morgan'),
    mongoose       = require('mongoose');

// This sets the port to the process port or sets it to 3000
var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://heroku_cc9vv0nm:7luf1is59g9lhp22pcnuni51cv@ds047612.mongolab.com:47612/heroku_cc9vv0nm';

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
  secret: 'Leon Lamle',
  resave: false,
  saveUninitialized: false
}));

server.use(morgan('short'));
server.use(express.static("./public"));

server.use(expressLayouts);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

var Article = require('./models/article.js').Article;
var Section = require('./models/article.js').Section;

server.use(function (req, res, next) {
  Article.find({}, function (err, articlesArray) {
    if (err) {
      console.log(err);
    } else {
      res.locals.articles = articlesArray;
      next();
    };
  });
});

var articlesController = require('./controllers/articles.js');
server.use('/articles', articlesController);

server.get('/', function (req, res) {
  res.render('index');
});

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function () {
  console.log("Database UP AND RUNNING!");
  server.listen(PORT, function () {
    console.log("Server UP AND RUNNING!");
  });
});
