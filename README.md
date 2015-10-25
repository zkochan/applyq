# applyq

A JavaScript library for applying asynchronous calls to an API.

[![Dependency Status](https://david-dm.org/zkochan/applyq/status.svg?style=flat)](https://david-dm.org/zkochan/applyq)
[![Build Status](https://travis-ci.org/zkochan/applyq.svg?branch=master)](https://travis-ci.org/zkochan/applyq)
[![npm version](https://badge.fury.io/js/applyq.svg)](http://badge.fury.io/js/applyq)


## Installation

```
npm install --save applyq
```


## How the Asynchronous Syntax Works

Lets say there is a JavaScript object on the page but it is unknown where and when
it will be loaded. However, you would like to have the possibility to interact with
it at any place on the page. The asynchronous syntax makes it possible to call the
API before its loaded.

The asynchronous syntax uses a queue, which is a `first-in, first-out` data structure
that collects API calls until the target object is ready to execute them.

To push an API call onto the queue, you must convert it from the traditional
JavaScript syntax into a `command array`. Command arrays are simply JavaScript
arrays that conform to a certain format. The first element in a command array is
the name of the object method you want to call. It must be a string. The rest of
the elements are the arguments you want to pass to the object method. These can
be any JavaScript value.

The following code calls `logger.log` using the traditional syntax:

```js
logger.log('Hello world!');
```

The equivalent code in the asynchronous syntax:

```js
window._loggerq = window._loggerq || [];
_loggerq.push(['log', 'Hello world!']);
```


## Usage

Once the object is loaded and initialized, it has to execute the queued command
arrays. This can be done by calling `applyq`:

```js
var logger = new Logger();
applyq(logger, _loggerq);
```

After the object had been initialized, there is no need to store the commands
anymore. The commands can be executed right away. That's why after calling `applyq`
the `push` method of the commands queue is overridden. The overridden version of
push is executing the command arrays immediately instead of storing them.


## P.S.

Some of the explanations of the Asynchronous Syntax were taken from Google
Analytics [Tracking Basics (Asynchronous Syntax)][tracking-basics].


## License

MIT


[tracking-basics]: https://developers.google.com/analytics/devguides/collection/gajs/?csw=1
