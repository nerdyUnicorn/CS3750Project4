var express = require('express');
var router = express.Router();

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
const passport = require('../lib/auth').passport;
let User = require('../models/user');


// test API
//router.get('/test', ensureAuthenticated, function(req, res) {
// router.get('/test', function(req, res) {
//     User.getStocksAndPercent('bob', (err, user) => {
//         if (err) throw err;
//         res.json(user);
//     })

//     //res.json({ message: 'hooray! welcome to our api!' });   
// });

router.post('/addstocks', ensureAuthenticated, function(req, res, next){
    var username = req.user.username;
    var stock = req.body.stock;
        
    User.addStock(username, stock, (err, user) => {
        if (err) throw err;
        res.status(200).send();
    })
})

router.get('/getStocksAndPercent', ensureAuthenticated, function(req, res) {
    var username = req.user.username;

    User.getStocksAndPercent(username, (err, user) => {
        if (err) throw err;
        res.json(user);
    });
});

router.get('/getStocks', ensureAuthenticated, function(req, res) {
    var username = req.user.username;

    User.getStocks(username, (err, user) => {
        if (err) throw err;
        res.json(user);
    })
})

router.get('/isLoggedIn', function(req, res) {
    if (req.user) { 
        res.json({status: true})
    } else { 
        res.json({status: false})
    }
});

router.post('/updateAlloc', ensureAuthenticated, function(req, res){
    //To use updateAlloc, must have post coming as shown below portfolio with array of symbol and value
    var username = req.user.username //is good, just be sure with the portfolio
    //var portfolio = {"portfolio": */[{ "percent" :90, "symbol":"GOOG"}, {"percent":20,"symbol":"AAPL"}];//};
    User.updateAlloc(req.user.username, req.body.portfolio, (err, user) =>
    {
        if (err) throw err;
        res.status(200).send();
    })
});

router.delete('/deleteStock', ensureAuthenticated, function(req, res){
    //var username = "bob";
    //var stock = "AAPL"; Just need the stock, the req has the username

    User.deleteStock(req.user.username, req.body.stock, (err, user) =>
    {
        if (err) throw err;
        res.status(200).send();
    })
});

module.exports = router;
