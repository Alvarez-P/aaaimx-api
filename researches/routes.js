const express = require('express');
const router = express.Router();
const { createOrUpdate, getResearches, getResearch } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}
/* GET all researches. */
/**
 * @api {GET} /researches Get list of researches
 * @apiName GetResearches
 * @apiDescription Get list of researches that match query or pagination parameters
 * @apiGroup Research
 * @apiVersion 1.0.0
 * @apiExample {js} Example usage:
 *     GET http://localhost/researches // return all researches
 *     GET http://localhost/researches?uuid=Research // return the Research with uuid equals to 'Researcher' *
 *     GET http://localhost/researches?offset=0&limit=10 // return a paginated list
 * @apiParam {String} uuid Research uuid.
 * @apiParam {String} title Reseracher's title separated by comma.
 * @apiParam {String} description Description of the Research.
 * @apiParam {String} type Corresponds to the type of Research.
 * @apiParam {String} year Year of publication.
 * @apiParam {JSON} extra Data additional information about the Research.
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
  const { Research } = await connection()
  console.log(req.query)
  const offset = parseInt(req.query.offset, 10); // 
  const limit = parseInt(req.query.limit, 10);
  if ((offset && limit) || (offset == 0 && limit)) {
    cond = {
      where: {},
      offset,
      limit
    }
  } else {
    cond = {
      where: req.query
    }
  }
  if (req.query.datatable) {
    cond = {
      where: req.query.query
    }
    if (req.query.query.generalSearch || req.query.query.generalSearch === '') {
      cond = {}
    }
  }
  Research.findAndCountAll(cond).then(async (researches) => {
    const colls = await getResearches(researches.rows)
    res.status(200).send({
      count: researches.count,
      rows: colls
    });
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});
module.exports = router

/**
 * @api {GET} /researches/:uuid Request Research information
 * @apiName GetResearch
 * @apiGroup Research
 *
 * @apiParam {String} uuid researches unique ID.
 *
 * @apiSuccess {String} uuid Identifier of the Research.
 * @apiSuccess {String} title  Title of the Research.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "uuid": "xxxx-xxxx-xxxx-xxxx",
 *       "title": "Image procesing with Computer Vision"
 *     }
 *
 * @apiError ResearchNotFound The id of the Research was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ResearchNotFound"
 *     }
 */
router.get('/:uuid', async (req, res, next) => {
  const { Research } = await connection()
  const uuid = req.params.uuid
  Research.findOne({ where: { uuid } }).then(async (research) => {
    const coll = await getResearch(research)
    res.status(200).send(coll);
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});
module.exports = router;

/**
 * @api {POST} /researches/ Create new Research
 * @apiName CreateResearch
 * @apiGroup Research
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} title Researcher's title separated by comma.
 * @apiParam {String} description Description of the Research.
 * @apiParam {String} type Corresponds to the type of Research.
 * @apiParam {String} year Year of publication.
 * @apiParam {JSON} extra Data additional information about the Research.
 *
 * @apiSuccess {String} uuid Identifier of the Research.
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
  const research = req.body
  console.log(req.headers)
  createOrUpdate(research).then(research => {
    res.status(200).send(research);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;

/* PUT researches listing. */
router.put('/', (req, res, next) => {
  const research = req.body
  createOrUpdate(research).then(research => {
    res.status(200).send(research);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;

router.delete('/:uuid', async (req, res, next) => {
  const { Research } = await connection()
  const uuid = req.params.uuid
  Research.destroy({ where: { uuid } }).then(research => {
    console.log(research)
    res.sendStatus(200).send(research)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});
module.exports = router;