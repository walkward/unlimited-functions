/**
 * Endpoint for interacting with the shopify admin
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

'use strict';

var http = require("http");
var crypto = require("crypto");
var request = require('request');
var getRawBody = require('raw-body');
var Promise = require('bluebird');

var product = require('./api/product.js');
var productUpdate = require('./webhooks/productUpdate.js');

global.config = {
  sharedSecret: 'fb2110342a563e14495e5178289609166dd7c0a6eafbda88a16b0761213252fd', // SETUP: Add shared secret from webhook
  apiKey: '0131e4175677f72d4e403d2b97e650bf', // SETUP: Add API key from private app
  apiSecret: '9f68e780a3efe2e7376ec662746133b9', // SETUP: Add API secret from private app
  storeName: 'gizmogild.myshopify.com' // SETUP: Add store domain
};

exports.metafields = function metafields(req, res) {
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');

  // Basic auth string passed to shopify api requests
  config.authorization = 'Basic ' + new Buffer(config.apiKey + ':' + config.apiSecret).toString('base64');

  // Verify the Shopify webhook's integrity
  // TODO: Need to authenticate the webhook request verifyShopifyHook(req)
  // function verifyShopifyHook(req){
  //   getRawBody(req).then(function (buf) {
  //     var hmac = req.headers['x-shopify-hmac-sha256'];
  //     var digest = crypto.createHmac('SHA256', sharedSecret).update(new Buffer(buf, 'utf8')).digest('base64');
  //   })
  //   .catch(function (err) {
  //     res.status(400).send(err);
  //   })
  // }
  // verifyShopifyHook(req);

  switch (req.headers['x-shopify-topic']) {
    case 'products/create':
      product.create(req.body.id, req.body.title).then((successMessage) => {
        res.status(200).send('success:' + JSON.stringify(successMessage));
      });
      break;
    case 'products/update':
      productUpdate.updateTags(req.body.id, 'tags added, tag\'s now');
      break;
    case 'product/update':
      product.update(req.body.id, req.body).then((successMessage) => {
        res.status(200).send('success:' + JSON.stringify(successMessage));
      });
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }

  if (req.body){
    console.log('Needs to update authentication');
  } else {
    res.status(400).send(req);
  }
};
