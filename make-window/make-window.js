/**
 * @module {function} can-vdom/make-window/make-window ./make-window/make-window
 * @parent can-vdom.modules
 *
 * Exports a function that window called, returns an object that looks like a `window`.
 *
 * @signature `makeWindow()`
 *
 * Creates a document and places it, along with other common browser globals,
 * on a new object and then returns that object.
 *
 * ```js
 * var makeWindow = require("can-vdom/make-window/make-window");
 * makeWindow();
 *
 * window.document.body //-> Node
 * ```
 *
 * @return {can-vdom.types.window} An object with common browser globals.
 *
 * @signature `makeWindow(global)`
 *
 * Creates a document and places it, along with other common browser globals, on the `global` object.
 *
 * ```js
 * var makeWindow = require("can-vdom/make-window/make-window");
 *
 * var window = makeWindow({});
 * ```
 *
 * @param {can-vdom.types.window} global An object that represents the environment's global.
 * @return The `global` provided as the argument.
 */

var makeDocument = require("../make-document/make-document");

var noop = function(){};

module.exports = function(global){
	global = global || {};
	global.document = makeDocument();
	global.window = global.self = global;
	global.addEventListener = function(){};
	global.removeEventListener = function(){};
	global.navigator = {
		userAgent: "",
		platform: "",
		language: "",
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
	return global;
};
