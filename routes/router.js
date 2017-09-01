const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Article = require('../models/article.model');

const authRoutes = require('./authentication');
const articlesManagementRoutes = require('./articles-management');

router.use(bodyParser.urlencoded({extended: false}));

router.route('/')
  .get((req, res, next) => {
    Article.find()
      .then(articles => {
        return res.render('index', { articles });
      })
      .catch(err => {
        console.log(err);
        req.flash('error', ['Can\'t find articles, please refersh the page.']);
        return res.redirect('/');
      })
  });

router.use(authRoutes);
router.use(articlesManagementRoutes);

router.route('/articles/:id')
  .get((req, res, next) => {
    let articleId = parseInt(req.params['id'], 10);
    if(!isNaN(articleId)) {
      Article.findById(articleId)
        .then(article => {
          return res.render('article', { article });
        })
        .catch(err => {
          req.flash('error', [err]);
          return res.redirect('/');
        });
    } else {
      return res.redirect('/');
    }
  });

router.use('*', (req, res, next) => {
  res.render('not-found');
});

router.use((err, req, res, next) => {
  console.log(err);
  res.redirect('/');
});

module.exports = router;