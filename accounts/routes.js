const express = require('express');
const router = express.Router();
const { register, login }  = require('./controllers')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()

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
  register(user).then(user => {
    res.status(201).send(user);
  }, e => {
    res.status(500).send({ error: 'InternalServerError'});
  })
});

module.exports = router;
