const Article = require('../models/article.model');

module.exports = function(req, res, next) {
  let articleId = parseInt(req.params['id'], 10);
  let authorId = req.user.id;

  Article.checkAuthor(authorId, articleId)
    .then(isTheAuthor => {
      if(!isTheAuthor) {
        req.flash('error', [`You are not the author of article: ${articleId}`]);
        return res.redirect('/dashboard');
      }
      Article.delete(articleId)
        .then(deleted => {
          req.flash('info', [`Article id: ${articleId} deleted`]);
          return res.redirect('/dashboard');
        })
        .catch(err => {
          req.flash('error', [err]);
          return res.redirect('/dashboard');
        });
    })
    .catch(err => {
      req.flash('error', [err]);
      return res.redirect('/dashboard');
    });
}