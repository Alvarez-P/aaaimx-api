const express = require('express');
const router = express.Router();
const { createOrUpdate } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

/**
 * @api {GET} /profiles Get list of profiles
 * @apiName GetProfiles
 * @apiDescription Get list of profiles that match query or pagination parameters
 * @apiGroup Profile
 * @apiVersion 1.0.0
 * @apiExample {js} Example usage:
 *     GET http://localhost/profiles // return all profiles
 *     GET http://localhost/profiles?role=Researcher // return all profile with role equals to 'Researcher'
 *     GET http://localhost/profiles?offset=0&limit=10 // return a paginated list
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
 */
router.get('/', async (req, res, next) => {
  const { Profile } = await connection()
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
  Profile.findAndCountAll(cond).then(profiles => {
    res.status(200).send(profiles);
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});

module.exports = router;

/**
 * @api {GET} /profiles/:uuid Request Profile information
 * @apiName GetProfile
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String} uuid Profile identifier
 *
 * @apiSuccess {String} uuid Identifier of the Profile.
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
 * @apiError ProfileNotFound Resource does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProfileNotFound"
 *     }
 */
router.get('/:uuid', async (req, res, next) => {
  const { Profile } = await connection()
  const uuid = req.params.uuid
  Profile.findOne({ where: { uuid } }).then(profile => {
    if (!profile)
      res.status(404).send(ERROR_404)
    else
      res.status(200).send(profile)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;


/**
 * @api {POST} /profiles/ Create new Profile
 * @apiName CreateProfile
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Research's name(s).
 * @apiParam {String} lastname Reseracher's lastname separated by comma.
 * @apiParam {String} email Valid email address.
 * @apiParam {String} adscription Institute origin.
 * @apiParam {String} role Student/Researcher/Teacher/Advisor.
 * @apiParam {JSON} extra Profile extra data in JSON format.
 *
 * @apiSuccess {String} uuid Identifier of the Profile.
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
  const profile = req.body
  createOrUpdate(profile).then(profile => {
    res.status(201).send(profile);
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;

router.put('/:uuid', (req, res, next) => {
  const uuid = req.params.uuid
  var profile = req.body
  profile.uuid = uuid
  createOrUpdate(profile).then(profile => {
    res.status(200).send(profile);
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});

module.exports = router;
