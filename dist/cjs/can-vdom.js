/*can-vdom@3.1.0-pre.0#can-vdom*/
var assign = require('can-util/js/assign/assign');
var makeWindow = require('./make-window/make-window.js');
var GLOBAL = require('can-util/js/global/global');
var DOCUMENT = require('can-util/dom/document/document');
var global = GLOBAL();
assign(global, makeWindow(global));