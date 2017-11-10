var request = require('request');
var _ = require('lodash');
var Promise = require('bluebird');
var filterTags = require('../utils/filterTags');

const settings = {
  apiEndpoint: '/admin/customers/',
  tagPrefix: 'saved::'
}

function update(customerId, newTags){
  return new Promise((resolve, reject) => {
    // API request options
    const options = {
      method: 'PUT',
      url: 'https://' + config.storeName + settings.apiEndpoint + customerId + '.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: config.authorization,
        'User-Agent': 'request'
      },
      body: {
        customer: {
          id: customerId,
          tags: newTags
        }
      },
      json: true
    };
    request(options, function (error, res, body) {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(res)
      }
    });
  });
}

function get(customerId){
  // Request options
  const options = {
    method: 'GET',
    url: 'https://' + config.storeName + settings.apiEndpoint + customerId + '.json',
    headers: {
      authorization: config.authorization
    }
  };
  return new Promise((resolve, reject) => {
    request(options, function (error, res, body) {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(res)
      }
    });
  });
}

/**
 * Add a tag to a customers account that represents a product saved to their wish list
 * @param  {integer} customerId Customers ID to updates
 * @param  {string} handle     The product handle to add to their wish list
 * @return {object}            The Shopify response object will be returned
 */
function add(customerId, handle){
  return new Promise((resolve, reject) => {
    // Retrieve existing customer tags before adding new tags
    get(customerId).then(res => {
      let data = JSON.parse(res.body);

      // Defining new array of tags
      let newTags = [settings.tagPrefix + handle];
      tags.push(data.customer.tags);

      // PUT request to the shopify API then resolving promise
      update(customerId, newTags).then(res => {
        resolve(res)
      });

    }).catch(err => {
      reject(err)
    })
  })
}

function remove(customerId, handle){
  return new Promise((resolve, reject) => {
    // Retrieve existing customer tags before adding new tags
    get(customerId).then(res => {
      let data = JSON.parse(res.body);

      // Getting string of tags without the prefixed tags
      let newTags = filterTags.remove(data.customer.tags, settings.tagPrefix, handle);

      // PUT request to the shopify API then resolving promise
      update(customerId, newTags).then(res => {
        resolve(res)
      });

    }).catch(err => {
      reject(err)
    })
  });
}

function clear(customerId){
  return new Promise((resolve, reject) => {
    // Retrieve existing customer tags before adding new tags
    get(customerId).then(res => {
      let data = JSON.parse(res.body);

      // Getting string of tags without the prefixed tags
      let newTags = filterTags.prefix(data.customer.tags, settings.tagPrefix);

      // PUT request to the shopify API then resolving promise
      update(customerId, newTags).then(res => {
        resolve(newTags)
      });

    }).catch(err => {
      reject(err)
    })
  });
}

module.exports = { add, remove, clear };
