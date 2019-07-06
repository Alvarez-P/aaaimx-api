const express = require('express');
const router = express.Router();
const { registerProfile }  = require('./controllers')

/**
 * POST Create new Author Profile
 */
router.post('/', (req, res, next) => {
  const profile = req.body
  registerProfile(profile).then(profile => {
    res.status(200).send(profile);
  }, e => {
    res.status(500).send('Internal Server Error');
  })
});

module.exports = router;
