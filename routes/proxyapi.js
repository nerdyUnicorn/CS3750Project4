var express = require('express');
var router = express.Router();

const ensureAuthenticated = require('../lib/auth').ensureAuthenticated;
const passport = require('../lib/auth').passport;
let User = require('../models/user');

const http = require('http');

// get AVAPIKEY from /.env
const dotenv = require('dotenv').config();

// test API
router.get('/test', function(req, res) {
    res.json({ message: 'hooray! welcome to our proxy api!' });   
});

router.get('/stock/:stock_id', function(req, res) {

    // We make two remote API calls then merge some of that data
    // into our own response

    let AVdata = null;
    let MDdata = null;

    //  Allow cross-origin HTTP request
    res.setHeader('Access-Control-Allow-Origin', '*');

    // modify the incoming headers before resending
    // don't send remote sites our local cookie
    // don't advertise support for gzip compressed response
    delete req.headers.cookie;
    req.headers['accept-encoding'] = 'gzip;q=0,deflate,sdch';

    // Copy and modify the incoming headers for Alpha Vantage
    let AVheaders = Object.assign({}, req.headers);
    AVheaders.host = 'www.alphavantage.co';

    let AVoptions = {
        // host to forward to
        host:   'www.alphavantage.co',
        // port to forward to
        port:   80,
        // path to forward to
        path:   '/query?function=TIME_SERIES_INTRADAY&symbol=' + req.params.stock_id
                + '&interval=1min&outputsize=compact&apikey=' + process.env.AVAPIKEY,
        // request method
        method: 'GET',
        // json serializeable
        json: true,
        // headers to send
        headers: AVheaders
  };

  let AVreq = http.request(AVoptions, function(cres) {

        // where the response gets collected
        let RAPIres = '';

        // set encoding
        cres.setEncoding('utf8');

        cres.on('end', function(){
            let AVjson = JSON.parse(RAPIres);
            //console.log(AVjson);
            let newData = {};
            if (AVjson.hasOwnProperty('Meta Data')) {
                newData.symbol = AVjson['Meta Data']['2. Symbol'];
                for(const prop in AVjson['Time Series (1min)']) {
                    // toFixed returns a string WTF
                    newData.currprice = Number.parseFloat(Number.parseFloat(AVjson['Time Series (1min)'][prop]['4. close']).toFixed(2));
                    break;
                }
            }
            AVdata = newData;
            complete();
        });

        // wait for data (happens repeatably), collect it
        cres.on('data', function(chunk){
            RAPIres += chunk;
        });

    }).on('error', function(e) {
        // we got an error, return 500 error to client and log error
        console.log(e.message);
        res.writeHead(500);
        res.end();
    });
    AVreq.end();

    // Copy and modify the incoming headers for MarkitOnDemand
    let MDheaders = Object.assign({}, req.headers);
    MDheaders.host = 'dev.markitondemand.com';

    let MDoptions = {
        // host to forward to
        host:   'dev.markitondemand.com',
        // port to forward to
        port:   80,
        // path to forward to
        path:   '/MODApis/Api/v2/Quote/json?symbol=' + req.params.stock_id,
        // request method
        method: 'GET',
        // json serializeable
        json: true,
        // headers to send
        headers: MDheaders,
  };

  let MDreq = http.request(MDoptions, function(cres) {

        let RAPIres = '';

        // set encoding
        cres.setEncoding('utf8');

        cres.on('end', function(){
            let mdJSON = JSON.parse(RAPIres);
            //console.log(mdJSON);
            let newData = {};
            if (mdJSON.hasOwnProperty('Name')) {
                newData.name = mdJSON['Name'];
            }
            if (mdJSON.hasOwnProperty('LastPrice')) {
                newData.lastprice = mdJSON['LastPrice'];
            }

            MDdata = newData;
            complete();
        });

        // wait for data (happens repeatably), collect it
        cres.on('data', function(chunk){
            RAPIres += chunk;
        });

    }).on('error', function(e) {
        // we got an error, return 500 error to client and log error
        console.log(e.message);
        res.writeHead(500);
        res.end();
    });
    MDreq.end();

    function complete() {
        if (AVdata !== null && MDdata !== null) {
            let finalReponse = Object.assign({currprice: null, name: null, lastprice: null, change: null}, AVdata, MDdata);
            // calculate change between yesterday's closing price and the current price
            finalReponse.change = Number.parseFloat((finalReponse.currprice - finalReponse.lastprice).toFixed(2));
            res.write(JSON.stringify(finalReponse));
            res.end();
        }
    }

});

module.exports = router;
