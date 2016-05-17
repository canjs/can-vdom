/*can-vdom@0.0.2#can-vdom*/
define(function (require, exports, module) {
    var assign = require('can-util/js/assign');
    var makeWindow = require('./make-window/make-window');
    var GLOBAL = require('can-util/js/global');
    var DOCUMENT = require('can-util/dom/document');
    assign(GLOBAL(), makeWindow());
});