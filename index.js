/**
 * Module dependencies.
 */

var elementOffset = require('document-offset')
var boundingClientRect = require('bounding-client-rect')

/**
 * Module exports.
 */

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = getElementClientRect
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return getElementClientRect
    })
  } else {
    window.getElementClientRect = getElementClientRect
  }
}

/**
 * Returns the object contain the size of an element
 * and its absolute position of the document.
 *
 * @param element {Element}
 * @returns {{left: number, top: number, right: number, bottom: number, width: number, height: number}}
 */
function getElementClientRect (element) {
  var offset = elementOffset(element)
  var rect = getBoundingClientRect(element)
  var elemHeight = rect.bottom - rect.top

  return {
    left: offset.left,
    top: offset.top,
    right: rect.right,
    bottom: offset.top + elemHeight,
    width: rect.right - offset.left,
    height: elemHeight
  }
}

/**
 * always return 1, except at non-default zoom levels in IE before version 8
 * borrowed from http://help.dottoro.com/ljvmcrrn.php
 * @returns {number}
 */
function getZoomFactor () {
  var factor = 1
  if (document.body.getBoundingClientRect) {
    // rect is only in physical pixel size in IE before version 8
    var rect = document.body.getBoundingClientRect()
    var physicalW = rect.right - rect.left
    var logicalW = document.body.offsetWidth

    // the zoom level is always an integer percent value
    factor = Math.round((physicalW / logicalW) * 100) / 100
  }
  return factor
}

function getScrollPosition (object, scrolled) {
  if (!object) {
    return
  }

  scrolled.x += object.scrollLeft
  scrolled.y += object.scrollTop

  if (object.tagName.toLowerCase() != 'html') {
    getScrollPosition(object.parentNode, scrolled)
  }
}

function getElementOffset (object, offset) {
  if (!object) {
    return
  }
  offset.x += object.offsetLeft
  offset.y += object.offsetTop

  getElementOffset(object.offsetParent, offset)
}

/**
 * Use `@webmodules/bounding-client-rect`
 * If rect is null, use `offset` prefixed properties such as `offsetTop`.
 *
 * @param {Element} node
 * @return {TextRectangle|Object}
 */
function getBoundingClientRect (node, x, y, w, h) {
  var rect = boundingClientRect(node)

  // `rect` is null in IE 8 and below 8
  if (node.getBoundingClientRect !== undefined) {
    rect = node.getBoundingClientRect()

    x = rect.left,
    y = rect.top,
    w = rect.right - rect.left,
    h = rect.bottom - rect.top

    if (navigator.appName.toLowerCase() == 'microsoft internet explorer') {
      // the bounding rectangle include the top and left borders of the client area
      x -= document.documentElement.clientLeft
      y -= document.documentElement.clientTop

      var zoomFactor = getZoomFactor()
      if (zoomFactor != 1) { // IE 7 at non-default zoom level
        x = Math.round(x / zoomFactor)
        y = Math.round(y / zoomFactor)
        w = Math.round(w / zoomFactor)
        h = Math.round(h / zoomFactor)
      }

      rect = {
        left: x,
        top: y,
        width: w,
        height: h,
        right: x + w,
        bottom: y + h
      }
    }
  } else {
    // older Firefox, Opera and Safari versions
    var offset = {x: 0, y: 0}
    getElementOffset(node, offset)

    var scrolled = {x: 0, y: 0}
    getScrollPosition(node.parentNode, scrolled)

    x = offset.x - scrolled.x
    y = offset.y - scrolled.y
    w = node.offsetWidth
    h = node.offsetHeight

    return {
      left: x,
      top: y,
      width: w,
      height: h,
      right: x + w,
      bottom: y + h
    }
  }

  return rect
}
