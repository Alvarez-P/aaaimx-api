const express = require('express');
const router = express.Router();
const { register, login } = require('./controllers')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const connection = require('../dao/connection')

router.post('/login', (req, res, next) => {
  const user = req.body
  login(user).then(user => {
    console.log(user)
    res.status(200).send(user);
  }, err => {
    res.status(err.status).send(err.error);
  })
});

router.post('/register', guard.check(["admin", "read", "create", "update"]), (req, res, next) => {
  const user = req.body
  if (user.email.trim() && user.password.trim()) {
    register(user).then(user => {
      res.status(201).send(user);
    }, e => {
      res.status(500).send({ error: 'InternalServerError' });
    })
  } else {
    res.status(409).send({ error: 'BadRequest' });
  }
});

module.exports = router;


router.get('/:email', async (req, res, next) => {
  const { User } = await connection()
  const email = req.params.email
  User.findOne({ where: { email } }).then(user => {
    if (!user)
      res.status(404).send(ERROR_404)
    else
      res.status(200).send(user)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});
module.exports = router;


router.delete('/:uuid', async (req, res, next) => {
  const { User } = await connection()
  const uuid = req.params.uuid
  User.findOne({ where: { uuid } }).then(user => {
    if (!user)
      res.status(404).send(ERROR_404)
    else
      res.status(200).send(user)
  }, e => {
    console.log(e)
    res.status(500).send(ERROR_500);
  })
});
module.exports = router;