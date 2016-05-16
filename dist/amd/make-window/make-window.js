/*can-vdom@0.0.1#make-window/make-window*/
define(function (require, exports, module) {
    var makeDocument = reuire('../make-document/make-document');
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
            pushState: can.k,
            replaceState: can.k
        };
        return global;
    };
});