const express = require('express');
const router = express.Router();
const { register }  = require('./controllers')

router.post('/register', (req, res, next) => {
  const user = req.body
  register(user).then(user => {
    res.status(200).send(user);
  }, e => {
    res.status(500).send(e);
  })
});

module.exports = router;
