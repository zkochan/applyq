# array2object

## Usage

```js
/* Declaring the class */
function Logger() {}

Logger.prototype = new Array2Object();

Logger.prototype.log = function(msg) {
  console.log(msg);
};

/* Using the object before it was initialized */
window.logger = window.logger || [];
window.logger.push(['log', 'Hello world!']);

/* Initializing the object */
window.logger = new Logger().applyArray(window.logger);
```


## License

MIT
