'use strict';

var request = require('request');
var Promise = require('bluebird');
var filterTags = require('../utils/filterTags');

const settings = {
  apiEndpoint: '/admin/products/',
  tagPrefix: 'saved::'
};

function create(productId, originalName){
  return new Promise((resolve, reject) => {
    // API request options
    const options = {
      method: 'PUT',
      url: 'https://' + config.storeName + settings.apiEndpoint + productId + '.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: config.authorization,
        'User-Agent': 'request'
      },
      body: {
          "product": {
          "id": 374183723046,
          "metafields": [
            {
              namespace: "tasklist",
              key: "originalName",
              value: originalName,
              value_type: "string"
            },
            {
              namespace: "tasklist",
              key: "revisedTitle",
              value: "false",
              value_type: "string"
            }
          ]
        }
      },
      json: true
    };
    request(options, function (error, res) {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(res);
      }
    });
  });
}

function update(productId, productObj){
  return new Promise((resolve, reject) => {
    // API request options
    const options = {
      method: 'PUT',
      url: 'https://' + config.storeName + settings.apiEndpoint + productId + '.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: config.authorization,
        'User-Agent': 'request'
      },
      body: {
          "product": productObj
      },
      json: true
    };
    request(options, function (error, res) {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(res);
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

module.exports = { create, update, remove, clear };
