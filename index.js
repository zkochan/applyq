'use strict';

/**
 * @param {Object} obj - The object.
 * @param {Array<Array<commandArray>>} q - An array of command arrays.
 */
function applyq(obj, q, methods) {
  if (!(q instanceof Array)) {
    throw new Error('q has to be an instance of Array');
  }

  /**
   * @function Command executer.
   * @param {Array} command - The first element in a command array is the name
   *   of the object method you want to call. It must be a string. The rest of
   *   the elements are the arguments you want to pass to the object method.
   *   These can be any JavaScript value.
   */
  q.push = obj.push = function(command) {
    if (arguments.length !== 1 ||
      !(arguments[0] instanceof Array) ||
      typeof obj[command[0]] !== 'function' ||
      methods instanceof Array && methods.indexOf(command[0]) === -1) {
      return Array.prototype.push.apply(q, arguments);
    }

    obj[command[0]].apply(obj, command.slice(1));
  };

  var len = q.length;
  while (len--) {
    q.push(q.shift());
  }
}

module.exports = applyq;
