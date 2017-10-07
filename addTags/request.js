/**
 * Sample url request
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

var request = require('request');

var postData = JSON.stringify({
  method: 'wishlist',
  customerId: 7538827012,
  handle: 'k2-amp-72-mens-skis-flat-2015'
});

var options = {
  url: 'http://localhost:8010/anchorsuite/us-central1/addTags',
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
