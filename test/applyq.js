'use strict';

var applyq = require('../');
var noop = function() {};
var sinon = require('sinon');

describe('applyq', function() {
  it('executes the cached command array', function(done) {
    var api = {
      bar: function(a, b) {
        expect(arguments.length).to.equal(2);
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
      bar: function(param) {
        expect(arguments.length).to.equal(1);
        expect(param).to.equal(5);
        done();
      }
    };
    var _apiq = [];
    applyq(api, _apiq);
    _apiq.push(['bar', 5]);
  });

  it('removes newly added item from queue after it was processed', function() {
    var api = {
      bar: noop
    };
    var _apiq = [];
    applyq(api, _apiq);
    _apiq.push(['bar', 5]);
    expect(_apiq.length).to.equal(0);
  });

  it('clears existing items in the queue after processing', function() {
    var api = {
      bar: noop
    };
    var _apiq = [];
    _apiq.push(['bar']);
    _apiq.push(['bar']);
    applyq(api, _apiq);
    expect(_apiq.length).to.equal(0);
  });

  it('executes the queued commands in the correct order', function(done) {
    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    var api = {
      foo: spy1,
      bar: spy2
    };
    var _apiq = [];
    _apiq.push(['foo', 1]);
    _apiq.push(['bar', 2]);
    applyq(api, _apiq);
    sinon.assert.callOrder(spy2, spy1);
    done();
  });

  describe('command arrays that are not matched are added to the queue', function() {
    it('after init', function() {
      var api = {
        foo: function() {}
      };
      var _apiq = [];
      applyq(api, _apiq);
      _apiq.push(['foo', 1]);
      _apiq.push(['bar', 3]);
      _apiq.push(23);

      expect(_apiq.length).to.eq(2);
      expect(_apiq[0].length).to.eq(2);
      expect(_apiq[0][0]).to.eq('bar');
      expect(_apiq[0][1]).to.eq(3);
      expect(_apiq[1]).to.eq(23);
    });

    it('before init', function() {
      var api = {
        foo: function() {}
      };
      var _apiq = [];
      _apiq.push(['foo', 1]);
      _apiq.push(['bar', 3]);
      applyq(api, _apiq);

      expect(_apiq.length).to.eq(1);
      expect(_apiq[0].length).to.eq(2);
      expect(_apiq[0][0]).to.eq('bar');
      expect(_apiq[0][1]).to.eq(3);
    });
  });
});
