import { h } from 'hijinks';
import jsdomGlobal from 'jsdom-global';
import { expect } from 'chai';
import { interpolate } from '../dom.js';
import { createTests } from './support/create.js';

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

	createTests(interpolate, h, renderToString);

	it('copies element attributes (readme example)', () => {
		const link = document.createElement('a');
		link.href = '/help';
		const element = interpolate(
			'<strong>If you need help</strong>, visit our <a>Help Center</a>.',
			{
				strong: 'strong',
				a: link,
			}
		);

		expect(renderToString(element)).to.equal(
			'<strong>If you need help</strong>, visit our <a href="/help">Help Center</a>.'
		);
	});
});
