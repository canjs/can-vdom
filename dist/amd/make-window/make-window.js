/*can-vdom@0.0.4-0#make-window/make-window*/
define(function (require, exports, module) {
    var makeDocument = require('../make-document/make-document');
    var noop = function () {
    };
    module.exports = function () {
        var global = {};
        global.document = makeDocument();
        global.window = global;
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
});