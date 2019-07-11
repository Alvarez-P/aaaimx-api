const express = require('express');
const router = express.Router();
const { register, login }  = require('./controllers')

router.post('/login', (req, res, next) => {
  const user = req.body
  login(user).then(user => {
    console.log(user)
    res.status(200).send(user);
  }, e => {
    console.log(e)
    res.status(401).send(e);
  })
});

router.post('/register', (req, res, next) => {
  const user = req.body
  register(user).then(user => {
    res.status(200).send(user);
  }, e => {
    res.status(500).send(e);
  })
});

module.exports = router;
