'use strict';

var applyq = require('../');
var noop = function() {};
var sinon = require('sinon');

describe('applyq', function() {
  it('executes the cached command array', function() {
    var bar = sinon.spy();
    var api = {
      bar: bar
    };
    var _apiq = [];
    _apiq.push(['bar', 1, 2]);
    applyq(api, _apiq);

    sinon.assert.calledWith(bar, 1, 2);
  });

  it('executes command array after the object was created', function() {
    var bar = sinon.spy();
    var api = {
      bar: bar
    };
    var _apiq = [];
    applyq(api, _apiq);
    _apiq.push(['bar', 5, 'someArg']);

    sinon.assert.calledWith(bar, 5, 'someArg');
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

  it('executes the queued commands in the correct order', function() {
    var foo = sinon.spy();
    var bar = sinon.spy();
    var api = {
      foo: foo,
      bar: bar
    };
    var _apiq = [];
    _apiq.push(['foo', 1]);
    _apiq.push(['bar', 2]);
    applyq(api, _apiq);

    sinon.assert.callOrder(foo, bar);
    sinon.assert.calledWith(foo, 1);
    sinon.assert.calledWith(bar, 2);
  });

  describe('command arrays that are not matched are added to the queue', function() {
    it('after init', function() {
      var foo = sinon.spy();
      var api = {
        foo: foo
      };
      var _apiq = [];
      applyq(api, _apiq);
      _apiq.push(['foo', 1]);
      _apiq.push(['bar', 3]);
      _apiq.push(23);

      sinon.assert.calledWith(foo, 1);
      expect(_apiq.length).to.eq(2);
      expect(_apiq[0].length).to.eq(2);
      expect(_apiq[0][0]).to.eq('bar');
      expect(_apiq[0][1]).to.eq(3);
      expect(_apiq[1]).to.eq(23);
    });

    it('before init', function() {
      var foo = sinon.spy();
      var api = {
        foo: foo
      };
      var _apiq = [];
      _apiq.push(['foo', 1]);
      _apiq.push(['bar', 3]);
      applyq(api, _apiq);

      sinon.assert.calledWith(foo, 1);
      expect(_apiq.length).to.eq(1);
      expect(_apiq[0].length).to.eq(2);
      expect(_apiq[0][0]).to.eq('bar');
      expect(_apiq[0][1]).to.eq(3);
    });
  });

  it('executes command array only if in the allowed list', function() {
    var bar = sinon.spy();
    var foo = sinon.spy();
    var api = {
      bar: bar,
      foo: foo
    };
    var _apiq = [];
    applyq(api, _apiq, ['bar']);
    _apiq.push(['bar', 5, 'someArg']);
    _apiq.push(['foo', 5]);

    sinon.assert.calledWith(bar, 5, 'someArg');
    sinon.assert.notCalled(foo);
  });

  it('executes cached command array only if in the allowed list', function() {
    var bar = sinon.spy();
    var foo = sinon.spy();
    var api = {
      bar: bar,
      foo: foo
    };
    var _apiq = [];
    _apiq.push(['bar', 5, 'someArg']);
    _apiq.push(['foo', 5]);
    applyq(api, _apiq, ['bar']);

    sinon.assert.calledWith(bar, 5, 'someArg');
    sinon.assert.notCalled(foo);
  });
});
