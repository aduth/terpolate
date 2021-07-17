import { expect } from 'chai';
import { assign, push } from '../base.js';

describe('assign', () => {
	it('merges into target object', () => {
		const target = { a: 1 };

		assign(target, { b: 2 });

		expect(target).to.deep.equal({ a: 1, b: 2 });
	});
});

describe('push', () => {
	it('does not push falsey value', () => {
		/** @type {string[]} */
		const array = [];

		push(array, '');

		expect(array).to.deep.equal([]);
	});

	it('pushes truthy value', () => {
		/** @type {string[]} */
		const array = [];

		push(array, 'ok');

		expect(array).to.deep.equal(['ok']);
	});
});
