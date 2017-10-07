var request = require('request');

/**
 * Add a tag to a customers account that represents a product saved to their wish list
 * @param  {integer} customerId Customers ID to updates
 * @param  {string} handle     The product handle to add to their wish list
 * @return {object}            The Shopify response object will be returned
 */
function add(customerId, handle, callback){
  // Request options
  var options = {
    method: 'PUT',
    url: 'https://' + config.storeName + '/admin/customers/' + customerId + '.json',
    headers: {
      'Content-Type': 'application/json',
      authorization: config.authorization,
      'User-Agent': 'request'
    },
    body: {
      customer: {
        id: customerId,
        tags: 'saved::' + handle
      }
    },
    json: true
  };

  request(options, function (error, res, body) {
    if (error) {
      throw new Error(error);
    } else {
      return callback(res);
    }
  });
}

module.exports = { add };
