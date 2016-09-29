# element-client-rect 

[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][js-standard-image]][js-standard-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][npm-download]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

Returns the size of an element and its absolute position of the document.

## Install
```
$ npm install element-client-rect
```

## API
getElementClientRect(el)

```
var getElementClientRect = require('element-client-rect')
var dom = document.body

var rect = getElementClientRect(dom)
// => {left: number, top: number, right: number, bottom: number, width: number, height: number}
```

## Tested
* IE 6+
* Chrome latest
* Safari latest
* Firefox latest
* iOS 8.1+ 
* Android 4.0+

## License
[MIT](https://kyungw00k.mit-license.org/)


[js-standard-url]: http://standardjs.com/
[js-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[npm-url]: https://npmjs.org/package/element-client-rect
[npm-image]: https://img.shields.io/npm/v/element-client-rect.svg?style=flat-square
[npm-download]: https://img.shields.io/npm/dm/element-client-rect.svg?style=flat-square

[travis-url]: https://travis-ci.org/kyungw00k/element-client-rect
[travis-image]: https://img.shields.io/travis/kyungw00k/element-client-rect/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/kyungw00k/element-client-rect
[coveralls-image]: https://img.shields.io/coveralls/kyungw00k/element-client-rect/master.svg?style=flat-square

[depstat-url]: https://david-dm.org/kyungw00k/element-client-rect
[depstat-image]: https://david-dm.org/kyungw00k/element-client-rect.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/kyungw00k/element-client-rect#info=devDependencies
[depstat-dev-image]: https://david-dm.org/kyungw00k/element-client-rect/dev-status.svg?style=flat-square
