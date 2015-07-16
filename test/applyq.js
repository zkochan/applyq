'use strict';

var applyq = require('../');

describe('applyq', function() {
  it('executes the cached command array', function(done) {
    var api = {
      bar: function(a, b) {
        expect(a).to.equal(1);
        expect(b).to.equal(2);
        done();
      }
    };
    var _apiq = [];
    _apiq.push(['bar', 1, 2]);
    applyq(api, _apiq);
  });

  it('executes command array after the object was created', function(done) {
    var api = {
      bar: function(parameters) {
        expect(parameters).to.equal(5);
        done();
      }
    };
    var _apiq = [];
    applyq(api, _apiq);
    _apiq.push(['bar', 5]);
  });
});
