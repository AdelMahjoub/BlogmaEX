const express = require('express');

const AuthGuard = require('../class/AuthGuard');

const deleteArticleController      = require('../controllers/deleteArticle.controller');
const editArticleController        = require('../controllers/editArticle.controller');
const addOrUpdateArticleController = require('../controllers/addOrUpdateArticle.controller');
const dashboardController          = require('../controllers/dashboard.controller');

const router = express.Router();

router.route('/dashboard')
  .get(
    AuthGuard.loginRequired, 
    AuthGuard.adminRequired, 
    dashboardController);

router.route('/edit/:id?')
  .get(
    AuthGuard.loginRequired, 
    AuthGuard.adminRequired,
    editArticleController)
  .post(
    AuthGuard.loginRequired, 
    AuthGuard.adminRequired, 
    addOrUpdateArticleController);

router.route('/delete/:id')
  .get(
    AuthGuard.loginRequired, 
    AuthGuard.adminRequired,
    deleteArticleController);

module.exports = router;