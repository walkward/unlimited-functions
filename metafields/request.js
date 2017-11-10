/**
 * Sample url request
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

'use strict';

var request = require('request');

var postData = JSON.stringify({
  id: 374368665638,
  title: "Test Title 3"
});

var options = {
  url: 'http://localhost:8010/gizmo-gild/us-central1/metafields',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'request',
    'x-shopify-topic': 'product/update'
  }
};

var req = request(options, function (error, res, body) {
  console.log(`STATUS: ${res}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  console.log(`BODY: ${body}`);
});

req.write(postData);
