const express = require('express');
const router = express.Router();
const { registerArticle } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}
/* GET all articles. */
/**
 * @api {GET} /articles Get list of articles
 * @apiName GetArticles
 * @apiDescription Get list of articles that match query or pagination parameters
 * @apiGroup Article
 * @apiVersion 1.0.0
 * @apiExample {js} Example usage:
 *     GET http://localhost/articles // return all articles
 *     GET http://localhost/articles?uuid=Researcher // return the article with uuid equals to 'Researcher' *
 *     GET http://localhost/articles?offset=0&limit=10 // return a paginated list
 * @apiParam {String} uuid Research uuid.
 * @apiParam {String} title Reseracher's title separated by comma.
 * @apiParam {String} description Description of the article.
 * @apiParam {String} type Corresponds to the type of article.
 * @apiParam {String} year Year of publication.
 * @apiParam {JSON} extra Data additional information about the article.
 * @apiParam {Number} offset Pagination's offset.
 * @apiParam {Number} limit Pagination's limit.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 10,
 *       "rows": [
 *          ...
 *        ]
 *     }
 *
 * @apiError InternalServerError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalServerError"
 *     }
 * */
router.get('/', async (req, res, next) => {
  const { Article } = await connection()
  res.status(200).send(Article.findAll());
});

/**
 * @api {GET} /articles/:uuid Request Article information
 * @apiName GetArticle
 * @apiGroup Article
 *
 * @apiParam {String} uuid Articles unique ID.
 *
 * @apiSuccess {String} uuid Identifier of the Article.
 * @apiSuccess {String} title  Title of the Article.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "uuid": "xxxx-xxxx-xxxx-xxxx",
 *       "title": "Image procesing with Computer Vision"
 *     }
 *
 * @apiError ArticleNotFound The id of the Article was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ArticleNotFound"
 *     }
 */
router.get('/:uuid', async (req, res, next) => {
  const { Article } = await connection()
  const uuid = req.params.uuid
  Article.findOne({ where: { uuid } }).then(article => {
    if (!article)
      res.status(404).send(ERROR_404)
    else
      res.status(200).send(article)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});
module.exports = router;
/**
 * @api {POST} /articles/ Create new Article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} title Reseracher's title separated by comma.
 * @apiParam {String} description Description of the article.
 * @apiParam {String} type Corresponds to the type of article.
 * @apiParam {String} year Year of publication.
 * @apiParam {JSON} extra Data additional information about the article.
 *
 * @apiSuccess {String} uuid Identifier of the Article.
 * @apiSuccess {String} title Research's title(s).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "uuid": "xxxx-xxxx-xxxx-xxxx",
 *       "title": "...",
 *        ...
 *     }
 *
 * @apiError InternalServerError Resource cannot be created
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalServerError"
 *     }
 */
router.post('/', (req, res, next) => {
  const article = req.body
  registerArticle(article).then(article => {
    res.status(200).send(article);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;

/* PUT articles listing. */
router.put('/', (req, res, next) => {
  const article = req.body
  registerArticle(article).then(article => {
    res.status(200).send(article);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;