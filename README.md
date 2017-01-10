# Preact Test Utils

[![Build Status](https://travis-ci.org/wildpeaks/package-preact-test-utils.svg?branch=master)](https://travis-ci.org/wildpeaks/package-preact-test-utils)

**Wrapper that mounts a TestableComponent-based class** and exposes the class instance
(to test things like `.state`, `.props` or call `.setState`).


Install:

	npm install @wildpeaks/preact-test-utils


Usage:

	const wrapper = new Test(Function ComponentClass, HTMLElement container);


Wrapper methods:

 - **render(Object props, Function callback)**


Wrapper properties:

 - **ComponentClass**: reference to the component class provided to the constructor.

 - **isMounted**: `false` until render has been called, `true` afterwards.

 - **component**: `false` initially, contains the mounted instance of ComponentClass once render has been called.

 - **container**: DOM element where the component is mounted. If no container is provided to the constructor,
   it will generate a detached `<div>` node to render into.


Example:

```js
const {strictEqual, notStrictEqual} = require('assert');
const MyComponent = require('components/MyComponent');
const Test = require('@wildpeaks/preact-test-utils');

const wrapper = new Test(MyComponent, document.body);

// mount
wrapper.render({title: 'BEFORE'}, () => {
	const title = wrapper.container.querySelector('[ref="title"]');

	notStrictEqual(title, null, 'ref=title exists');
	strictEqual(title.textContent, 'BEFORE', 'ref=title text is initialized');
	strictEqual(wrapper.component.props.title, 'BEFORE', 'props.title is initialized');

	// re-mount
	wrapper.render({title: 'AFTER'}, () => {
		strictEqual(title.textContent, 'AFTER', 'ref=title text is updated');
		strictEqual(wrapper.component.props.title, 'AFTER', 'props.title is updated');
	});
});
```
