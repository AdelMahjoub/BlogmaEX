const validator = require('validator');

/**
 * Blueprint for the Article model
 */
class ArticleSchema {
  constructor(props) {
    this.id       = props['id'] || null;
    this.title    = props['title'] ? validator.escape(props['title']) : null;
    this.authorId = props['authorId'] ? props['authorId'] : null;
    this.content  = props['content'] ? validator.escape(props['content']) : null;
    this.postDate = props['postDate'] || null;
  }

  /**
   * If an Article object has valid properties return an empty array
   * else return an array of errors
   */
  validationResults() {
    let validationErrors = [];
    if(!this.titleRequired()) {
      validationErrors.push('The article title is required');
    }
    if(!this.contentRequired()) {
      validationErrors.push('The content of the article should not be empty');
    }
    if(!this.authorIdRequired()) {
      validationErrors.push('Unknownn author');
    }
    return validationErrors;
  }

  /**
   * the Article title is required
   */
  titleRequired() {
    return Boolean(this.title);
  }

  /**
   * the content is required
   */
  contentRequired() {
    return Boolean(this.content);
  }

  /**
   * the author is required
   */
  authorIdRequired() {
    return Boolean(this.authorId);
  }
}

module.exports = ArticleSchema;