const express = require('express');
const router = express.Router();
const { registerArticle } = require('./controllers')
const connection = require('../dao/connection')

/* GET all articles. */
router.get('/', async (req, res, next) => {
  const { Article } = await connection()
  res.status(200).send(Article.findAll());
});

/**
 * @api {get} /articles/:uuid Request Article information
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
  res.status(200).send(Article.findOne({
    where: {
      uuid
    }
  }));
});

/* POST articles listing. */
router.post('/', (req, res, next) => {
  const article = req.body
  registerArticle(article).then(article => {
    res.status(200).send(article);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

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