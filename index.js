
/**
 * Module dependencies.
 */

var elementStyle = require('element-style')
var elementOffset = require('document-offset')
var boundingClientRect = require('bounding-client-rect');

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
function getElementClientRect(element) {
    var offset = elementOffset(element)
    var rect = getBoundingClientRect(element)
    var elemHeight = Math.max(parseInt(elementStyle(element, 'height'), 10), (rect.bottom - rect.top))

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
 * Use `@webmodules/bounding-client-rect`
 * If rect is null, use `offset` prefixed properties such as `offsetTop`.
 *
 * @param {Node} node
 * @return {TextRectangle|Object}
 */

function getBoundingClientRect(node) {
    var rect = boundingClientRect(node);

    // `rect` is null in IE 8 and below 8
    if (rect === null) {
        rect = {
            top: parseInt(node.offsetTop, 10),
            left: parseInt(node.offsetLeft, 10),
            width: parseInt(node.offsetWidth, 10),
            height: parseInt(node.offsetHeight, 10)
        }

        rect.bottom = rect.top + rect.height
        rect.right = rect.left + rect.width
    }

    return rect;
}
