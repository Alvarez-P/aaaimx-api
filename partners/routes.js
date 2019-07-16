const express = require('express');
const router = express.Router();
const { createOrUpdate, getPartners } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

router.get('/', async (req, res, next) => {
    const { Partner } = await connection()
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
    Partner.findAndCountAll(cond).then( async (partners) => {
      const colls = await getPartners(partners.rows)
      res.status(200).send({
        count: partners.count,
        rows: colls
      });
    }, err => {
      console.log(err)
      res.status(500).send(ERROR_500);
    })
  
  });
  
  module.exports = router;


router.post('/', (req, res, next) => {
    const partner = req.body
    createOrUpdate(partner).then(partner => {
      res.status(201).send(partner);
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  
  module.exports = router;