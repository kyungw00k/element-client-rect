# element-client-rect [![Build Status](https://travis-ci.org/kyungw00k/element-client-rect.svg?branch=master)](https://travis-ci.org/kyungw00k/element-client-rect)
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

## License
[MIT](https://kyungw00k.mit-license.org/)
