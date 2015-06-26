var express        = require('express'),
    app            = express(),
    ejs            = require('ejs'),
    expressLayouts = require('express-ejs-layouts')
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    MongoClient    = require('mongodb').MongoClient,
    ObjectId       = require('mongodb').ObjectId,
    url            = 'mongodb://localhost:27017/wiki',
    mongoose       = require('mongoose'),
    Schema         = mongoose.Schema;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(url);
var db = mongoose.connection;

db.once('open', function () {
  app.listen(3000, function () {
    console.log('Listening on port 3000');
  });
});
