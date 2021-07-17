import createElement from 'hijinks';
import { interpolate } from '../dom.js';
import { createTests } from './support/create.js';
import jsdomGlobal from 'jsdom-global';

/**
 * @param {DocumentFragment|string} fragment
 *
 * @return {string}
 */
function renderToString(fragment) {
	const container = document.createElement('div');

	if (typeof fragment === 'string') {
		container.appendChild(document.createTextNode(fragment));
	} else {
		container.appendChild(fragment);
	}

	return container.innerHTML;
}

describe('dom', () => {
	before(function () {
		this.jsdomCleanup = jsdomGlobal();
	});

	after(function () {
		this.jsdomCleanup();
	});

	createTests(interpolate, createElement, renderToString);
});
