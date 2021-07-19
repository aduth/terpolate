import { jsx as baseJSX } from 'hijinks/jsx-runtime';
import { h, Fragment } from 'hijinks';
import baseInterpolate from './base.js';

/** @typedef {import('./base').Handlers} Handlers */
/** @typedef {import('./base').Handler} Handler */

/**
 * @param {Parameters<baseJSX>[0]|Element} type
 * @param {Parameters<baseJSX>[1]} props
 */
function jsx(type, props) {
	if (type instanceof Element) {
		for (var i = 0; i < type.attributes.length; i++) {
			props[type.attributes[i].name] = type.attributes[i].value;
		}

		type = type.tagName;
	}

	return baseJSX(type, props);
}

/**
 * @param {string} string
 * @param {Record<string, string|Element>} handlers
 *
 * @return {DocumentFragment}
 */
export function interpolate(string, handlers) {
	return h(Fragment, null, baseInterpolate(jsx, string, handlers));
}
