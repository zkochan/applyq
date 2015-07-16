'use strict';

var applyq = require('../');

describe('applyq', function() {
  it('populates the API', function() {
    var api = {
      foo: 1,
      bar: function() {}
    };
    applyq(api, []);
    expect(api).to.be.a('object');
    expect(api.bar).to.be.a('function');
    expect(api.foo).to.equal(1);
  });

  it('executes the API through push before conversion', function(done) {
    var api = {
        bar: function(parameters) {
        expect(parameters).to.equal(5);
        done();
      }
    };
    var arr = [];
    arr.push(['bar', 5]);
    applyq(api, arr);
  });

  it('executes the API through push before conversion with multiple arguments', function(done) {
    var api = {
      bar: function(a, b) {
        expect(a).to.equal(1);
        expect(b).to.equal(2);
        done();
      }
    };
    var arr = [];
    arr.push(['bar', 1, 2]);
    applyq(api, arr);
  });

  it('executes the API through properties', function(done) {
    var api = {
      bar: function(parameters) {
        expect(parameters).to.equal(5);
        done();
      }
    };
    applyq(api, []);
    api.bar(5);
  });
});
