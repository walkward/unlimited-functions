/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

 var http = require("http");
 var crypto = require("crypto");
 var request = require('request');

exports.helloWorld = function helloWorld(req, res) {
  // The Shopify app's shared secret, viewable from the Partner dashboard
  var sharedSecret = "fb2110342a563e14495e5178289609166dd7c0a6eafbda88a16b0761213252fd";
  var hmac = JSON.stringify(req.headers['x-shopify-hmac-sha256']);

  // Verify the Shopify webhook's integrity
  function verifyShopifyHook(req) {
      var digest = crypto.createHmac('SHA256', sharedSecret)
              .update(new Buffer(req.body, 'utf8'))
              .digest('base64');

      return digest === hmac;
  }

  function updateTags(){
    // Request data
    let postData = {
      "product": {
        "id": 9875080644,
        "tags": "Barnes & Noble, John's Fav"
      }
    };

    // Request options
    let options = {
      url: 'http://localhost:8010/anchorsuite/us-central1/helloWorld',
      method: 'PUT',
      hostname: 'darxe.myshopify.com',
      path: '/admin/products/' + '9875080644' + '.json',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'request'
      }
    };

    const req = request(options, function (error, res, body) {
      // TODO: Add error handling
    });

    return req.write(postData);
  }

  if (verifyShopifyHook(req)){
    // Everything is okay.
    console.log(req.body);
    res.status(200).send('Success: ' + req.body);
  } else {
    res.status(400).send(req);
  }
};
