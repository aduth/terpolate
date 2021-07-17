import createElement from 'hijinks';
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

	var children = props.children;
	delete props.children;
	return createElement(type, props, children);
}

/**
 * @param {string} string
 * @param {import('./base').Handlers} handlers
 *
 * @return {DocumentFragment}
 */
export function interpolate(string, handlers) {
	var result = baseInterpolate(jsx, string, handlers),
		fragment = document.createDocumentFragment();

	result.forEach(function (part) {
		fragment.append(
			typeof part === 'string' ? document.createTextNode(part) : part
		);
	});

	return fragment;
}
