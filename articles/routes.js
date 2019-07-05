const express = require('express');
const router = express.Router();
const { registerArticle }  = require('./controllers')

/* POST articles listing. */
router.post('/registerArticle', (req, res, next) => {
    const article = req.body
    registerArticle(article).then(article => {
      res.status(200).send(article);
    }, e => {
      res.status(500).send(e);
    })
  });

  /* GET all articles. */
router.get('/getArticles', async (req, res, next) => {
    const { Article } = await connection()
    console.log(Article)
    res.status(200).send(Article.findAll());
  });
   /* GET articles by title */
   router.get('/getArticlebyTitle:title', async (req, res, next) => {
    const { Article } = await connection()
    const title = req.params.title
    res.status(200).send(Article.findOne({
      where: {
        title
      }
    }));
  });
  
  /* GET one article. */
  router.get('/getArticlebyUuid:uuid', async (req, res, next) => {
    const { Article } = await connection()
    const uuid = req.params.uuid
    res.status(200).send(Article.findOne({
      where: {
        uuid
      }
    }));
  });
  module.exports = router;