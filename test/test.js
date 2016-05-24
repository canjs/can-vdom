var assert = require("assert");
var isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
var makeDocument = require("../make-document/make-document");

var childNodes = require("can-util/dom/child-nodes/child-nodes");

if(!isNode) {
	require("steal-mocha");
}


describe("makeDocument", function(){
	it("is able to parse html", function(){
		var document = makeDocument();
		document.body.innerHTML = "<div></div><span></span>";
		assert.equal(childNodes(document.body).length, 2, "two children");
	});
});

if(isNode) {
	var nodeRequire = require;

	describe("can-vdom", function(){
		function deleteWindow(){
			delete global.window;
		}

		beforeEach(deleteWindow);
		afterEach(deleteWindow);

		it("creates a global window", function(){
			assert.equal(global.window, undefined, "There is no global window");

			nodeRequire("../can-vdom");

			[
				"window",
				"navigator",
				"location",
				"history"
			].forEach(assertExists);

			function assertExists(prop){
				assert.ok(global[prop], prop + " now exists");
			}
		});
	});
}
