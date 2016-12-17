'use strict';
/* eslint-env browser */
const {h, render} = require('preact');
const TestableComponent = require('@wildpeaks/preact-component-testable');

function error(){
	throw new Error('Missing required parameter');
}


class Test {
	constructor(ComponentClass = error(), container){
		if (ComponentClass.prototype instanceof TestableComponent){
			this.ComponentClass = ComponentClass;
		} else {
			throw new Error('Invalid component');
		}

		if (typeof container === 'undefined'){
			this.container = document.createElement('div');
		} else if ((typeof container === 'object') && (container !== null) && ('querySelector' in container)){
			this.container = container;
		} else {
			throw new Error('Invalid container');
		}

		this.component = false;
		this.isMounted = false;
	}

	render(props, done){
		if (this.isMounted){
			render(
				h(this.ComponentClass, props),
				this.container,
				this.container.firstChild
			);
			if (typeof done === 'function'){
				setTimeout(done);
			}
		} else {
			const initialProps = Object.assign({}, props, {
				testable: component => {
					this.component = component;
					this.isMounted = true;
					if (typeof done === 'function'){
						setTimeout(done);
					}
				}
			});
			render(
				h(this.ComponentClass, initialProps),
				this.container
			);
		}
	}
}

module.exports = Test;
