import { jsx as baseJSX } from 'hijinks/jsx-runtime';
import { h, Fragment } from 'hijinks';
import baseInterpolate from './base.js';

/** @typedef {import('./base').Handlers} Handlers */
/** @typedef {import('./base').Handler} Handler */

/**
 * @param {string|HTMLElement} type
 * @param {Record<string, any>} props
 */
function jsx(type, props) {
	if (type instanceof HTMLElement) {
		for (var i = 0; i < type.attributes.length; i++) {
			props[type.attributes[i].name] = type.attributes[i].value;
		}

		type = type.tagName;
	}

	return baseJSX(type, props);
}

/**
 * @param {string} string
 * @param {Record<string, Handler|HTMLElement>} handlers
 *
 * @return {DocumentFragment}
 */
export function interpolate(string, handlers) {
	return h(
		Fragment,
		null,
		baseInterpolate(jsx, string, /** @type {Handlers} */ (handlers))
	);
}
