var request = require('request');

/**
 * Update tags for product
 * note: This will replace all tags
 * @param  {integer} id   Product ID to update
 * @param  {string} tags String containg tags separated by commas
 * @return {object}      Shopify API response
 */
function updateTags(id, tags){
  var productId = req.body.id;
  var newTags = 'tags added, tag\'s now';

  // Request options
  var options = {
    method: 'PUT',
    url: 'https://' + config.storeName + '/admin/products/' + productId + '.json',
    headers: {
      'Content-Type': 'application/json',
      authorization: config.authorization,
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

module.exports = { updateTags };
