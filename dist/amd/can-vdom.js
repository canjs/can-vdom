/*can-vdom@4.1.0#can-vdom*/
define([
    'require',
    'exports',
    'module',
    'can-assign',
    './make-window/make-window',
    'can-globals/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var assign = require('can-assign');
        var makeWindow = require('./make-window/make-window');
        var GLOBAL = require('can-globals/global');
        var global = GLOBAL();
        assign(global, makeWindow(global));
    }(function () {
        return this;
    }(), require, exports, module));
});