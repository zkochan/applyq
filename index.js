'use strict';

/**
 * @param {Object} obj - The object.
 * @param {Array<Array<commandArray>>} q - An array of command arrays.
 */
function applyq(obj, q) {
  if (!(q instanceof Array)) {
    throw new Error('q has to be an instance of Array');
  }

  q.push = obj.push = function(data) {
    if (obj[data[0]]) {
      obj[data[0]].apply(obj, data.splice(1));
      return;
    }
    if (obj.warn) {
      obj.warn('applyq was unable to process ' +
        data.toString());
    }
  };

  while(q.length) {
    obj.push(q.shift());
  }
}

module.exports = applyq;
