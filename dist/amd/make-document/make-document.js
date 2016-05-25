/*can-vdom@0.0.4#make-document/make-document*/
define(function (require, exports, module) {
    var simpleDOM = require('can-simple-dom');
    var makeParser = require('../make-parser/make-parser');
    function CanSimpleDocument() {
        simpleDOM.Document.apply(this, arguments);
        var serializer = new simpleDOM.HTMLSerializer(simpleDOM.voidMap);
        var parser = makeParser(this);
        this.__addSerializerAndParser(serializer, parser);
    }
    CanSimpleDocument.prototype = new simpleDOM.Document();
    CanSimpleDocument.prototype.constructor = CanSimpleDocument;
    module.exports = function () {
        return new CanSimpleDocument();
    };
});