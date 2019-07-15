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



router.get('/:uuid', async (req, res, next) => {
    const { InteresedAreas } = await connection()
    const uuid = req.params.uuid
    InteresedAreas.findOne({ where: { uuid } }).then(interesedAreas => {
      if (!interesedAreas)
        res.status(404).send(ERROR_404)
      else
        res.status(200).send(interesedAreas)
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  module.exports = router;