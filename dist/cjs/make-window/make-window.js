/*can-vdom@3.1.0-pre.1#make-window/make-window*/
var makeDocument = require('../make-document/make-document.js');
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
    return global;
};