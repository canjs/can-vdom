/*can-vdom@4.0.0-pre.0#can-vdom*/
var assign = require('can-assign');
var makeWindow = require('./make-window/make-window.js');
var GLOBAL = require('can-globals/global/global');
var global = GLOBAL();
assign(global, makeWindow(global));