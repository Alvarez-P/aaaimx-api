const express = require('express');
const router = express.Router();
const { register, login }  = require('./controllers')

/* POST users listing. */
router.post('/login', (req, res, next) => {
  const user = req.body
  login(user).then(user => {
    res.status(200).send(user);
  }, e => {
    res.status(500).send(e);
  })
});

/* POST users listing. */
router.post('/register', (req, res, next) => {
  const user = req.body
  register(user).then(user => {
    res.status(200).send(user);
  }, e => {
    res.status(500).send(e);
  })
});

module.exports = router;
