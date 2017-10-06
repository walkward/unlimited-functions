/**
 * Updates product tags when webhook is triggered
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

 var http = require("http");
 var crypto = require("crypto");
 var request = require('request');

exports.addTags = function addTags(req, res) {
  // The Shopify app's shared secret, viewable from the Partner dashboard
  var sharedSecret = "fb2110342a563e14495e5178289609166dd7c0a6eafbda88a16b0761213252fd";
  var hmac = JSON.stringify(req.headers['X-Shopify-Hmac-Sha256']);

  // Verify the Shopify webhook's integrity
  function verifyShopifyHook(req) {
      var digest = crypto.createHmac('SHA256', sharedSecret)
              .update(new Buffer(req.body, 'utf8'))
              .digest('base64');

      return digest === hmac;
  }

  function updateTags(){
    // Request options
    var options = {
      method: 'PUT',
      url: 'https://darxe.myshopify.com/admin/products/9875080644.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Basic YTA1MTllMjFkODJkYzMzNTg2MzdiYjJjOGVhNDdjNmY6MDRmYzAxNjliMmE5NDg4N2RkNGVlZjBmNTVkMzIyZTU=',
        'User-Agent': 'request'
      },
      body: {
        product: {
          id: 9875080644,
          tags: 'Barnes & Noble, John\'s Fav'
        }
      },
      json: true
    };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);
    });
  }

  if (verifyShopifyHook(req)){
    // Everything is okay.
    updateTags();
    res.status(200).send('Success: ' + req.body);
  } else {
    res.status(400).send(req);
  }
};
