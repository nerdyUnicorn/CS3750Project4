var express = require('express');
var router = express.Router();
const fetch = require('isomorphic-fetch');
const fetchJsonp = require('fetch-jsonp');

// Object.entries shim
const entries = require('object.entries');
if (!Object.entries) {
	entries.shim();
}

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
const passport = require('../lib/auth').passport;
let User = require('../models/user');

// get AVAPIKEY from /.env
const dotenv = require('dotenv').config();
console.log('dotenv AVAPIKEY: ' + process.env.AVAPIKEY);

// test API
router.get('/test', function(req, res) {
    res.json({ message: 'hooray! welcome to our proxy api!' });   
});

router.get('/stock/:stock_id', function(req, res, next) {

   // setup the outbound header by using a modified version
   // of the incoming request headers 
    delete req.headers.host;
    const headers = new Headers();
    for(let [key, value] of Object.entries(req.headers)) {
        if(key !== 'cookie')
            headers.append(key, value);
    }
    headers.append('accept-encoding', 'gzip;q=0,deflate,sdch');
    
    const alphaVantage = fetch(`http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.stock_id}&interval=1min&outputsize=compact&apikey=${process.env.AVAPIKEY}`, { headers, method: 'GET' })
        .then(response => response.json())
        .then(json => {
            const mapped = Object.create(null);
            if(json['Meta Data']) {
                mapped.symbol = json['Meta Data']['2. Symbol'];
                for (let key of Object.keys(json['Time Series (1min)'])) {
                    mapped.currprice = ParseToDecimalPlaces(json['Time Series (1min)'][key]['4. close'], 2);
                    break;
                }
            }
            return mapped;
        });
    
    const markItOnDemand = fetch(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.params.stock_id}`, { headers, method: 'GET' })
        .then(response => response.json())
        .then(json => {
            return ['Name', 'LastPrice'].reduce((map, key) => {
                map[key] = json[key];
                return map;
            }, Object.create(null));
        });
 
    Promise.all([alphaVantage, markItOnDemand])
    .then(([alphaData, modData]) => {
        const value = Object.assign({currprice: null, Name: null, LastPrice: null, change: null}, alphaData, modData);
        value.change = ParseToDecimalPlaces(alphaData.currprice - modData.LastPrice, 2);
        console.log(JSON.stringify(value));
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(value);
    })
    .catch(err => next(err));
});
 
function ParseToDecimalPlaces(value, numPlaces) {
    const radix = 10 * numPlaces;
    if(typeof value === 'string')
        value = Number.parseFloat(value);
    
    return Math.trunc(value * radix)/radix;
}

module.exports = router;
