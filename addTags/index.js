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
  var sharedSecret = 'fb2110342a563e14495e5178289609166dd7c0a6eafbda88a16b0761213252fd';
  var apiKey = 'a0519e21d82dc3358637bb2c8ea47c6f';
  var apiSecret = '04fc0169b2a94887dd4eef0f55d322e5';
  var storeName = 'darxe.myshopify.com';

  var authorization = 'Basic ' + new Buffer(apiKey + ':' + apiSecret).toString('base64');
  var hmac = JSON.stringify(req.headers['X-Shopify-Hmac-Sha256']);
  var productId = req.body.id;
  var newTags = 'tags added, tag\'s now';

  console.log(req)

  // Verify the Shopify webhook's integrity
  // TODO: Need to authenticate the webhook request verifyShopifyHook(req)
  // function verifyShopifyHook(req) {
  //     var digest = crypto.createHmac('SHA256', sharedSecret)
  //             .update(new Buffer(req.body, 'utf8'))
  //             .digest('base64');
  //
  //     return digest === hmac;
  // }

  function updateTags(){
    // Request options
    var options = {
      method: 'PUT',
      url: 'https://' + storeName + '/admin/products/' + productId + '.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: authorization,
        'User-Agent': 'request'
      },
      body: {
        product: {
          id: productId,
          tags: newTags
        }
      },
      json: true
    };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);
    });
  }

  if (req.body){
    // Everything is okay.
    updateTags();
    res.status(200).send('Success: ' + JSON.stringify(req.body));
  } else {
    res.status(400).send(req);
  }
};
