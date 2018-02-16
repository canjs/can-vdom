/*can-vdom@4.0.0#make-window/make-window*/
define([
    'require',
    'exports',
    'module',
    '../make-document/make-document',
    'can-simple-dom'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var makeDocument = require('../make-document/make-document');
        var simpleDOM = require('can-simple-dom');
        var noop = function () {
        };
        module.exports = function (global) {
            global = global || {};
            global.document = makeDocument();
            global.window = global.self = global;
            global.addEventListener = function () {
            };
            global.removeEventListener = function () {
            };
            global.Node = simpleDOM.Node;
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
            return global;
        };
    }(function () {
        return this;
    }(), require, exports, module));
});