var express = require('express');
var router = express.Router();

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
const passport = require('../lib/auth').passport;
let User = require('../models/user');


// test API
//router.get('/test', ensureAuthenticated, function(req, res) {
router.get('/test', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/addstocks', function(req, res){
    var username = req.user;
    var stock = req.body.item;
    console.log(username);
    console.log(stock);
    User.addStock(username, stock, (err, user) => {
        if (err) throw err;
        res.status(200).send();
    })
})

module.exports = router;
