# can-vdom

[![Build Status](https://travis-ci.org/canjs/can-vdom.png?branch=master)](https://travis-ci.org/canjs/can-vdom)

A browser-lite environment for nodejs

- <code>[__can-vdom__ Object](#can-vdom-object)</code>
  - _modules_
    - <code>[__can-vdom/make-window/make-window__ function](#can-vdommake-windowmake-window-function)</code>
      - <code>[makeWindow()](#makewindow)</code>
      - <code>[makeWindow(global)](#makewindowglobal)</code>
    - <code>[__can-vdom/make-document/make-document__ function](#can-vdommake-documentmake-document-function)</code>
      - <code>[makeDocument()](#makedocument)</code>
  - _types_
    - <code>[window Object](#window-object)</code>

## API

##  `{Object}`

 
A browser-lite environment for Node.js.

```js
require("can-vdom");

window === global; // true

document.getElementsByTagName("body"); // [HTMLBodyElement]
```




### <code>Object</code>


### <code>__can-vdom/make-window/make-window__ function</code>

Exports a function that window called, returns an object that looks like a `window`.


#### <code>makeWindow()</code>


Creates a document and places it, along with other common browser globals, on a new object and then returns that object.


- __returns__ <code>{[window](#window-object)}</code>:
  An object with common browser globals.
  

#### <code>makeWindow(global)</code>


Creates a document and places it, along with other common browser globals, on the `global` object.

```js
var makeWindow = require("can-vdom/make-window/make-window");

var window = makeWindow({});
```


1. __global__ <code>{[window](#window-object)}</code>:
  An object that represents the environment's global.

### <code>__can-vdom/make-document/make-document__ function</code>

Exports a function that when called, returns a dom-light document object.


#### <code>makeDocument()</code>


Creates a new simple document using [can-simple-dom]. Provides light-weight document needs, mostly for server-side rendering.


- __returns__ <code>{can-simple-dom/document/document}</code>:
  A can-simple-dom document.
  
  
### window `{Object}`


An object representing a fake `window` object.



#### <code>Object</code>

- __document__ <code>{can-simple-dom/document/document}</code>:
  A browser document
  
- __window__ <code>{Object}</code>:
  The window itself.
  
- __self__ <code>{Object}</code>:
  The `self` object is an alias for `window`.
  
- __addEventListener__ <code>{function}</code>:
  A stub for `window.addEventListener`, does not actually set up events unless overridden some place else.
  
- __removeEventListener__ <code>{function}</code>:
  A stub for `window.removeEventListener`.
  
- __navigator__ <code>{Object}</code>:
  
  
- __location__ <code>{Object}</code>:
  
  
- __history__ <code>{Object}</code>:
  
  
## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
