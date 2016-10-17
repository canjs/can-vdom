@module {{}} can-vdom
@parent can-ecosystem
@group can-vdom.modules modules
@group can-vdom.types types
@description

A browser-lite environment for Node.js.

```js
require("can-vdom");

window === global; // true

document.getElementsByTagName("body"); // [HTMLBodyElement]
```

@body

**can-vdom** is what enables CanJS apps to run in the server. It provides a lite weight browser-like environment with a `document` and `window`. This allows code written for the browser, without extreme requirements, to also run on the server.

# Shiming a browser environment

Importing can-vdom will shim a browser-like environment into Node's globals. Use this approach to run code that expects a global `window` and/or `document` object.

```js
require("can-vdom");

typeof window; // "object"

typeof window.addEventListener; // "function"

document.getElementById("foo"); // undefined
```

# Loading as a module

If you want to prevent setting globals you can load `can-vdom/make-window/make-window` directly:

```js
var makeWindow = require("can-vdom/make-window/make-window");

var myWindow = makeWindow(global);
```
