'use strict';

/**
 * @param {Object} obj - The object.
 * @param {Array<Array<commandArray>>} q - An array of command arrays.
 */
function applyq(obj, q) {
  if (!(q instanceof Array)) {
    throw new Error('q has to be an instance of Array');
  }

  obj.push = function(data) {
    if (this[data[0]]) {
      this[data[0]].apply(this, data.splice(1));
      return;
    }
    if (this.warn) {
      this.warn('Array2Object was unable to process ' +
        data.toString());
    }
  };

  for (var i = 0, len = q.length; i < len; i++) {
    obj.push(q[i]);
  }
}

module.exports = applyq;
