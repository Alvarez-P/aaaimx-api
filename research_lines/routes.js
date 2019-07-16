const express = require('express');
const router = express.Router();
const { createOrUpdate, getResearchLine } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

router.get('/', async (req, res, next) => {
    const { InterestArea } = await connection()
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
    InterestArea.findAndCountAll(cond).then( async (interestArea) => {
      const colls = await getInterestAreas(interestArea.rows)
      res.status(200).send({
        count: interestArea.count,
        rows: colls
      });
    }, err => {
      console.log(err)
      res.status(500).send(ERROR_500);
    })
  
  });
  
  module.exports = router;


router.post('/', (req, res, next) => {
    const interestArea = req.body
    createOrUpdate(interestArea).then(interestArea => {
      res.status(201).send(interestArea);
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  
  module.exports = router;