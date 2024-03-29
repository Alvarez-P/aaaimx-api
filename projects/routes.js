const express = require('express');
const router = express.Router();
const { createOrUpdate, getProjects, getProject } = require('./controllers')
const connection = require('../dao/connection')
const ERROR_404 = {
  error: "ResourceNotFound"
}
const ERROR_500 = {
  error: "InternalServerError"
}

/* GET all researches. */
router.get('/', async (req, res, next) => {
  const { Project } = await connection()
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
  Project.findAndCountAll(cond).then(async (projects) => {
    const colls = await getProjects(projects.rows)
    res.status(200).send({
      count: projects.count,
      rows: colls
    });
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});
module.exports = router;

router.get('/:uuid', async (req, res, next) => {
  const { Project } = await connection()
  const uuid = req.params.uuid
  Project.findOne({ where: { uuid } }).then(async (project) => {
    const coll = await getProject(project)
    res.status(200).send(coll);
  }, err => {
    console.log(err)
    res.status(500).send(ERROR_500);
  })

});
module.exports = router;

router.post('/', (req, res, next) => {
  const project = req.body
  console.log(req.headers)
  createOrUpdate(project).then(project => {
    res.status(200).send(project);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;

/* PUT researches listing. */
router.put('/', (req, res, next) => {
  const project = req.body
  createOrUpdate(project).then(project => {
    res.status(200).send(project);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;

router.delete('/:uuid', async (req, res, next) => {
  const { Project } = await connection()
  const uuid = req.params.uuid
  Project.destroy({ where: { uuid } }).then(res => {
      res.status(200).send(res)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});
module.exports = router;