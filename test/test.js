var assert = require("assert");
var isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
var makeDocument = require("../make-document/make-document");

// Copied from can-util to avoid circular dependency in testing.
var childNodes = function childNodes(node) {
	var childNodes = node.childNodes;
	if ("length" in childNodes) {
		return childNodes;
	} else {
		var cur = node.firstChild;
		var nodes = [];
		while (cur) {
			nodes.push(cur);
			cur = cur.nextSibling;
		}
		return nodes;
	}
};

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
		nodeRequire("../can-vdom");

		it("creates a global window", function(){
			[
				"window",
				"navigator",
				"location",
				"history",
				"self",
				"Node"
			].forEach(assertExists);

			function assertExists(prop){
				assert.ok(global[prop], prop + " now exists");
			}
		});

		it("contains normal globals like setTimeout", function(){
			assert.equal(typeof window.setTimeout, "function", "setTimeout included");
			assert.equal(typeof window.Math, "object", "Math included");
		});

		it('getComputedStyle returns the node style', function () {
			var fakeNode = {style: 1};
			assert.equal(window.getComputedStyle(fakeNode), 1, 'getComputedStyle returns node style');
		});

		it("Node exposes the nodeType constants", function(){
			assert.equal(window.Node.ELEMENT_NODE, 1, "has the element nodeType");
			assert.equal(window.Node.TEXT_NODE, 3, "has the text nodeType");
		});
	});
}
