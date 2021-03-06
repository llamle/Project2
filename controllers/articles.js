var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js').Article;
    Section = require('../models/article.js').Section;

// prefetch articles middleware

router.use(function (req, res, next) {
  console.log(res.locals);
  next();
})

// INDEX
router.get('/', function (req, res) {
  res.render('index.ejs', { currentUser : req.session.currentUser });
});

// NEW
router.get('/new', function (req, res) {
  res.render('articles/new', { currentUser : req.session.currentUser });
});

// CREATE
router.post('/', function (req, res) {
  console.log(req.body.author);
  req.body.author = req.session.currentUser;

  var newArticle = new Article(req.body.article);
  newArticle.save(function (err, article) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles/' + article._id);
    };
  });
});

// SHOW
router.get('/:id', function (req, res) {
  Article.findById(req.params.id, function(err, article) {
      if (err) {
      console.log(err);
    } else {
      res.render('articles/show', {article : article});
    };
  });
});

// DELETE Content request to "/articles/section/:id"
router.delete('/:id/section/:sectionId', function (req, res) {
  console.log(req.params);

  Article.findById(req.params.id, function (err, article) {
    if (err) {
      console.log(err);
    } else {
      article.content.remove(req.params.sectionId);

      article.save(function (err, article) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: "Section has been removed!"
          });
        };
      });
    };
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  Article.remove({_id : req.params.id}, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/welcome');
    };
  });
});
// EDIT
router.get('/:id/edit', function (req, res) {
  if(req.session.currentUser) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
          console.log(err);
        } else {
          article.user = req.session.currentUser;
          res.render('articles/edit', {article : article});
      };
    });
  } else {
    res.redirect(301, '/welcome');
  };
});

// UPDATE
router.patch('/:id', function (req, res) {
  Article.update({_id : req.params.id}, req.body.article, function(err, result){
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles/'+ req.params.id);
    };
  });
});

// 404
router.get('/*', function (req, res) {
  res.render('articles/404', { path : req.path });
});

module.exports = router;
