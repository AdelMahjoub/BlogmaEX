const Article = require('../models/article.model');

module.exports = function(req, res, next) {
  Article.findByAuthorId(req.user.id)
    .then(articles => {
      return res.render('dashboard', { articles });
    })
    .catch(err => {
      req.flash('error', ['Unexpected error while finding articles, please try again']);
      return res.render('dashboard', { articles: [] })
    });
}