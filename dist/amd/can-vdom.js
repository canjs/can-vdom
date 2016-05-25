/*can-vdom@0.0.5-0#can-vdom*/
define(function (require, exports, module) {
    var assign = require('can-util/js/assign');
    var makeWindow = require('./make-window/make-window');
    var GLOBAL = require('can-util/js/global');
    var DOCUMENT = require('can-util/dom/document');
    var global = GLOBAL();
    assign(global, makeWindow(global));
});