/*can-vdom@4.2.0#make-window/make-window*/
'use strict';
var makeDocument = require('../make-document/make-document.js');
var simpleDOM = require('can-simple-dom');
var devLog = require('can-log/dev/dev');
var noop = function () {
};
function warnOnAccess(global, property) {
    var hasWarned = false;
    var value = global[property];
    Object.defineProperty(global, property, {
        get: function () {
            if (!hasWarned) {
                hasWarned = true;
                devLog.warn('The global ' + property + ' is not supported by can-vdom.');
            }
            return value;
        },
        set: function (newValue) {
            value = newValue;
        }
    });
}
module.exports = function (global) {
    global = global || {};
    global.document = makeDocument();
    global.window = global.self = global;
    global.addEventListener = function () {
    };
    global.removeEventListener = function () {
    };
    global.Node = simpleDOM.Node;
    global.Element = simpleDOM.Element;
    global.navigator = {
        userAgent: '',
        platform: '',
        language: '',
        languages: [],
        plugins: [],
        onLine: true
    };
    global.location = {
        href: '',
        protocol: '',
        host: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: ''
    };
    global.history = {
        pushState: noop,
        replaceState: noop
    };
    global.getComputedStyle = function (node) {
        return node.style;
    };
    warnOnAccess(global, 'FormData');
    return global;
};