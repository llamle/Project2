var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

router.get('/new', function(req, res){
  res.render('users/new');
});

router.post('/', function(req, res){
  var newUser = User(req.body.user);

  newUser.save(function(err, user){
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/users/login');
    }
  });
});

router.get('/login', function(req, res){
  res.render('users/login');
});

router.post('/login', function(req, res){
  User.findOne({ username : req.body.user.username }, function(err, user){
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      user.comparePassword(req.body.user.password, function(err, match) {
        if (err) {
          console.log(err);
        } else {
          if (match) {
            req.session.currentUser = user.username;
            res.redirect(301, '/articles');
          } else {
            res.redirect(301, '/users/login');
          }
        }
      });
    };
  });
});

module.exports = router;
