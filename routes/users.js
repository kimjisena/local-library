const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET some coool shit */
router.get('/cool', function(req, res, next) {
  res.send('this is some cool shit!');
});

module.exports = router;
