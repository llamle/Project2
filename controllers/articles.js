var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js').Article;
    Section = require('../models/article.js').Section;

// prefetch articles middleware

router.use(function (req, res, next) {
  Article.find({}, function (err, articlesArray) {
    if (err) {
      console.log(err);
    } else {
      res.locals.articles = articlesArray;
      next();
    };
  });
});

// INDEX
router.get('/articles', function (req, res) {
  res.render('index.ejs');
});

// NEW
router.get('/new', function (req, res) {
  res.render('articles/new');
});

// CREATE
router.post('/', function (req, res) {
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
      res.redirect(301, '/articles');
    };
  });
});
// EDIT
router.get('/:id/edit', function (req, res) {
  Article.findById(req.params.id, function(err, article){
    if (err) {
      console.log(err);
    } else {
      res.render('articles/edit', {article : article});
    };
  });
});

// UPDATE
router.patch('/:id', function (req, res) {
  Article.update({_id : req.params.id}, req.body.article, function(err, result){
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/article/'+ req.params.id);
    };
  });
});

// 404
router.get('/*', function (req, res) {
  res.render('articles/404', { path : req.path });
});

module.exports = router;
