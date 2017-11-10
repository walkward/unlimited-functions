var Promise = require('bluebird');

/**
 * Removes all objects with the given prefix
 * @param  {string} tags   String of tags provided by shopify apiEndpoint
 * @param  {string} prefix The prefix to filter tags by
 * @return {string}        String of tags with the prefixed tags removed
 */
function prefix(tags, prefix) {
  return new Promise((resolve, reject) => {
    let splitTags = tags.split(',');
    let newTags = [];

    for (var i = 0, len = splitTags.length; i < len; i++) {
      let tag = splitTags[i].trim();

      if (tag.slice(0, prefix.length) !== prefix) {
        newTags.push(tag)
      }
    }

    resolve(newTags)

  }).catch(err => {
    reject(err)
  })
}

function remove(tags, prefix, handle) {
  return new Promise((resolve, reject) => {
    let splitTags = tags.split(',');
    let newTags = [];

    for (var i = 0, len = splitTags.length; i < len; i++) {
      let tag = splitTags[i].trim();

      if (tag !== prefix + handle) {
        newTags.push(tag)
      }
    }

    resolve(newTags)

  }).catch(err => {
    new Error(err);
  })
}

module.exports = { prefix, remove };
