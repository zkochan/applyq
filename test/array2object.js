'use strict';

var Array2Object = require('../');

describe('Array2Object', function() {
  it('populates the API', function() {
    function Api() {}
    Api.prototype = new Array2Object();
    Api.prototype.foo = 1;
    Api.prototype.bar = function() {};
    var api = new Api().applyArray([]);
    expect(api).to.be.a('object');
    expect(api.bar).to.be.a('function');
    expect(api.foo).to.equal(1);
  });

  it('executes the API through push before conversion', function(done) {
    function Api() {}
    Api.prototype = new Array2Object();
    Api.prototype.bar = function(parameters) {
      expect(parameters).to.equal(5);
      done();
    };
    var arr = [];
    arr.push(['bar', 5]);
    new Api().applyArray(arr);
  });

  it('executes the API through push before conversion with multiple arguments', function(done) {
    function Api() {}
    Api.prototype = new Array2Object();
    Api.prototype.bar = function(a, b) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      done();
    };
    var arr = [];
    arr.push(['bar', 1, 2]);
    new Api().applyArray(arr);
  });

  it('executes the API through properties', function(done) {
    function Api() {}
    Api.prototype = new Array2Object();
    Api.prototype.bar = function(parameters) {
      expect(parameters).to.equal(5);
      done();
    };
    var api = new Api().applyArray([]);
    api.bar(5);
  });
});
