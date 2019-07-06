const express = require('express');
const router = express.Router();
const { registerProfile }  = require('./controllers')

router.post('/registerProfile', (req, res, next) => {
  const profile = req.body
  registerProfile(profile).then(profile => {
    res.status(200).send(profile);
  }, e => {
    res.status(500).send(e);
  })
});

module.exports = router;
