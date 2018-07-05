/*[process-shim]*/
(function(global, env) {
	// jshint ignore:line
	if (typeof process === "undefined") {
		global.process = {
			argv: [],
			cwd: function() {
				return "";
			},
			browser: true,
			env: {
				NODE_ENV: env || "development"
			},
			version: "",
			platform:
				global.navigator &&
				global.navigator.userAgent &&
				/Windows/.test(global.navigator.userAgent)
					? "win"
					: ""
		};
	}
})(
	typeof self == "object" && self.Object == Object
		? self
		: typeof process === "object" &&
		  Object.prototype.toString.call(process) === "[object process]"
			? global
			: window,
	"development"
);

/*[global-shim-start]*/
(function(exports, global, doEval) {
	// jshint ignore:line
	var origDefine = global.define;

	var get = function(name) {
		var parts = name.split("."),
			cur = global,
			i;
		for (i = 0; i < parts.length; i++) {
			if (!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val) {
		var parts = name.split("."),
			cur = global,
			i,
			part,
			next;
		for (i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if (!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod) {
		if (!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, default: true };
		for (var p in mod) {
			if (!esProps[p]) return false;
		}
		return true;
	};

	var hasCjsDependencies = function(deps) {
		return (
			deps[0] === "require" && deps[1] === "exports" && deps[2] === "module"
		);
	};

	var modules =
		(global.define && global.define.modules) ||
		(global._define && global._define.modules) ||
		{};
	var ourDefine = (global.define = function(moduleName, deps, callback) {
		var module;
		if (typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for (i = 0; i < deps.length; i++) {
			args.push(
				exports[deps[i]]
					? get(exports[deps[i]])
					: modules[deps[i]] || get(deps[i])
			);
		}
		// CJS has no dependencies but 3 callback arguments
		if (hasCjsDependencies(deps) || (!deps.length && callback.length)) {
			module = { exports: {} };
			args[0] = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args[1] = module.exports;
			args[2] = module;
		} else if (!args[0] && deps[0] === "exports") {
			// Babel uses the exports and module object.
			module = { exports: {} };
			args[0] = module.exports;
			if (deps[1] === "module") {
				args[1] = module;
			}
		} else if (!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if (globalExport && !get(globalExport)) {
			if (useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	});
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function() {
		// shim for @@global-helpers
		var noop = function() {};
		return {
			get: function() {
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load) {
				doEval(__load.source, global);
			}
		};
	});
})(
	{},
	typeof self == "object" && self.Object == Object
		? self
		: typeof process === "object" &&
		  Object.prototype.toString.call(process) === "[object process]"
			? global
			: window,
	function(__$source__, __$global__) {
		// jshint ignore:line
		eval("(function() { " + __$source__ + " \n }).call(__$global__);");
	}
);

/*can-vdom@4.1.0#make-parser/make-parser*/
define('can-vdom/make-parser/make-parser', [
    'require',
    'exports',
    'module',
    'can-view-parser',
    'can-simple-dom'
], function (require, exports, module) {
    'use strict';
    var canParser = require('can-view-parser');
    var simpleDOM = require('can-simple-dom');
    module.exports = function (document) {
        return new simpleDOM.HTMLParser(function (string) {
            var tokens = [];
            var currentTag, currentAttr;
            canParser(string, {
                start: function (tagName, unary) {
                    currentTag = {
                        type: 'StartTag',
                        attributes: [],
                        tagName: tagName
                    };
                },
                end: function (tagName, unary) {
                    tokens.push(currentTag);
                    currentTag = undefined;
                },
                close: function (tagName) {
                    tokens.push({
                        type: 'EndTag',
                        tagName: tagName
                    });
                },
                attrStart: function (attrName) {
                    currentAttr = [
                        attrName,
                        ''
                    ];
                    currentTag.attributes.push(currentAttr);
                },
                attrEnd: function (attrName) {
                },
                attrValue: function (value) {
                    currentAttr[1] += value;
                },
                chars: function (value) {
                    tokens.push({
                        type: 'Chars',
                        chars: value
                    });
                },
                comment: function (value) {
                    tokens.push({
                        type: 'Comment',
                        chars: value
                    });
                },
                special: function (value) {
                },
                done: function () {
                }
            });
            return tokens;
        }, document, simpleDOM.voidMap);
    };
});
/*can-vdom@4.1.0#make-document/make-document*/
define('can-vdom/make-document/make-document', [
    'require',
    'exports',
    'module',
    'can-simple-dom',
    'can-vdom/make-parser/make-parser'
], function (require, exports, module) {
    'use strict';
    var simpleDOM = require('can-simple-dom');
    var makeParser = require('can-vdom/make-parser/make-parser');
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
/*can-vdom@4.1.0#make-window/make-window*/
define('can-vdom/make-window/make-window', [
    'require',
    'exports',
    'module',
    'can-vdom/make-document/make-document',
    'can-simple-dom',
    'can-log/dev/dev'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var makeDocument = require('can-vdom/make-document/make-document');
        var simpleDOM = require('can-simple-dom');
        var devLog = require('can-log/dev/dev');
        var noop = function () {
        };
        function warnOnAccess(global, property) {
            var hasWarned = false;
            var value = global[property];
            Object.defineProperty(global, property, {
                get: function () {
                    if (!hasWarned) {
                        hasWarned = true;
                        devLog.warn('The global ' + property + ' is not supported by can-vdom.');
                    }
                    return value;
                },
                set: function (newValue) {
                    value = newValue;
                }
            });
        }
        module.exports = function (global) {
            global = global || {};
            global.document = makeDocument();
            global.window = global.self = global;
            global.addEventListener = function () {
            };
            global.removeEventListener = function () {
            };
            global.Node = simpleDOM.Node;
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
            global.getComputedStyle = function (node) {
                return node.style;
            };
            warnOnAccess(global, 'FormData');
            return global;
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-vdom@4.1.0#can-vdom*/
define('can-vdom', [
    'require',
    'exports',
    'module',
    'can-assign',
    'can-vdom/make-window/make-window',
    'can-globals/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var assign = require('can-assign');
        var makeWindow = require('can-vdom/make-window/make-window');
        var GLOBAL = require('can-globals/global/global');
        var global = GLOBAL();
        assign(global, makeWindow(global));
    }(function () {
        return this;
    }(), require, exports, module));
});
/*[global-shim-end]*/
(function(global) { // jshint ignore:line
	global._define = global.define;
	global.define = global.define.orig;
}
)(typeof self == "object" && self.Object == Object ? self : (typeof process === "object" && Object.prototype.toString.call(process) === "[object process]") ? global : window);