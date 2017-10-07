/**
 * Endpoint for interacting with the shopify admin
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

var http = require("http");
var crypto = require("crypto");
var request = require('request');
var getRawBody = require('raw-body');

var wishlist = require('./api/wishlist.js');
var productUpdate = require('./webhooks/productUpdate.js');

global.config = {
  sharedSecret: 'fb2110342a563e14495e5178289609166dd7c0a6eafbda88a16b0761213252fd', // SETUP: Add shared secret from webhook
  apiKey: 'a0519e21d82dc3358637bb2c8ea47c6f', // SETUP: Add API key from private app
  apiSecret: '04fc0169b2a94887dd4eef0f55d322e5', // SETUP: Add API secret from private app
  storeName: 'darxe.myshopify.com' // SETUP: Add store domain
}

exports.addTags = function addTags(req, res) {
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

  
  switch (req.body.method) {
    case 'wishlist':
      wishlist.add(req.body.customerId, req.body.handle, function(apiResponse) {
      	res.status(200).send('success:' + JSON.stringify(apiResponse));
      });
      break;
    case 'product':
      productUpdate.updateTags(req.body.id, 'tags added, tag\'s now');
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }

  if (req.body){

  } else {
    res.status(400).send(req);
  }
};
