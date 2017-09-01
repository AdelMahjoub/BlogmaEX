const Article = require('../models/article.model');

module.exports = function(req, res, next) {
  let article = new Article({
    id: req.body['id'],
    title: req.body['title'],
    content: req.body['content'],
    authorId: req.user['id']
  });

  let validationErrors = article.validationResults();

  if(validationErrors.length > 0) {
    req.flash('error', [... validationErrors]);
    return res.redirect('/edit/' + (Boolean(parseInt(article['id'], 10)) ? article['id'] : ''));
  }

  if(article['id'] && !isNaN(article['id'])) {
    Article.checkAuthor(article.authorId, article.id)
      .then(isTheAuthor => {
        if(!isTheAuthor) {
          req.flash('error', [`You are not the author article: ${article['id']}`]);
          return res.redirect('/dashboard');
        }
        Article.update(article)
          .then(updated => {
            req.flash('info', [`Article ${article.id} updated !`]);
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
  } else {
    Article.insert(article)
      .then(inserted => {
        req.flash('info', [`New article added, id: ${inserted['insertId']}`]);
        return res.redirect('/dashboard');
      })
      .catch(err => {
        req.flash('error', [err]);
        return res.redirect('/dashboard');
      });
  }
}