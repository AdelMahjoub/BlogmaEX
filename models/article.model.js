const mysql = require('mysql');

// Database connection instance
const connectionPool = require('../services/connectionPool.service');

// Article Schema
const ArticleSchema = require('../class/Article');

/**
 * Article odel
 */
class Article extends ArticleSchema {
  constructor(props) {
    super(props);
  }

  /**
   * Return all articles
   */
  static find() {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * FROM Articles ORDER BY postDate DESC`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Find an article by id
   * @param {number} id 
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * FROM Articles WHERE id=${connection.escape(id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          if(results.length === 0) {
            reject('Article not found');
          }
          resolve(results[0]);
        });
        connection.release();
      });
    });
  }

  /**
   * Find all user's articles
   * @param {number} authorId 
   */
  static findByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * FROM Articles 
        WHERE authorId=${connection.escape(authorId)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Insert a new Article
   * @param {Article} article 
   */
  static insert(article) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `INSERT INTO Articles (title, authorId, content)
        VALUES(
          ${connection.escape(article.title)},
          '${article.authorId}',
          ${connection.escape(article.content)}
        )`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Delete an article
   * @param {number} id 
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `DELETE FROM Articles WHERE id=${connection.escape(id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Check if a user is the author of the article
   * @param {number} authorId 
   * @param {number} articleId
   */
  static checkAuthor(authorId, articleId) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * FROM Articles WHERE id=${connection.escape(articleId)} AND authorId=${connection.escape(authorId)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          if(results.length === 0) {
            reject(`You are not the author of this article id: ${articleId}`);
          }
          resolve(true);
        });
        connection.release();
      });
    });
  }

  /**
   * Update an article
   * @param {Article} article 
   */
  static update(article) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `Update Articles SET 
          title=${connection.escape(article.title)},
          content=${connection.escape(article.content)}
          WHERE id=${connection.escape(article.id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }
}

module.exports = Article;