const Article = require('../models/article.model');

module.exports = function(req, res, next) {
  let id = req.params['id'];
  if(id && !isNaN(id)) {
    Article.findById(id)
      .then(article => {
        if(Boolean(article)) {
          return res.render('edit', { article });
        }
        req.flash('error', [`Article, id : ${id} not found`]);
        return res.redirect('/dashboard');
      })
      .catch(err => {
        req.flash('error', [err]);
        return res.render('edit', {article: {}})
      })
  } else {
    res.render('edit', {article: {}});
  }
}