var assign = require("can-util/js/assign/assign");
var makeWindow = require("./make-window/make-window");

var GLOBAL = require("can-util/js/global/global");
var DOCUMENT = require("can-globals/document/document");

var global = GLOBAL();
assign(global, makeWindow(global));
