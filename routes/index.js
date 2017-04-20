var express = require('express');
var router = express.Router();

let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addstocks', function(req, res, next){

});

module.exports = router;