/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

var request = require('request');
const http = require('http');
const crypto = require('crypto');
const verify = crypto.createVerify('SHA256');

var postData = JSON.stringify({
  message: 'Hello World!'
});

var options = {
  url: 'http://localhost:8010/anchorsuite/us-central1/helloWorld',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'request'
  }
};

var req = request(options, function (error, res, body) {
  console.log(`STATUS: ${res}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  console.log(`BODY: ${body}`);
});

req.write(postData);
