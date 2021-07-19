import { jsx as baseJSX } from 'hijinks/jsx-runtime';
import { h, Fragment } from 'hijinks';
import baseInterpolate from './base.js';

/**
 * @param {string|HTMLElement} type
 * @param {Record<string, any>} props
 */
function jsx(type, props) {
	if (type instanceof HTMLElement) {
		var attributes = type.attributes;
		for (var i = 0; i < attributes.length; i++) {
			props[attributes[i].name] = attributes[i].value;
		}

		type = type.tagName;
	}

	return baseJSX(type, props);
}

/**
 * @param {string} string
 * @param {import('./base').Handlers} handlers
 *
 * @return {DocumentFragment}
 */
export function interpolate(string, handlers) {
	return h(Fragment, null, baseInterpolate(jsx, string, handlers));
}
