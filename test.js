/* global describe, it */

var assert = require('assert')

var getElementClientRect = require('./')

describe('getElementClientRect', function () {
  // Mocha detects the frame id as being leaked in IE
  // ------------------------------------------------
  var userAgent = window.navigator.userAgent;
  var ieDetected = (userAgent.indexOf('MSIE ') !== false ||
  !!navigator.userAgent.match(/Trident.*rv\:11\./));

  if (global.mocha && ieDetected) {
    global.mocha.globals(['getComputedStyle', 'el', 'getPropertyValue']);
  }
  // ------------------------------------------------

  document.body.cssText = 'padding:0;margin:0;position:relative'

  var div = document.createElement('div')
  div.style.cssText = 'position:absolute;top:300px;left:0;width:250px;height:400px;padding:5px;margin:10px;background-color:blue'

  var p = document.createElement('p')
  p.style.cssText = 'position:absolute;top:15px;left:15px;width:50px;height:50px;background-color:red;margin:5px;padding:2px'

  div.appendChild(p)

  document.body.appendChild(div)

  after(function () {
    // document.body.removeChild(div)
  })

  function assertIsTextRectangle (rect) {
    // see:
    // https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect
    assert.equal('number', typeof rect.bottom)
    assert.equal('number', typeof rect.height)
    assert.equal('number', typeof rect.left)
    assert.equal('number', typeof rect.right)
    assert.equal('number', typeof rect.top)
    assert.equal('number', typeof rect.width)
  }

  it('should return a client rect for a DIV HTMLElement', function () {
    var rect = getElementClientRect(div)

    assertIsTextRectangle(rect)

    assert.equal(10 /* margin left */, rect.left)
    assert.equal(300 /* top */ + 10 /* margin top */, rect.top)
    assert.equal(10 /* rect left */ + 260 /* rect width */, rect.right)
    assert.equal(310 /* rect top */ + 410 /* rect height */, rect.bottom)
    assert.equal(400 + 5 /* padding top */ + 5 /* padding bottom */, rect.height)
    assert.equal(250 + 5 /* padding left */ + 5 /* padding right */, rect.width)
  })

  it('should return a client rect for a P HTMLElement', function () {
    var p = div.firstChild
    assert.equal(1 /*Node.ELEMENT_NODE*/, p.nodeType)
    assert.equal('P', p.nodeName)

    var rect = getElementClientRect(p)

    assertIsTextRectangle(rect)

    assert.equal(15 /* p relative left */ + 10 /* parent margin left */ + 5 /* parent padding left */, rect.left)
    assert.equal(300 /* parent top */ + 10 /* parent margin top */ + 5 /* parent padding top */ + 15 /* p top */, rect.top)
    assert.equal(30 /* rect left */ + 54 /* rect width */, rect.right)
    assert.equal(330 /* rect top */ + 54 /* rect height */, rect.bottom)
    assert.equal(50 + 2 /* p padding top */ + 2 /* p padding bottom */, rect.height)
    assert.equal(50 + 2 /* p padding left */ + 2 /* p padding right */, rect.width)
  })
})
