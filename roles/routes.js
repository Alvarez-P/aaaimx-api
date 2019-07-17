const express = require('express');
const router = express.Router();
const { createOrUpdate, getRole } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

router.get('/', async (req, res, next) => {
    const { Role } = await connection()
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
    Role.findAndCountAll(cond).then( async (role) => {
      const colls = await getRole(role.rows)
      res.status(200).send({
        count: role.count,
        rows: colls
      });
    }, err => {
      console.log(err)
      res.status(500).send(ERROR_500);
    })
  
  });
  
  module.exports = router;


router.post('/', (req, res, next) => {
    const role = req.body
    createOrUpdate(role).then(role => {
      res.status(201).send(role);
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  
  module.exports = router;

  router.get('/:id', async (req, res, next) => {
    const { Role } = await connection()
    const id = req.params.id
    Role.findOne({ where: { id } }).then(role => {
      if (!role)
        res.status(404).send(ERROR_404)
      else
        res.status(200).send(role)
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  module.exports = router;


  router.delete('/:id', async (req, res, next) => {
    const { Role } = await connection()
    const id = req.params.id
    Role.findOne({ where: { id } }).then(role => {
      if (!role)
        res.status(404).send(ERROR_404)
      else
        res.status(200).send(role)
    }, e => {
      console.log(e)
      res.status(500).send(ERROR_500);
    })
  });
  module.exports = router;