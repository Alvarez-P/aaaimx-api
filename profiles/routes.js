const express = require('express');
const router = express.Router();
const connection = require('../dao/connection')

/* GET all profiles. */
router.get('/', async (req, res, next) => {
  const { Profile } = await connection()
  console.log(Profile)
  res.status(200).send(Profile.findAll());
});

/* GET one profile. */
router.get('/:uuid', (req, res, next) => {
  const uuid = req.params.uuid
  res.status(200).send(Profile.findOne({
    where: {
      uuid
    }
  }));
});

/* POST profiles. */
router.post('/', (req, res, next) => {
  /**
   * TODO:
   */
});

module.exports = router;
