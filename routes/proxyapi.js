var express = require('express');
var router = express.Router();
const fetch = require('isomorphic-fetch');

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
// console.log('dotenv AVAPIKEY: ' + process.env.AVAPIKEY);

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
    
    const yahoo = fetch(`https://chartapi.finance.yahoo.com/instrument/2.0/${req.params.stock_id}/chartdata;type=quote;range=1d/csv`, { headers, method: 'GET'})
        .then(response => response.text())
        .then(txt => {
            const mapped = Object.create(null);
            const errorRE = new RegExp(/errorid:/);
            if (! errorRE.exec(txt)) { // check for error
                const nameRE = new RegExp(/Company-Name:(.*)/);
                const lastcloseRE = new RegExp(/previous_close:(.*)/);
                mapped.name = nameRE.exec(txt)[1];
                mapped.lastclose = ParseToDecimalPlaces(lastcloseRE.exec(txt)[1], 2);
            } else {
                mapped.name = null;
                mapped.lastclose = null;
            }
            return mapped;
        });
 
    Promise.all([alphaVantage, yahoo])
    .then(([alphaData, yahooData]) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const value = Object.assign({currprice: null, name: null, lastclose: null, change: null}, alphaData, yahooData);
        value.change = ParseToDecimalPlaces(alphaData.currprice - yahooData.lastclose, 2);
        console.log(JSON.stringify(value));
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
