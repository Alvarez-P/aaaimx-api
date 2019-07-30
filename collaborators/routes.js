const express = require('express');
const router = express.Router();
const { createOrUpdate, getCollaborators, getCollaborator } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

/**
 * @api {GET} /collaborators Get list of collaborators
 * @apiName GetCollaborators
 * @apiDescription Get list of collaborators that match query or pagination parameters
 * @apiGroup Collaborator
 * @apiVersion 1.0.0
 * @apiExample {js} Example usage:
 *     GET http://localhost/collaborators // return all collaborators
 *     GET http://localhost/collaborators?role=Researcher // return all Collaborator with role equals to 'Researcher'
 *     GET http://localhost/collaborators?offset=0&limit=10 // return a paginated list
 *
 * @apiParam {String} name Research's name(s).
 * @apiParam {String} lastname Reseracher's lastname separated by comma.
 * @apiParam {String} email Valid email address.
 * @apiParam {String} adscription Institute origin.
 * @apiParam {String} role Student/Researcher/Teacher/Advisor.
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
 */router.get('/', async (req, res, next) => {
  const { Collaborator } = await connection()
  let cond = {}
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
  Collaborator.findAndCountAll(cond).then(async (collaborators) => {
    const colls = await getCollaborators(collaborators.rows)
    res.status(200).send({
      count: collaborators.count,
      rows: colls
    });
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});

module.exports = router;
router.get('/', async (req, res, next) => {
  const { Collaborator } = await connection()
  let cond = {}
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
  Collaborator.findAndCountAll(cond).then(async (collaborators) => {
    const colls = await getCollaborators(collaborators.rows)
    res.status(200).send({
      count: collaborators.count,
      rows: colls
    });
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});

module.exports = router;

/**
 * @api {GET} /collaborators/:uuid Request Collaborator information
 * @apiName GetCollaborator
 * @apiGroup Collaborator
 * @apiVersion 1.0.0
 *
 * @apiParam {String} uuid Collaborator identifier
 *
 * @apiSuccess {String} uuid Identifier of the Collaborator.
 * @apiSuccess {String} name Research's name(s).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "uuid": "xxxx-xxxx-xxxx-xxxx",
 *       "name": "Mauricio Gabriel",
 *        ...
 *     }
 *
 * @apiError CollaboratorNotFound Resource does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CollaboratorNotFound"
 *     }
 */
router.get('/:uuid', async (req, res, next) => {
  const { Collaborator } = await connection()
  const uuid = req.params.uuid
  let coll = await Collaborator.findOne({ where: { uuid } })
  coll = await getCollaborator(coll)
  res.status(200).send(coll);

});

module.exports = router

/**
 * @api {POST} /collaborators/ Create new Collaborator
 * @apiName CreateCollaborator
 * @apiGroup Collaborator
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Research's name(s).
 * @apiParam {String} lastname Reseracher's lastname separated by comma.
 * @apiParam {String} email Valid email address.
 * @apiParam {String} adscription Institute origin.
 * @apiParam {String} role Student/Researcher/Teacher/Advisor.
 * @apiParam {JSON} extra Collaborator extra data in JSON format.
 *
 * @apiSuccess {String} uuid Identifier of the Collaborator.
 * @apiSuccess {String} name Research's name(s).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "uuid": "xxxx-xxxx-xxxx-xxxx",
 *       "name": "Mauricio Gabriel",
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
  const collaborator = req.body
  createOrUpdate(collaborator).then(collaborator => {
    res.status(201).send(collaborator);
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;

router.put('/:uuid', (req, res, next) => {
  const uuid = req.params.uuid
  var collaborator = req.body
  collaborator.uuid = uuid
  createOrUpdate(collaborator).then(collaborator => {
    res.status(200).send(collaborator);
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;

router.delete('/:uuid', async (req, res, next) => {
  const { Collaborator } = await connection()
  const uuid = req.params.uuid
  Collaborator.destroy({ where: { uuid } }).then(collaborator => {
    res.status(200).send(collaborator)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;