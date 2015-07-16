'use strict';

function Array2Object() {}

Array2Object.prototype.push = function(data) {
  if (this[data[0]]) {
    this[data[0]].apply(this, data.splice(1));
    return;
  }
  if (this.warn) {
    this.warn('Array2Object was unable to process ' +
      data.toString());
  }
};

Array2Object.prototype.applyArray = function(array) {
  if (!(array instanceof Array)) {
    throw new Error('array has to be an instance of Array');
  }

  for (var i = 0, len = array.length; i < len; i++) {
    this.push(array[i]);
  }

  return this;
};

module.exports = Array2Object;
